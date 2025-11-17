/**
 * GET /api/passenger/profile
 * PATCH /api/passenger/profile
 *
 * Obtiene y actualiza el perfil del pasajero
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';

/**
 * GET - Obtiene el perfil del pasajero
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    // Get passenger with stats
    const passengerData = await prisma.passenger.findUnique({
      where: { id: passenger.id },
      include: {
        requests: {
          where: {
            status: 'COMPLETED',
          },
          select: {
            id: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!passengerData) {
      return NextResponse.json(
        { error: 'Pasajero no encontrado' },
        { status: 404 }
      );
    }

    // Calculate stats
    const totalTrips = await prisma.passengerRequest.count({
      where: {
        passengerId: passenger.id,
        status: 'COMPLETED',
      },
    });

    let averageRating = null;
    if (passengerData.ratings.length > 0) {
      const sum = passengerData.ratings.reduce((acc, r) => acc + r.rating, 0);
      averageRating = Number((sum / passengerData.ratings.length).toFixed(1));
    }

    const lastTripAt = passengerData.requests[0]?.createdAt || null;

    // Return response
    return NextResponse.json({
      id: passengerData.id,
      phone: passengerData.phone,
      name: passengerData.name,
      email: passengerData.email,
      createdAt: passengerData.createdAt,
      stats: {
        totalTrips,
        averageRating,
        lastTripAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in GET /api/passenger/profile:', error);
    return NextResponse.json(
      { error: 'Error al obtener perfil' },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Actualiza el perfil del pasajero
 */
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const body = await request.json();
    const { name, email } = body;

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validate name length if provided
    if (name && name.length > 100) {
      return NextResponse.json(
        { error: 'Nombre muy largo (máximo 100 caracteres)' },
        { status: 400 }
      );
    }

    // Update passenger
    const updatedPassenger = await prisma.passenger.update({
      where: { id: passenger.id },
      data: {
        name: name !== undefined ? name : undefined,
        email: email !== undefined ? email : undefined,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        entityType: 'PASSENGER',
        entityId: passenger.id,
        action: 'profile_updated',
        performedBy: `PASSENGER:${passenger.id}`,
        metadata: {
          updatedFields: {
            name: name !== undefined,
            email: email !== undefined,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      passenger: {
        id: updatedPassenger.id,
        phone: updatedPassenger.phone,
        name: updatedPassenger.name,
        email: updatedPassenger.email,
        createdAt: updatedPassenger.createdAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in PATCH /api/passenger/profile:', error);
    return NextResponse.json(
      { error: 'Error al actualizar perfil' },
      { status: 500 }
    );
  }
}
