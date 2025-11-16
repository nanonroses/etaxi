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
    const rides = await prisma.rideRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'ID',
      'Nombre',
      'Teléfono',
      'Email',
      'Origen',
      'Destino',
      'Cuándo',
      'Notas',
      'Estado',
      'Fecha',
    ];

    const rows = rides.map((ride) => [
      ride.id,
      ride.name,
      ride.phone,
      ride.email || '',
      ride.pickupAddress,
      ride.dropoffAddress || '',
      ride.when,
      ride.notes || '',
      ride.status,
      format(new Date(ride.createdAt), 'yyyy-MM-dd HH:mm:ss'),
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
        'Content-Disposition': `attachment; filename="solicitudes-taxi-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting rides:', error);
    return NextResponse.json(
      { error: 'Error al exportar datos' },
      { status: 500 }
    );
  }
}
