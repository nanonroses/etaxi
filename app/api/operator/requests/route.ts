import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/operator/requests
 * Obtener todas las solicitudes pendientes de asignación
 */
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener solicitudes en estado PENDING_ASSIGNMENT
    const requests = await prisma.passengerRequest.findMany({
      where: {
        status: 'PENDING_ASSIGNMENT',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limitar a 100 solicitudes más recientes
    });

    return NextResponse.json({
      ok: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error('Error fetching passenger requests:', error);
    return NextResponse.json(
      { error: 'Error al obtener solicitudes' },
      { status: 500 }
    );
  }
}
