import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/operator/assign
 * Crear una asignación manual de taxi a solicitud
 */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { requestId, taxiId, driverId, operatorId } = body;

    // Validar datos requeridos
    if (!requestId || !taxiId || !driverId) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios: requestId, taxiId, driverId' },
        { status: 400 }
      );
    }

    // Ejecutar en transacción
    const result = await prisma.$transaction(async (tx) => {
      // 1. Verificar PassengerRequest
      const request = await tx.passengerRequest.findUnique({
        where: { id: requestId },
      });

      if (!request) {
        throw new Error('Solicitud de pasajero no encontrada');
      }

      if (request.status !== 'PENDING_ASSIGNMENT') {
        throw new Error(
          `No se puede asignar solicitud con estado: ${request.status}`
        );
      }

      // 2. Verificar Taxi
      const taxi = await tx.taxi.findUnique({
        where: { id: taxiId },
        include: { fleetOperator: true },
      });

      if (!taxi) {
        throw new Error('Taxi no encontrado');
      }

      if (taxi.operationalStatus !== 'AVAILABLE') {
        throw new Error(
          `Taxi ${taxi.licensePlate} no está disponible (estado: ${taxi.operationalStatus})`
        );
      }

      if (!taxi.fleetOperator.isActive) {
        throw new Error(
          `Operador de flota ${taxi.fleetOperator.name} no está activo`
        );
      }

      // 3. Verificar Driver
      const driver = await tx.driver.findUnique({
        where: { id: driverId },
      });

      if (!driver) {
        throw new Error('Conductor no encontrado');
      }

      if (!driver.isEnabled) {
        throw new Error(`Conductor ${driver.fullName} no está habilitado`);
      }

      if (
        driver.licenseValidUntil &&
        new Date(driver.licenseValidUntil) < new Date()
      ) {
        throw new Error(`Licencia del conductor ${driver.fullName} ha expirado`);
      }

      // 4. Crear Assignment
      const assignment = await tx.assignment.create({
        data: {
          passengerRequestId: requestId,
          taxiId,
          driverId,
          fleetOperatorId: operatorId || taxi.fleetOperatorId,
          status: 'CREATED',
          assignedBy: `OPERATOR:${session.user?.email || 'unknown'}`,
        },
      });

      // 5. Actualizar Taxi → BUSY
      await tx.taxi.update({
        where: { id: taxiId },
        data: { operationalStatus: 'BUSY' },
      });

      // 6. Actualizar PassengerRequest → ASSIGNED
      await tx.passengerRequest.update({
        where: { id: requestId },
        data: { status: 'ASSIGNED' },
      });

      // 7. AuditLog - Assignment creado
      await tx.auditLog.create({
        data: {
          entityType: 'ASSIGNMENT',
          entityId: assignment.id,
          action: 'created',
          performedBy: `OPERATOR:${session.user?.email || 'unknown'}`,
          metadata: {
            passengerRequestId: requestId,
            taxiId,
            taxiPlate: taxi.licensePlate,
            driverId,
            driverName: driver.fullName,
            fleetOperatorId: taxi.fleetOperatorId,
            fleetOperatorName: taxi.fleetOperator.name,
          },
        },
      });

      // 8. AuditLog - PassengerRequest cambio de estado
      await tx.auditLog.create({
        data: {
          entityType: 'PASSENGER_REQUEST',
          entityId: requestId,
          action: 'status_changed',
          performedBy: 'SYSTEM',
          metadata: {
            previousState: 'PENDING_ASSIGNMENT',
            newState: 'ASSIGNED',
            assignmentId: assignment.id,
          },
        },
      });

      return {
        assignment,
        taxi,
        driver,
        request,
      };
    });

    return NextResponse.json(
      {
        ok: true,
        message: 'Asignación creada exitosamente',
        assignment: result.assignment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating assignment:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Error al crear asignación';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
