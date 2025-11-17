/**
 * POST /api/passenger/create-request
 *
 * Crea una nueva solicitud de taxi
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { requirePassengerAuth } from '@/lib/passenger-auth';
import { prisma } from '@/lib/prisma';
import { rateLimit, handleRateLimitError } from '@/lib/rate-limit';

// Rate limiting: 10 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 10,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    await limiter.check(request);

    // Authenticate passenger
    const passenger = await requirePassengerAuth(request);

    const body = await request.json();
    const {
      pickupAddress,
      pickupLat,
      pickupLng,
      dropoffAddress,
      dropoffLat,
      dropoffLng,
      taxiType,
      notes,
    } = body;

    // Validate required fields
    if (!pickupAddress || pickupLat === undefined || pickupLng === undefined || !taxiType) {
      return NextResponse.json(
        { error: 'Dirección de origen, coordenadas y tipo de taxi requeridos' },
        { status: 400 }
      );
    }

    // Validate coordinates
    if (pickupLat < -90 || pickupLat > 90 || pickupLng < -180 || pickupLng > 180) {
      return NextResponse.json(
        { error: 'Coordenadas inválidas' },
        { status: 400 }
      );
    }

    // Validate taxi type
    const validTypes = ['BASIC', 'EXECUTIVE', 'TOURISM', 'VAN', 'LUXURY'];
    if (!validTypes.includes(taxiType)) {
      return NextResponse.json(
        { error: 'Tipo de taxi inválido' },
        { status: 400 }
      );
    }

    // Check if passenger has an active request
    const activeRequest = await prisma.passengerRequest.findFirst({
      where: {
        passengerId: passenger.id,
        status: {
          in: ['CREATED', 'PENDING_ASSIGNMENT', 'ASSIGNED'],
        },
      },
    });

    if (activeRequest) {
      return NextResponse.json(
        { error: 'Ya tienes una solicitud activa' },
        { status: 409 }
      );
    }

    // Create passenger request
    const passengerRequest = await prisma.passengerRequest.create({
      data: {
        passengerId: passenger.id,
        passengerName: passenger.name || 'Pasajero',
        passengerPhone: passenger.phone,
        passengerEmail: passenger.email,
        originAddress: pickupAddress,
        destinationAddress: dropoffAddress || null,
        pickupLat,
        pickupLng,
        dropoffLat: dropoffLat || null,
        dropoffLng: dropoffLng || null,
        taxiType,
        notes: notes || null,
        channel: 'APP_PASSENGER',
        status: 'PENDING_ASSIGNMENT',
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        entityType: 'PASSENGER_REQUEST',
        entityId: passengerRequest.id,
        action: 'created',
        performedBy: `PASSENGER:${passenger.id}`,
        metadata: {
          taxiType,
          pickupAddress,
          dropoffAddress,
        },
      },
    });

    return NextResponse.json({
      requestId: passengerRequest.id,
      status: passengerRequest.status,
      createdAt: passengerRequest.createdAt,
    }, { status: 201 });

  } catch (error: any) {
    // Handle rate limit error
    if (error.message?.includes('Rate limit')) {
      const { status, body, headers } = handleRateLimitError(error);
      return NextResponse.json(body, { status, headers });
    }

    // Handle auth error
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    console.error('Error in /api/passenger/create-request:', error);
    return NextResponse.json(
      { error: 'Error al crear solicitud' },
      { status: 500 }
    );
  }
}
