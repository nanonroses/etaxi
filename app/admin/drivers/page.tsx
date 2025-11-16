import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Download, Search, Check, X } from 'lucide-react';

interface SearchParams {
  search?: string;
  status?: string;
  hasTaxi?: string;
}

async function getDriverLeads(searchParams: SearchParams) {
  const where: any = {};

  if (searchParams.search) {
    where.OR = [
      { fullName: { contains: searchParams.search, mode: 'insensitive' } },
      { email: { contains: searchParams.search, mode: 'insensitive' } },
      { phone: { contains: searchParams.search } },
    ];
  }

  if (searchParams.status && searchParams.status !== 'all') {
    where.status = searchParams.status;
  }

  if (searchParams.hasTaxi === 'yes') {
    where.hasTaxi = true;
  } else if (searchParams.hasTaxi === 'no') {
    where.hasTaxi = false;
  }

  const drivers = await prisma.driverLead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return drivers;
}

export default async function DriversPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const drivers = await getDriverLeads(searchParams);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Conductores</h1>
          <p className="text-gray-400">
            {drivers.length} postulaciones encontradas
          </p>
        </div>

        <Link
          href="/admin/drivers/export"
          className="flex items-center gap-2 px-4 py-2 bg-[#dd1828] hover:bg-[#dd1828]/90 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[#182b33] rounded-xl p-6 mb-6 border border-[#dd1828]/20">
        <form className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Buscar por nombre, email o teléfono..."
                defaultValue={searchParams.search}
                className="w-full pl-10 pr-4 py-2 bg-[#030c13] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd1828]/50"
              />
            </div>
          </div>

          <select
            name="hasTaxi"
            defaultValue={searchParams.hasTaxi || 'all'}
            className="px-4 py-2 bg-[#030c13] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dd1828]/50"
          >
            <option value="all">Tiene taxi?</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>

          <select
            name="status"
            defaultValue={searchParams.status || 'all'}
            className="px-4 py-2 bg-[#030c13] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dd1828]/50"
          >
            <option value="all">Todos los estados</option>
            <option value="new">Nuevo</option>
            <option value="contacted">Contactado</option>
            <option value="qualified">Calificado</option>
            <option value="registered">Registrado</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-[#dd1828] hover:bg-[#dd1828]/90 text-white rounded-lg transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-[#182b33] rounded-xl border border-[#dd1828]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#030c13] border-b border-[#dd1828]/20">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Teléfono
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Ciudad
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  ¿Tiene Taxi?
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No se encontraron conductores
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => (
                  <tr
                    key={driver.id}
                    className="border-b border-gray-700 hover:bg-[#030c13]/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {driver.fullName}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{driver.phone}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {driver.email || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {driver.city || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {driver.hasTaxi ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {format(new Date(driver.createdAt), "d 'de' MMM, yyyy", {
                        locale: es,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          driver.status === 'registered'
                            ? 'bg-green-500/10 text-green-400'
                            : driver.status === 'qualified'
                            ? 'bg-blue-500/10 text-blue-400'
                            : driver.status === 'contacted'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-gray-500/10 text-gray-400'
                        }`}
                      >
                        {driver.status === 'new'
                          ? 'Nuevo'
                          : driver.status === 'contacted'
                          ? 'Contactado'
                          : driver.status === 'qualified'
                          ? 'Calificado'
                          : 'Registrado'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
