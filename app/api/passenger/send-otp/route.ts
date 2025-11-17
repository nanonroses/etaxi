/**
 * POST /api/passenger/send-otp
 *
 * Envía código OTP por SMS al teléfono del pasajero
 */

import { NextResponse } from 'next/server';
import { sendOTP } from '@/lib/passenger-auth';
import { rateLimit, handleRateLimitError } from '@/lib/rate-limit';

// Rate limiting: 3 requests per minute
const limiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 3,
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    await limiter.check(request);

    const body = await request.json();
    const { phone } = body;

    // Validate phone
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Número de teléfono requerido' },
        { status: 400 }
      );
    }

    // Validate Chilean phone format
    if (!phone.startsWith('+569') || phone.length !== 12) {
      return NextResponse.json(
        { error: 'Número de teléfono inválido. Debe ser formato chileno (+569XXXXXXXX)' },
        { status: 400 }
      );
    }

    // Send OTP
    const result = await sendOTP(phone);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Error al enviar código SMS' },
        { status: 500 }
      );
    }

    // Response
    const response: any = {
      success: true,
      message: 'Código enviado exitosamente',
    };

    // In development, include OTP for testing
    if (process.env.NODE_ENV === 'development' && result.otp) {
      response.otp = result.otp;
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    // Handle rate limit error
    if (error.message?.includes('Rate limit')) {
      const { status, body, headers } = handleRateLimitError(error);
      return NextResponse.json(body, { status, headers });
    }

    console.error('Error in /api/passenger/send-otp:', error);
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    );
  }
}
