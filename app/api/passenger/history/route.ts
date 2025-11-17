/**
 * GET /api/passenger/history
 *
 * Obtiene el historial de viajes del pasajero
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Build where clause
    const where: any = {
      passengerId: passenger.id,
      status: {
        in: ['COMPLETED', 'CANCELED_BY_PASSENGER', 'CANCELED_BY_DRIVER', 'CANCELED_BY_OPERATOR'],
      },
    };

    // Add date filters if provided
    if (from || to) {
      where.createdAt = {};
      if (from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    // Get total count
    const total = await prisma.passengerRequest.count({ where });

    // Get trips
    const requests = await prisma.passengerRequest.findMany({
      where,
      include: {
        assignment: {
          include: {
            driver: {
              select: {
                fullName: true,
              },
            },
            taxi: {
              select: {
                licensePlate: true,
              },
            },
            rating: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    // Format trips
    const trips = requests.map((req) => ({
      id: req.id,
      requestId: req.id,
      assignmentId: req.assignment?.id || null,
      pickupAddress: req.originAddress,
      dropoffAddress: req.destinationAddress,
      status: req.status,
      driver: req.assignment?.driver ? {
        fullName: req.assignment.driver.fullName,
        photo: null, // TODO
      } : null,
      taxi: req.assignment?.taxi ? {
        licensePlate: req.assignment.taxi.licensePlate,
      } : null,
      createdAt: req.createdAt,
      completedAt: req.assignment?.completedAt || null,
      rating: req.assignment?.rating?.rating || null,
      distance: null, // TODO: Calculate from coordinates
      duration: req.assignment?.completedAt && req.assignment.enRouteAt
        ? Math.floor((new Date(req.assignment.completedAt).getTime() - new Date(req.assignment.enRouteAt).getTime()) / 1000)
        : null,
    }));

    return NextResponse.json({
      trips,
      total,
      limit,
      offset,
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/history:', error);
    return NextResponse.json(
      { error: 'Error al obtener historial' },
      { status: 500 }
    );
  }
}
