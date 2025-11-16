import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@etaxi.cl';
  const password = process.env.ADMIN_PASSWORD || 'admin123'; // Cambiar en producción!

  // Check if admin already exists
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log('❌ Admin user already exists:', email);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Administrador ETAXI',
      role: 'admin',
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('   Email:', user.email);
  console.log('   Password:', password);
  console.log('');
  console.log('⚠️  IMPORTANT: Change this password in production!');
}

main()
  .catch((e) => {
    console.error('Error creating admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
