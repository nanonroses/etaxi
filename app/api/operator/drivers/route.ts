import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/operator/drivers?operatorId=xxx&enabled=true
 * Listar conductores por operador de flota
 */
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const operatorId = searchParams.get('operatorId');
    const enabled = searchParams.get('enabled');

    // Construir filtros
    const where: any = {};

    if (operatorId) {
      where.fleetOperatorId = operatorId;
    }

    if (enabled === 'true') {
      where.isEnabled = true;
      // Solo conductores con licencia vigente
      where.licenseValidUntil = {
        gte: new Date(),
      };
    } else if (enabled === 'false') {
      where.isEnabled = false;
    }

    // Obtener conductores
    const drivers = await prisma.driver.findMany({
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
        fullName: 'asc',
      },
      take: 100, // Limitar a 100 conductores
    });

    return NextResponse.json({
      ok: true,
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json(
      { error: 'Error al obtener conductores' },
      { status: 500 }
    );
  }
}
