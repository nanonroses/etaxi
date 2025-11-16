import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const drivers = await prisma.driverLead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'ID',
      'Nombre',
      'Teléfono',
      'Email',
      'Ciudad',
      'Tiene Taxi',
      'Notas',
      'Estado',
      'Fecha',
    ];

    const rows = drivers.map((driver) => [
      driver.id,
      driver.fullName,
      driver.phone,
      driver.email || '',
      driver.city || '',
      driver.hasTaxi ? 'Sí' : 'No',
      driver.notes || '',
      driver.status,
      format(new Date(driver.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="conductores-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting drivers:', error);
    return NextResponse.json(
      { error: 'Error al exportar datos' },
      { status: 500 }
    );
  }
}
