/**
 * Driver Assignments List API
 *
 * GET /api/driver/assignments?status=SENT_TO_DRIVER
 *
 * Returns list of assignments for the authenticated driver
 * Supports filtering by status query parameter
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireDriverAuth } from '@/lib/driver-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const driver = await requireDriverAuth(req);

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status');

    // Build query
    const whereClause: any = {
      driverId: driver.id,
    };

    // Add status filter if provided
    if (statusFilter) {
      // Support multiple statuses separated by comma
      const statuses = statusFilter.split(',').map(s => s.trim());
      if (statuses.length === 1) {
        whereClause.status = statuses[0];
      } else {
        whereClause.status = { in: statuses };
      }
    } else {
      // By default, show only active assignments (not completed or canceled)
      whereClause.status = {
        in: ['CREATED', 'SENT_TO_DRIVER', 'ACCEPTED_BY_DRIVER'],
      };
    }

    // Fetch assignments
    const assignments = await prisma.assignment.findMany({
      where: whereClause,
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
          },
        },
        fleetOperator: {
          select: {
            id: true,
            name: true,
            type: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent
    });

    // Return assignments
    return NextResponse.json(
      {
        ok: true,
        count: assignments.length,
        assignments: assignments.map(a => ({
          id: a.id,
          status: a.status,
          createdAt: a.createdAt,
          sentToDriverAt: a.sentToDriverAt,
          acceptedAt: a.acceptedAt,
          rejectedAt: a.rejectedAt,
          enRouteAt: a.enRouteAt,
          onboardAt: a.onboardAt,
          completedAt: a.completedAt,
          canceledAt: a.canceledAt,
          cancellationReason: a.cancellationReason,
          estimatedFare: a.estimatedFare,
          finalFare: a.finalFare,
          passengerRequest: a.passengerRequest,
          taxi: a.taxi,
          fleetOperator: a.fleetOperator,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Driver assignments list error:', error);

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
