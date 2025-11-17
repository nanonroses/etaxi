import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/operator/taxis?city=santiago&status=AVAILABLE
 * Listar taxis disponibles por ciudad y estado
 */
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const status = searchParams.get('status') || 'AVAILABLE';
    const operatorId = searchParams.get('operatorId');

    // Construir filtros
    const where: any = {
      operationalStatus: status,
    };

    if (city) {
      where.city = city;
    }

    if (operatorId) {
      where.fleetOperatorId = operatorId;
    }

    // Incluir solo operadores activos
    where.fleetOperator = {
      isActive: true,
    };

    // Obtener taxis
    const taxis = await prisma.taxi.findMany({
      where,
      include: {
        fleetOperator: {
          select: {
            id: true,
            name: true,
            type: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limitar a 100 taxis
    });

    return NextResponse.json({
      ok: true,
      count: taxis.length,
      taxis,
    });
  } catch (error) {
    console.error('Error fetching taxis:', error);
    return NextResponse.json(
      { error: 'Error al obtener taxis' },
      { status: 500 }
    );
  }
}
