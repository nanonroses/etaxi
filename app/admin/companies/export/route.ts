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
    const companies = await prisma.companyLead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV
    const headers = [
      'ID',
      'Empresa',
      'Contacto',
      'Email',
      'Teléfono',
      'Empleados',
      'Ciudad',
      'Mensaje',
      'Estado',
      'Fecha',
    ];

    const rows = companies.map((company) => [
      company.id,
      company.companyName,
      company.contactName,
      company.email,
      company.phone || '',
      company.employees || '',
      company.city || '',
      company.message || '',
      company.status,
      format(new Date(company.createdAt), 'yyyy-MM-dd HH:mm:ss'),
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
        'Content-Disposition': `attachment; filename="empresas-gremios-${format(new Date(), 'yyyy-MM-dd')}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting companies:', error);
    return NextResponse.json(
      { error: 'Error al exportar datos' },
      { status: 500 }
    );
  }
}
