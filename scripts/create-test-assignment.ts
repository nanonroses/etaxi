/**
 * Script para crear asignación de prueba
 *
 * Uso:
 * npx tsx scripts/create-test-assignment.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Creando asignación de prueba...\n');

  try {
    // 1. Buscar conductor de prueba
    const driver = await prisma.driver.findFirst({
      where: { phone: '+56912345678' },
    });

    if (!driver) {
      console.error('❌ No se encontró conductor de prueba.');
      console.log('Ejecuta primero: npx tsx scripts/create-test-driver.ts');
      return;
    }

    console.log('✅ Conductor encontrado:', driver.fullName);

    // 2. Buscar taxi disponible
    const taxi = await prisma.taxi.findFirst({
      where: {
        operationalStatus: 'AVAILABLE',
        fleetOperatorId: driver.fleetOperatorId,
      },
    });

    if (!taxi) {
      console.error('❌ No hay taxis disponibles.');
      console.log('Ejecuta primero: npx tsx scripts/create-test-driver.ts');
      return;
    }

    console.log('✅ Taxi encontrado:', taxi.licensePlate);

    // 3. Crear solicitud de pasajero
    console.log('\n👥 Creando solicitud de pasajero...');

    const passengerRequest = await prisma.passengerRequest.create({
      data: {
        passengerName: 'Juan Pérez',
        passengerPhone: '+56987654321',
        passengerEmail: 'juan@example.com',
        originAddress: 'Av. Providencia 1234, Santiago',
        destinationAddress: 'Av. Apoquindo 5678, Las Condes',
        scheduledFor: null, // inmediato
        channel: 'WEB',
        status: 'PENDING_ASSIGNMENT',
        notes: 'Cliente preferencial',
      },
    });

    console.log('✅ Solicitud creada:', passengerRequest.id);

    // 4. Crear asignación
    console.log('\n📋 Creando asignación...');

    const assignment = await prisma.assignment.create({
      data: {
        passengerRequestId: passengerRequest.id,
        taxiId: taxi.id,
        driverId: driver.id,
        fleetOperatorId: driver.fleetOperatorId,
        status: 'SENT_TO_DRIVER',
        assignedBy: 'SYSTEM:test-script',
        sentToDriverAt: new Date(),
      },
    });

    console.log('✅ Asignación creada:', assignment.id);

    // 5. Actualizar estados
    await prisma.passengerRequest.update({
      where: { id: passengerRequest.id },
      data: { status: 'ASSIGNED' },
    });

    await prisma.taxi.update({
      where: { id: taxi.id },
      data: { operationalStatus: 'BUSY' },
    });

    console.log('\n✨ ¡Asignación de prueba creada exitosamente!');
    console.log('\n📱 Ahora puedes:');
    console.log('   1. Abrir la app conductor');
    console.log('   2. Login con +56912345678');
    console.log('   3. Ver la asignación en Home');
    console.log('   4. Probar los cambios de estado');

    console.log('\n📊 Detalles de la asignación:');
    console.log('   ID:', assignment.id);
    console.log('   Estado:', assignment.status);
    console.log('   Conductor:', driver.fullName);
    console.log('   Taxi:', taxi.licensePlate);
    console.log('   Pasajero:', passengerRequest.passengerName);
    console.log('   Origen:', passengerRequest.originAddress);
    console.log('   Destino:', passengerRequest.destinationAddress);

  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
