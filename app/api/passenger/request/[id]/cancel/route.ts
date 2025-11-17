/**
 * POST /api/passenger/request/:id/cancel
 *
 * Cancela una solicitud de taxi
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const { id } = await params;
    const body = await request.json();
    const { reason } = body;

    // Find request
    const passengerRequest = await prisma.passengerRequest.findUnique({
      where: { id },
      include: {
        assignment: true,
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
        { error: 'No tienes permiso para cancelar esta solicitud' },
        { status: 403 }
      );
    }

    // Check if can be cancelled
    const nonCancellableStatuses = ['COMPLETED', 'CANCELED_BY_PASSENGER', 'CANCELED_BY_DRIVER', 'CANCELED_BY_OPERATOR'];
    if (nonCancellableStatuses.includes(passengerRequest.status)) {
      return NextResponse.json(
        { error: 'No puedes cancelar una solicitud en este estado' },
        { status: 400 }
      );
    }

    // Check if passenger is onboard (should not cancel while in taxi)
    if (passengerRequest.status === 'PASSENGER_ONBOARD') {
      return NextResponse.json(
        { error: 'No puedes cancelar un viaje que ya inició' },
        { status: 400 }
      );
    }

    // Update request status
    await prisma.passengerRequest.update({
      where: { id },
      data: {
        status: 'CANCELED_BY_PASSENGER',
      },
    });

    // If there's an assignment, cancel it too
    if (passengerRequest.assignment) {
      await prisma.assignment.update({
        where: { id: passengerRequest.assignment.id },
        data: {
          status: 'CANCELED',
          canceledAt: new Date(),
          canceledBy: 'PASSENGER',
          cancellationReason: reason || 'Cancelado por pasajero',
        },
      });

      // Update taxi status back to AVAILABLE
      if (passengerRequest.assignment.taxiId) {
        await prisma.taxi.update({
          where: { id: passengerRequest.assignment.taxiId },
          data: {
            operationalStatus: 'AVAILABLE',
          },
        });
      }
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        entityType: 'PASSENGER_REQUEST',
        entityId: id,
        action: 'canceled',
        performedBy: `PASSENGER:${passenger.id}`,
        metadata: {
          reason: reason || null,
          previousStatus: passengerRequest.status,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Solicitud cancelada exitosamente',
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/request/:id/cancel:', error);
    return NextResponse.json(
      { error: 'Error al cancelar solicitud' },
      { status: 500 }
    );
  }
}
