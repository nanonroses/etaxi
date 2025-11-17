/**
 * GET /api/passenger/request/:id
 *
 * Obtiene el estado de una solicitud de taxi
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const { id } = await params;

    // Find request
    const passengerRequest = await prisma.passengerRequest.findUnique({
      where: { id },
      include: {
        assignment: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!passengerRequest) {
      return NextResponse.json(
        { error: 'Solicitud no encontrada' },
        { status: 404 }
      );
    }

    // Check ownership
    if (passengerRequest.passengerId !== passenger.id) {
      return NextResponse.json(
        { error: 'No tienes permiso para ver esta solicitud' },
        { status: 403 }
      );
    }

    // Return response
    return NextResponse.json({
      id: passengerRequest.id,
      status: passengerRequest.status,
      pickupAddress: passengerRequest.originAddress,
      pickupLat: passengerRequest.pickupLat,
      pickupLng: passengerRequest.pickupLng,
      dropoffAddress: passengerRequest.destinationAddress,
      dropoffLat: passengerRequest.dropoffLat,
      dropoffLng: passengerRequest.dropoffLng,
      taxiType: passengerRequest.taxiType,
      notes: passengerRequest.notes,
      createdAt: passengerRequest.createdAt,
      assignmentId: passengerRequest.assignment?.id || null,
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/request/:id:', error);
    return NextResponse.json(
      { error: 'Error al obtener solicitud' },
      { status: 500 }
    );
  }
}
