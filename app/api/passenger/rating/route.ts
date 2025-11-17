/**
 * POST /api/passenger/rating
 *
 * Califica un viaje completado
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const body = await request.json();
    const { assignmentId, rating, comment } = body;

    // Validate required fields
    if (!assignmentId || !rating) {
      return NextResponse.json(
        { error: 'ID de asignación y calificación requeridos' },
        { status: 400 }
      );
    }

    // Validate rating value
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Calificación debe ser entre 1 y 5' },
        { status: 400 }
      );
    }

    // Validate comment length
    if (comment && comment.length > 500) {
      return NextResponse.json(
        { error: 'Comentario muy largo (máximo 500 caracteres)' },
        { status: 400 }
      );
    }

    // Find assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        passengerRequest: {
          select: {
            passengerId: true,
          },
        },
        rating: true,
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
        { error: 'No tienes permiso para calificar esta asignación' },
        { status: 403 }
      );
    }

    // Check if trip is completed
    if (assignment.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Solo puedes calificar viajes completados' },
        { status: 422 }
      );
    }

    // Check if already rated
    if (assignment.rating) {
      return NextResponse.json(
        { error: 'Ya calificaste este viaje' },
        { status: 409 }
      );
    }

    // Create rating
    await prisma.rating.create({
      data: {
        passengerId: passenger.id,
        assignmentId,
        rating,
        comment: comment || null,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        entityType: 'ASSIGNMENT',
        entityId: assignmentId,
        action: 'rated',
        performedBy: `PASSENGER:${passenger.id}`,
        metadata: {
          rating,
          hasComment: !!comment,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Gracias por tu calificación',
    }, { status: 201 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/rating:', error);
    return NextResponse.json(
      { error: 'Error al guardar calificación' },
      { status: 500 }
    );
  }
}
