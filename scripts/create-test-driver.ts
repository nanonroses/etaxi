/**
 * Script para crear conductor de prueba
 *
 * Uso:
 * npx tsx scripts/create-test-driver.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Creando conductor de prueba...\n');

  try {
    // 1. Verificar/crear operador de prueba
    let operator = await prisma.fleetOperator.findFirst({
      where: { name: 'Operador Demo' },
    });

    if (!operator) {
      console.log('📋 Creando operador de prueba...');
      operator = await prisma.fleetOperator.create({
        data: {
          name: 'Operador Demo',
          type: 'GUILD',
          city: 'SANTIAGO',
          isActive: true,
          contactEmail: 'operador@etaxi.cl',
          contactPhone: '+56912345678',
        },
      });
      console.log('✅ Operador creado:', operator.name);
    } else {
      console.log('✅ Operador ya existe:', operator.name);
    }

    // 2. Verificar si conductor ya existe
    const existingDriver = await prisma.driver.findFirst({
      where: { phone: '+56912345678' },
    });

    if (existingDriver) {
      console.log('\n⚠️  Conductor ya existe con teléfono +56912345678');
      console.log('Actualizando password...');

      const hashedPassword = await bcrypt.hash('conductor123', 10);

      await prisma.driver.update({
        where: { id: existingDriver.id },
        data: {
          password: hashedPassword,
          isEnabled: true,
        },
      });

      console.log('✅ Conductor actualizado');
      console.log('\n📱 CREDENCIALES DE PRUEBA:');
      console.log('   Teléfono: +56912345678');
      console.log('   Password: conductor123');
      console.log('   Nombre:', existingDriver.fullName);

      return;
    }

    // 3. Crear conductor de prueba
    console.log('\n👤 Creando conductor de prueba...');

    const hashedPassword = await bcrypt.hash('conductor123', 10);

    const driver = await prisma.driver.create({
      data: {
        fullName: 'Conductor Demo',
        phone: '+56912345678',
        email: 'conductor@etaxi.cl',
        password: hashedPassword,
        professionalLicense: 'A1234567',
        licenseValidUntil: new Date('2025-12-31'),
        isEnabled: true,
        fleetOperatorId: operator.id,
      },
    });

    console.log('✅ Conductor creado exitosamente!');
    console.log('\n📱 CREDENCIALES DE PRUEBA:');
    console.log('   Teléfono: +56912345678');
    console.log('   Password: conductor123');
    console.log('   ID:', driver.id);
    console.log('   Nombre:', driver.fullName);
    console.log('   Email:', driver.email);
    console.log('   Operador:', operator.name);

    // 4. Crear taxi de prueba (opcional)
    console.log('\n🚕 Creando taxi de prueba...');

    const taxi = await prisma.taxi.create({
      data: {
        licensePlate: 'AB1234',
        type: 'STANDARD',
        city: 'SANTIAGO',
        zone: 'Centro',
        operationalStatus: 'AVAILABLE',
        fleetOperatorId: operator.id,
      },
    });

    console.log('✅ Taxi creado:', taxi.licensePlate);

    console.log('\n✨ ¡Setup completo!');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Iniciar backend: npm run dev');
    console.log('   2. Iniciar app: cd etaxi-driver && npm start');
    console.log('   3. Login con las credenciales arriba');

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
