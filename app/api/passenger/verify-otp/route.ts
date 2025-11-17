/**
 * POST /api/passenger/verify-otp
 *
 * Verifica el código OTP y retorna JWT token
 */

import { NextResponse } from 'next/server';
import { verifyOTP, findOrCreatePassenger, generatePassengerToken } from '@/lib/passenger-auth';
import { rateLimit, handleRateLimitError } from '@/lib/rate-limit';

// Rate limiting: 5 requests per 5 minutes
const limiter = rateLimit({
  interval: 5 * 60 * 1000,
  maxRequests: 5,
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    await limiter.check(request);

    const body = await request.json();
    const { phone, otp } = body;

    // Validate input
    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Teléfono y código OTP requeridos' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValid = verifyOTP(phone, otp);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Código incorrecto o expirado' },
        { status: 400 }
      );
    }

    // Find or create passenger
    const passenger = await findOrCreatePassenger(phone);

    // Generate JWT token
    const token = generatePassengerToken({
      passengerId: passenger.id,
      phone: passenger.phone,
    });

    // Return response
    return NextResponse.json({
      token,
      passenger: {
        id: passenger.id,
        phone: passenger.phone,
        name: passenger.name,
        email: passenger.email,
        createdAt: passenger.createdAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    // Handle rate limit error
    if (error.message?.includes('Rate limit')) {
      const { status, body, headers } = handleRateLimitError(error);
      return NextResponse.json(body, { status, headers });
    }

    console.error('Error in /api/passenger/verify-otp:', error);
    return NextResponse.json(
      { error: 'Error al verificar código' },
      { status: 500 }
    );
  }
}
