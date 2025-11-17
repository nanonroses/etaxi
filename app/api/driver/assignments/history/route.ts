/**
 * Driver Assignments History API
 *
 * GET /api/driver/assignments/history?days=30&page=1&limit=20
 *
 * Returns completed and canceled assignments for the authenticated driver
 * Supports pagination and date filtering
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
    const daysParam = searchParams.get('days') || '30';
    const pageParam = searchParams.get('page') || '1';
    const limitParam = searchParams.get('limit') || '20';

    const days = parseInt(daysParam, 10);
    const page = parseInt(pageParam, 10);
    const limit = Math.min(parseInt(limitParam, 10), 100); // Max 100 per page

    // Calculate date threshold
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    // Build query
    const whereClause: any = {
      driverId: driver.id,
      status: {
        in: ['COMPLETED', 'CANCELED', 'REJECTED_BY_DRIVER'],
      },
      updatedAt: {
        gte: dateThreshold,
      },
    };

    // Count total records
    const total = await prisma.assignment.count({ where: whereClause });

    // Fetch assignments with pagination
    const assignments = await prisma.assignment.findMany({
      where: whereClause,
      include: {
        passengerRequest: {
          select: {
            id: true,
            passengerName: true,
            passengerPhone: true,
            originAddress: true,
            destinationAddress: true,
            scheduledFor: true,
            createdAt: true,
          },
        },
        taxi: {
          select: {
            id: true,
            licensePlate: true,
            type: true,
          },
        },
        fleetOperator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Return history with pagination
    return NextResponse.json(
      {
        ok: true,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
        history: assignments.map(a => ({
          id: a.id,
          status: a.status,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
          completedAt: a.completedAt,
          canceledAt: a.canceledAt,
          cancellationReason: a.cancellationReason,
          canceledBy: a.canceledBy,
          finalFare: a.finalFare,
          passengerRequest: a.passengerRequest,
          taxi: a.taxi,
          fleetOperator: a.fleetOperator,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Driver assignments history error:', error);

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
