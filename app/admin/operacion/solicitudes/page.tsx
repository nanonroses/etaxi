import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Clock, MapPin, User, Phone, Radio } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

async function getPendingRequests() {
  const requests = await prisma.passengerRequest.findMany({
    where: {
      status: 'PENDING_ASSIGNMENT',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  });

  return requests;
}

export default async function OperacionSolicitudesPage() {
  const requests = await getPendingRequests();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Asignación Manual de Taxis
        </h1>
        <p className="text-gray-400">
          Solicitudes pendientes de asignación - MVP Operacional
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Pendientes</p>
              <p className="text-3xl font-bold text-white">{requests.length}</p>
            </div>
            <Clock className="w-12 h-12 text-[#dd1828]" />
          </div>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#dd1828]/20">
          <h2 className="text-xl font-semibold text-white">
            Solicitudes Pendientes de Asignación
          </h2>
        </div>

        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No hay solicitudes pendientes de asignación
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Las nuevas solicitudes aparecerán aquí automáticamente
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#dd1828]/10">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-6 hover:bg-[#dd1828]/5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Información del pasajero */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-medium">
                          {request.passengerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          {request.passengerPhone}
                        </span>
                      </div>
                      {request.passengerEmail && (
                        <span className="text-gray-400 text-sm">
                          {request.passengerEmail}
                        </span>
                      )}
                    </div>

                    {/* Direcciones */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400">Origen</p>
                          <p className="text-white">{request.originAddress}</p>
                        </div>
                      </div>
                      {request.destinationAddress && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-400">Destino</p>
                            <p className="text-white">
                              {request.destinationAddress}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>
                        Creada:{' '}
                        {format(
                          new Date(request.createdAt),
                          "d 'de' MMMM, HH:mm",
                          { locale: es }
                        )}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {request.channel}
                      </span>
                      {request.scheduledFor && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
                          Programado:{' '}
                          {format(
                            new Date(request.scheduledFor),
                            "d/MM 'a las' HH:mm"
                          )}
                        </span>
                      )}
                    </div>

                    {request.notes && (
                      <div className="mt-3 p-3 bg-[#030c13] rounded border border-[#dd1828]/10">
                        <p className="text-xs text-gray-400 mb-1">Notas:</p>
                        <p className="text-gray-300 text-sm">{request.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Botón de asignación */}
                  <div className="ml-6">
                    <Link
                      href={`/admin/operacion/asignar/${request.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#dd1828] hover:bg-[#dd1828]/90 text-white font-semibold rounded-lg transition-colors"
                    >
                      <Radio className="w-5 h-5" />
                      Asignar Taxi
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
