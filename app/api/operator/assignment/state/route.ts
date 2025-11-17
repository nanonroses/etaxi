import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/operator/assignment/state
 * Cambiar estado de una asignación
 */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { assignmentId, newState, cancellationReason } = body;

    // Validar datos requeridos
    if (!assignmentId || !newState) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios: assignmentId, newState' },
        { status: 400 }
      );
    }

    // Validar estados permitidos
    const allowedStates = [
      'SENT_TO_DRIVER',
      'ACCEPTED_BY_DRIVER',
      'REJECTED_BY_DRIVER',
      'COMPLETED',
      'CANCELED',
    ];

    if (!allowedStates.includes(newState)) {
      return NextResponse.json(
        {
          error: `Estado no permitido: ${newState}. Estados válidos: ${allowedStates.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Ejecutar en transacción
    const result = await prisma.$transaction(async (tx) => {
      // 1. Obtener Assignment actual
      const assignment = await tx.assignment.findUnique({
        where: { id: assignmentId },
        include: {
          passengerRequest: true,
          taxi: true,
          driver: true,
        },
      });

      if (!assignment) {
        throw new Error('Asignación no encontrada');
      }

      const previousState = assignment.status;

      // 2. Preparar datos de actualización
      const updateData: any = {
        status: newState,
      };

      // Actualizar timestamps según el estado
      if (newState === 'SENT_TO_DRIVER') {
        updateData.sentToDriverAt = new Date();
      } else if (newState === 'ACCEPTED_BY_DRIVER') {
        updateData.acceptedAt = new Date();
        updateData.enRouteAt = new Date();
      } else if (newState === 'REJECTED_BY_DRIVER') {
        updateData.rejectedAt = new Date();
      } else if (newState === 'COMPLETED') {
        updateData.completedAt = new Date();
      } else if (newState === 'CANCELED') {
        updateData.canceledAt = new Date();
        updateData.cancellationReason = cancellationReason || 'Sin razón especificada';
        updateData.canceledBy = 'OPERATOR';
      }

      // 3. Actualizar Assignment
      const updatedAssignment = await tx.assignment.update({
        where: { id: assignmentId },
        data: updateData,
      });

      // 4. Actualizar PassengerRequest según el nuevo estado
      let newRequestStatus: string | null = null;

      if (newState === 'ACCEPTED_BY_DRIVER') {
        newRequestStatus = 'DRIVER_EN_ROUTE';
      } else if (newState === 'COMPLETED') {
        newRequestStatus = 'COMPLETED';
      } else if (newState === 'REJECTED_BY_DRIVER' || newState === 'CANCELED') {
        newRequestStatus = 'PENDING_ASSIGNMENT'; // Volver a pendiente para reasignar
      }

      if (newRequestStatus) {
        await tx.passengerRequest.update({
          where: { id: assignment.passengerRequestId },
          data: { status: newRequestStatus },
        });
      }

      // 5. Liberar Taxi si se completa o cancela
      if (
        newState === 'COMPLETED' ||
        newState === 'CANCELED' ||
        newState === 'REJECTED_BY_DRIVER'
      ) {
        if (assignment.taxi) {
          await tx.taxi.update({
            where: { id: assignment.taxiId! },
            data: { operationalStatus: 'AVAILABLE' },
          });
        }
      }

      // 6. AuditLog - Assignment cambio de estado
      await tx.auditLog.create({
        data: {
          entityType: 'ASSIGNMENT',
          entityId: assignmentId,
          action: `status_changed_to_${newState.toLowerCase()}`,
          performedBy: `OPERATOR:${session.user?.email || 'unknown'}`,
          metadata: {
            previousState,
            newState,
            cancellationReason,
          },
        },
      });

      // 7. AuditLog - PassengerRequest si cambió estado
      if (newRequestStatus) {
        await tx.auditLog.create({
          data: {
            entityType: 'PASSENGER_REQUEST',
            entityId: assignment.passengerRequestId,
            action: 'status_changed',
            performedBy: 'SYSTEM',
            metadata: {
              previousState: assignment.passengerRequest.status,
              newState: newRequestStatus,
              triggeredBy: `assignment_state_change_to_${newState}`,
            },
          },
        });
      }

      return {
        assignment: updatedAssignment,
        previousState,
        newRequestStatus,
      };
    });

    return NextResponse.json({
      ok: true,
      message: 'Estado actualizado exitosamente',
      assignment: result.assignment,
      previousState: result.previousState,
      newState,
    });
  } catch (error) {
    console.error('Error updating assignment state:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Error al actualizar estado';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
