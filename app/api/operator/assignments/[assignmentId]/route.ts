import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/operator/assignments/[assignmentId]
 * Obtener una asignación específica con todos sus datos relacionados
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ assignmentId: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params (Next.js 15+)
    const { assignmentId } = await params;

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        passengerRequest: true,
        taxi: true,
        driver: true,
        fleetOperator: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Asignación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      assignment,
    });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    return NextResponse.json(
      { error: 'Error al obtener asignación' },
      { status: 500 }
    );
  }
}
