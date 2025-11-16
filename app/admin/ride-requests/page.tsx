import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Download, Search } from 'lucide-react';

interface SearchParams {
  search?: string;
  status?: string;
}

async function getRideRequests(searchParams: SearchParams) {
  const where: any = {};

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { phone: { contains: searchParams.search } },
      { pickupAddress: { contains: searchParams.search, mode: 'insensitive' } },
    ];
  }

  if (searchParams.status && searchParams.status !== 'all') {
    where.status = searchParams.status;
  }

  const rides = await prisma.rideRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return rides;
}

export default async function RideRequestsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const rides = await getRideRequests(searchParams);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Solicitudes de Taxi</h1>
          <p className="text-gray-400">
            {rides.length} solicitudes encontradas
          </p>
        </div>

        <Link
          href="/admin/ride-requests/export"
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
                placeholder="Buscar por nombre, teléfono o dirección..."
                defaultValue={searchParams.search}
                className="w-full pl-10 pr-4 py-2 bg-[#030c13] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dd1828]/50"
              />
            </div>
          </div>

          <select
            name="status"
            defaultValue={searchParams.status || 'all'}
            className="px-4 py-2 bg-[#030c13] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#dd1828]/50"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="contacted">Contactado</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
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
                  Origen
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Destino
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Cuándo
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
              {rides.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    No se encontraron solicitudes
                  </td>
                </tr>
              ) : (
                rides.map((ride) => (
                  <tr
                    key={ride.id}
                    className="border-b border-gray-700 hover:bg-[#030c13]/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-white">
                      <div>
                        <p className="font-medium">{ride.name}</p>
                        {ride.email && (
                          <p className="text-xs text-gray-400">{ride.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{ride.phone}</td>
                    <td className="px-6 py-4 text-gray-300">
                      <p className="max-w-xs truncate">{ride.pickupAddress}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <p className="max-w-xs truncate">
                        {ride.dropoffAddress || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{ride.when}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {format(new Date(ride.createdAt), "d 'de' MMM, yyyy", {
                        locale: es,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ride.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : ride.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400'
                            : ride.status === 'cancelled'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {ride.status === 'pending'
                          ? 'Pendiente'
                          : ride.status === 'contacted'
                          ? 'Contactado'
                          : ride.status === 'completed'
                          ? 'Completado'
                          : 'Cancelado'}
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
