/**
 * GET /api/passenger/tracking/:assignmentId
 *
 * Obtiene la posición GPS actual del conductor asignado
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const { assignmentId } = await params;

    // Find assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        passengerRequest: {
          select: {
            passengerId: true,
          },
        },
        driver: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Asignación no encontrada' },
        { status: 404 }
      );
    }

    // Check ownership
    if (assignment.passengerRequest.passengerId !== passenger.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para ver el tracking de esta asignación' },
        { status: 403 }
      );
    }

    // Check if trip is finished
    if (assignment.status === 'COMPLETED' || assignment.status === 'CANCELED') {
      return NextResponse.json(
        { error: 'El viaje ya finalizó' },
        { status: 410 }
      );
    }

    // Get latest driver position
    if (!assignment.driver) {
      return NextResponse.json(
        { error: 'No hay conductor asignado' },
        { status: 404 }
      );
    }

    const driverPosition = await prisma.driverPosition.findFirst({
      where: {
        driverId: assignment.driver.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (!driverPosition) {
      return NextResponse.json(
        { error: 'No hay posición GPS disponible' },
        { status: 404 }
      );
    }

    // Return response
    return NextResponse.json({
      lat: driverPosition.lat,
      lng: driverPosition.lng,
      heading: driverPosition.heading,
      speed: driverPosition.speed,
      updatedAt: driverPosition.updatedAt,
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/tracking/:assignmentId:', error);
    return NextResponse.json(
      { error: 'Error al obtener tracking' },
      { status: 500 }
    );
  }
}
