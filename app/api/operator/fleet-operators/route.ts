import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/operator/fleet-operators
 * Listar operadores de flota activos
 */
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const operators = await prisma.fleetOperator.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      ok: true,
      count: operators.length,
      operators,
    });
  } catch (error) {
    console.error('Error fetching fleet operators:', error);
    return NextResponse.json(
      { error: 'Error al obtener operadores de flota' },
      { status: 500 }
    );
  }
}
