import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, email, pickupAddress, dropoffAddress, when, notes } = body;

    // Validaciones mínimas
    if (!name || !phone || !pickupAddress) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios: nombre, teléfono y dirección de origen' },
        { status: 400 }
      );
    }

    // Validar formato de teléfono (básico)
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

    // Limitar tamaño de textos
    if (notes && notes.length > 500) {
      return NextResponse.json(
        { error: 'Las notas no pueden exceder 500 caracteres' },
        { status: 400 }
      );
    }

    // Crear solicitud de taxi
    const ride = await prisma.rideRequest.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        pickupAddress: pickupAddress.trim(),
        dropoffAddress: dropoffAddress?.trim() || null,
        when: when?.trim() || 'ahora',
        notes: notes?.trim() || null,
        source: 'web',
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: ride.id,
        message: 'Solicitud recibida correctamente. Te contactaremos pronto.'
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creando RideRequest:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
