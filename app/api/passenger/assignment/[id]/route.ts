/**
 * GET /api/passenger/assignment/:id
 *
 * Obtiene los detalles completos de una asignación (conductor, taxi, operador)
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

    // Find assignment with all relations
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        passengerRequest: {
          select: {
            passengerId: true,
          },
        },
        driver: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            professionalLicense: true,
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
            city: true,
          },
        },
        rating: {
          select: {
            rating: true,
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
        { error: 'No tienes permiso para ver esta asignación' },
        { status: 403 }
      );
    }

    // Calculate average rating for driver (optional)
    let driverRating = null;
    if (assignment.driver) {
      const ratings = await prisma.rating.findMany({
        where: {
          assignment: {
            driverId: assignment.driver.id,
          },
        },
        select: {
          rating: true,
        },
      });

      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        driverRating = Number((sum / ratings.length).toFixed(1));
      }
    }

    // Return response
    return NextResponse.json({
      id: assignment.id,
      status: assignment.status,
      driver: assignment.driver ? {
        id: assignment.driver.id,
        fullName: assignment.driver.fullName,
        phone: assignment.driver.phone,
        photo: null, // TODO: Add photo storage
        professionalLicense: assignment.driver.professionalLicense,
        rating: driverRating,
      } : null,
      taxi: assignment.taxi ? {
        id: assignment.taxi.id,
        licensePlate: assignment.taxi.licensePlate,
        type: assignment.taxi.type,
        brand: null, // TODO: Add to schema
        model: null, // TODO: Add to schema
        color: null, // TODO: Add to schema
      } : null,
      operator: assignment.fleetOperator ? {
        id: assignment.fleetOperator.id,
        name: assignment.fleetOperator.name,
        city: assignment.fleetOperator.city,
      } : null,
      estimatedArrival: null, // TODO: Calculate based on GPS
      assignedAt: assignment.createdAt,
      acceptedAt: assignment.acceptedAt,
      startedAt: assignment.enRouteAt,
      completedAt: assignment.completedAt,
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/assignment/:id:', error);
    return NextResponse.json(
      { error: 'Error al obtener asignación' },
      { status: 500 }
    );
  }
}
