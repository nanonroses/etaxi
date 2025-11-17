/**
 * Driver Assignment State Update API
 *
 * POST /api/driver/assignments/:id/state
 *
 * Updates assignment state with validation and side effects
 * Implements state machine logic from driver's perspective
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireDriverAuth } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

// Define allowed state transitions for driver
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  SENT_TO_DRIVER: ['ACCEPTED_BY_DRIVER', 'REJECTED_BY_DRIVER'],
  ACCEPTED_BY_DRIVER: ['CANCELED'], // Driver can cancel after accepting
};

// Define PassengerRequest status updates based on Assignment state
const PASSENGER_REQUEST_STATUS_MAP: Record<string, string> = {
  ACCEPTED_BY_DRIVER: 'ASSIGNED',
  REJECTED_BY_DRIVER: 'PENDING_ASSIGNMENT',
  CANCELED: 'CANCELED_BY_DRIVER',
};

// Define Taxi status updates based on Assignment state
const TAXI_STATUS_MAP: Record<string, string> = {
  ACCEPTED_BY_DRIVER: 'BUSY',
  REJECTED_BY_DRIVER: 'AVAILABLE',
  COMPLETED: 'AVAILABLE',
  CANCELED: 'AVAILABLE',
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const driver = await requireDriverAuth(req);

    // Await params (Next.js 15+)
    const { id } = await params;

    // Parse request body
    const body = await req.json();
    const { newState, cancellationReason } = body;

    // Validate newState
    if (!newState) {
      return NextResponse.json(
        {
          ok: false,
          error: 'newState is required',
        },
        { status: 400 }
      );
    }

    // Execute in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch assignment
      const assignment = await tx.assignment.findUnique({
        where: { id },
        include: {
          passengerRequest: true,
          taxi: true,
        },
      });

      if (!assignment) {
        throw new Error('Assignment not found');
      }

      // 2. Verify driver owns this assignment
      if (assignment.driverId !== driver.id) {
        throw new Error('Forbidden - You do not have access to this assignment');
      }

      // 3. Validate state transition
      const currentState = assignment.status;
      const allowedNextStates = ALLOWED_TRANSITIONS[currentState] || [];

      if (!allowedNextStates.includes(newState)) {
        throw new Error(
          `Invalid transition: ${currentState} -> ${newState}. Allowed: ${allowedNextStates.join(', ') || 'none'}`
        );
      }

      // 4. Validate cancellation reason if canceling
      if (newState === 'CANCELED' && !cancellationReason) {
        throw new Error('Cancellation reason is required');
      }

      // 5. Prepare update data
      const updateData: any = {
        status: newState,
      };

      // Add timestamps based on new state
      if (newState === 'ACCEPTED_BY_DRIVER') {
        updateData.acceptedAt = new Date();
      } else if (newState === 'REJECTED_BY_DRIVER') {
        updateData.rejectedAt = new Date();
      } else if (newState === 'CANCELED') {
        updateData.canceledAt = new Date();
        updateData.cancellationReason = cancellationReason;
        updateData.canceledBy = 'DRIVER';
      }

      // 6. Update Assignment
      const updatedAssignment = await tx.assignment.update({
        where: { id },
        data: updateData,
      });

      // 7. Update PassengerRequest status if needed
      const passengerRequestStatus = PASSENGER_REQUEST_STATUS_MAP[newState];
      if (passengerRequestStatus) {
        await tx.passengerRequest.update({
          where: { id: assignment.passengerRequestId },
          data: { status: passengerRequestStatus },
        });
      }

      // 8. Update Taxi status if needed
      const taxiStatus = TAXI_STATUS_MAP[newState];
      if (taxiStatus && assignment.taxiId) {
        await tx.taxi.update({
          where: { id: assignment.taxiId },
          data: { operationalStatus: taxiStatus },
        });
      }

      // 9. Create AuditLog entry
      await tx.auditLog.create({
        data: {
          entityType: 'ASSIGNMENT',
          entityId: assignment.id,
          action: 'state_changed',
          performedBy: `DRIVER:${driver.id}`,
          metadata: {
            previousState: currentState,
            newState,
            cancellationReason: cancellationReason || null,
            timestamp: new Date().toISOString(),
            driverName: driver.fullName,
            passengerRequestId: assignment.passengerRequestId,
          },
        },
      });

      return updatedAssignment;
    });

    // Return success
    return NextResponse.json(
      {
        ok: true,
        message: 'Assignment state updated successfully',
        assignment: {
          id: result.id,
          status: result.status,
          updatedAt: result.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Driver assignment state update error:', error);

    // Handle specific errors
    if (error.message?.includes('Unauthorized') || error.message?.includes('Forbidden')) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: error.message.includes('Forbidden') ? 403 : 401 }
      );
    }

    if (error.message?.includes('not found')) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 404 }
      );
    }

    if (error.message?.includes('Invalid transition') || error.message?.includes('required')) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
