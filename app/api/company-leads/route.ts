import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { companyName, contactName, email, phone, employees, city, message } = body;

    // Validaciones mínimas
    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios: nombre de empresa, contacto y email' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar teléfono si se proporciona
    if (phone) {
      const phoneRegex = /^[+]?[\d\s\-()]+$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Formato de teléfono inválido' },
          { status: 400 }
        );
      }
    }

    // Validar número de empleados
    if (employees && (employees < 1 || employees > 100000)) {
      return NextResponse.json(
        { error: 'Número de empleados inválido' },
        { status: 400 }
      );
    }

    // Limitar tamaño de mensaje
    if (message && message.length > 1000) {
      return NextResponse.json(
        { error: 'El mensaje no puede exceder 1000 caracteres' },
        { status: 400 }
      );
    }

    // Crear lead de empresa
    const lead = await prisma.companyLead.create({
      data: {
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        employees: employees || null,
        city: city?.trim() || null,
        message: message?.trim() || null,
        source: 'empresas-gremios-web',
      },
    });

    return NextResponse.json(
      {
        ok: true,
        id: lead.id,
        message: 'Solicitud recibida. Nos pondremos en contacto contigo pronto.'
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creando CompanyLead:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
