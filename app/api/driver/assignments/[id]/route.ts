/**
 * Driver Assignment Detail API
 *
 * GET /api/driver/assignments/:id
 *
 * Returns detailed information about a specific assignment
 * Driver can only access their own assignments
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireDriverAuth } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const driver = await requireDriverAuth(req);

    // Await params (Next.js 15+)
    const { id } = await params;

    // Fetch assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        passengerRequest: {
          select: {
            id: true,
            passengerName: true,
            passengerPhone: true,
            passengerEmail: true,
            originAddress: true,
            destinationAddress: true,
            scheduledFor: true,
            notes: true,
            status: true,
            createdAt: true,
          },
        },
        taxi: {
          select: {
            id: true,
            licensePlate: true,
            type: true,
            city: true,
            zone: true,
          },
        },
        driver: {
          select: {
            id: true,
            fullName: true,
            phone: true,
          },
        },
        fleetOperator: {
          select: {
            id: true,
            name: true,
            type: true,
            city: true,
            contactPhone: true,
          },
        },
      },
    });

    // Check if assignment exists
    if (!assignment) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Assignment not found',
        },
        { status: 404 }
      );
    }

    // Verify driver owns this assignment
    if (assignment.driverId !== driver.id) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Forbidden - You do not have access to this assignment',
        },
        { status: 403 }
      );
    }

    // Return assignment detail
    return NextResponse.json(
      {
        ok: true,
        assignment: {
          id: assignment.id,
          status: assignment.status,
          createdAt: assignment.createdAt,
          updatedAt: assignment.updatedAt,
          assignedBy: assignment.assignedBy,
          sentToDriverAt: assignment.sentToDriverAt,
          acceptedAt: assignment.acceptedAt,
          rejectedAt: assignment.rejectedAt,
          enRouteAt: assignment.enRouteAt,
          onboardAt: assignment.onboardAt,
          completedAt: assignment.completedAt,
          canceledAt: assignment.canceledAt,
          cancellationReason: assignment.cancellationReason,
          canceledBy: assignment.canceledBy,
          estimatedFare: assignment.estimatedFare,
          finalFare: assignment.finalFare,
          passengerRequest: assignment.passengerRequest,
          taxi: assignment.taxi,
          driver: assignment.driver,
          fleetOperator: assignment.fleetOperator,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Driver assignment detail error:', error);

    // Handle authentication errors
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unauthorized - Invalid or missing token',
        },
        { status: 401 }
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
