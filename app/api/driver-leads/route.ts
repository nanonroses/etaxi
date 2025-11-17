import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, handleRateLimitError } from '@/lib/rate-limit';

// Rate limiter: 5 requests per minute per IP (stricter for leads)
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 5,
});

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    try {
      await limiter.check(req);
    } catch (error) {
      const { status, body, headers } = handleRateLimitError(error);
      return NextResponse.json(body, { status, headers });
    }

    const body = await req.json();

    const { fullName, email, phone, city, hasTaxi, notes } = body;

    // Validaciones mínimas
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios: nombre completo y teléfono' },
        { status: 400 }
      );
    }

    // Validar teléfono
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Formato de teléfono inválido' },
        { status: 400 }
      );
    }

    // Validar email si se proporciona
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Formato de email inválido' },
          { status: 400 }
        );
      }
    }

    // Limitar tamaño de notas
    if (notes && notes.length > 500) {
      return NextResponse.json(
        { error: 'Las notas no pueden exceder 500 caracteres' },
        { status: 400 }
      );
    }

    // Crear lead de conductor
    const lead = await prisma.driverLead.create({
      data: {
        fullName: fullName.trim(),
        email: email?.trim() || null,
        phone: phone.trim(),
        city: city?.trim() || null,
        hasTaxi: hasTaxi === true || hasTaxi === 'true',
        notes: notes?.trim() || null,
        source: 'conductores-web',
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: lead.id,
        message: 'Solicitud recibida. Nos comunicaremos contigo pronto.'
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creando DriverLead:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
