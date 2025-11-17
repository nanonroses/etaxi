'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  User,
  Phone,
  Car,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Radio,
  Navigation,
  UserCheck,
  Flag,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Assignment {
  id: string;
  status: string;
  assignedBy: string;
  createdAt: string;
  sentToDriverAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  enRouteAt?: string;
  onboardAt?: string;
  completedAt?: string;
  canceledAt?: string;
  cancellationReason?: string;
  canceledBy?: string;
  passengerRequest: {
    id: string;
    passengerName: string;
    passengerPhone: string;
    passengerEmail?: string;
    originAddress: string;
    destinationAddress?: string;
    status: string;
    notes?: string;
  };
  taxi: {
    id: string;
    licensePlate: string;
    type: string;
    city: string;
  };
  driver: {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
  };
  fleetOperator: {
    id: string;
    name: string;
    type: string;
  };
}

const STATE_ACTIONS = [
  { value: 'SENT_TO_DRIVER', label: 'Enviar a Conductor', icon: Radio },
  { value: 'ACCEPTED_BY_DRIVER', label: 'Conductor Aceptó', icon: CheckCircle },
  { value: 'REJECTED_BY_DRIVER', label: 'Conductor Rechazó', icon: XCircle },
  { value: 'COMPLETED', label: 'Viaje Completado', icon: Flag },
  { value: 'CANCELED', label: 'Cancelar', icon: AlertCircle },
];

export default function SeguimientoPage({
  params,
}: {
  params: { assignmentId: string };
}) {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    loadAssignment();
  }, [params.assignmentId]);

  const loadAssignment = async () => {
    try {
      const res = await fetch(`/api/operator/assignments/${params.assignmentId}`);
      if (!res.ok) {
        throw new Error('No se pudo cargar la asignación');
      }
      const data = await res.json();
      setAssignment(data.assignment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = async (newState: string) => {
    setUpdating(true);
    setError(null);

    try {
      const res = await fetch('/api/operator/assignment/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: params.assignmentId,
          newState,
          cancellationReason:
            newState === 'CANCELED' ? cancellationReason : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar estado');
      }

      // Recargar asignación
      await loadAssignment();

      // Si se completó o canceló, volver a solicitudes
      if (newState === 'COMPLETED' || newState === 'CANCELED') {
        setTimeout(() => {
          router.push('/admin/operacion/solicitudes');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">Asignación no encontrada</p>
      </div>
    );
  }

  const currentState = assignment.status;
  const isCompleted =
    currentState === 'COMPLETED' || currentState === 'CANCELED';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Seguimiento de Asignación
        </h1>
        <p className="text-gray-400">ID: {assignment.id}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Estado Actual */}
      <div className="mb-8 p-6 bg-[#182b33] border border-[#dd1828]/20 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Estado Actual</h2>
        <div className="flex items-center gap-4">
          <span
            className={`px-6 py-3 rounded-lg text-lg font-bold ${
              isCompleted
                ? 'bg-gray-500/20 text-gray-400'
                : 'bg-[#dd1828]/20 text-[#dd1828]'
            }`}
          >
            {currentState}
          </span>
          {isCompleted && (
            <p className="text-gray-400">
              {currentState === 'COMPLETED'
                ? 'Viaje finalizado exitosamente'
                : 'Asignación cancelada'}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna 1: Información del viaje */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pasajero */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Pasajero
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Nombre</p>
                <p className="text-white font-medium">
                  {assignment.passengerRequest.passengerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Teléfono</p>
                <p className="text-white">
                  {assignment.passengerRequest.passengerPhone}
                </p>
              </div>
              {assignment.passengerRequest.passengerEmail && (
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white text-sm">
                    {assignment.passengerRequest.passengerEmail}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Taxi */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Taxi Asignado
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Patente</p>
                <p className="text-white font-bold text-lg">
                  {assignment.taxi.licensePlate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Tipo</p>
                <p className="text-white">{assignment.taxi.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Ciudad</p>
                <p className="text-white">{assignment.taxi.city}</p>
              </div>
            </div>
          </div>

          {/* Conductor */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Conductor
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Nombre</p>
                <p className="text-white font-medium">
                  {assignment.driver.fullName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Teléfono</p>
                <p className="text-white">{assignment.driver.phone}</p>
              </div>
              {assignment.driver.email && (
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white text-sm">{assignment.driver.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Gremio */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Gremio/Central</h3>
            <div className="space-y-2">
              <p className="text-white font-medium">{assignment.fleetOperator.name}</p>
              <p className="text-sm text-gray-400">{assignment.fleetOperator.type}</p>
            </div>
          </div>
        </div>

        {/* Columna 2-3: Detalles y acciones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Direcciones */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Recorrido
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Origen</p>
                  <p className="text-white text-lg">
                    {assignment.passengerRequest.originAddress}
                  </p>
                </div>
              </div>
              {assignment.passengerRequest.destinationAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Destino</p>
                    <p className="text-white text-lg">
                      {assignment.passengerRequest.destinationAddress}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {assignment.passengerRequest.notes && (
              <div className="mt-4 p-4 bg-[#030c13] rounded-lg border border-[#dd1828]/10">
                <p className="text-sm text-gray-400 mb-1">Notas del pasajero:</p>
                <p className="text-gray-300">{assignment.passengerRequest.notes}</p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Timeline
            </h3>
            <div className="space-y-4">
              {assignment.createdAt && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Asignación creada</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.createdAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.sentToDriverAt && (
                <div className="flex items-start gap-3">
                  <Radio className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Enviado a conductor</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.sentToDriverAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.acceptedAt && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Conductor aceptó</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.acceptedAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.enRouteAt && (
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">En camino</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.enRouteAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.onboardAt && (
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Pasajero a bordo</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.onboardAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.completedAt && (
                <div className="flex items-start gap-3">
                  <Flag className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Viaje completado</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.completedAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {assignment.canceledAt && (
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Cancelado</p>
                    <p className="text-sm text-gray-400">
                      {format(
                        new Date(assignment.canceledAt),
                        "d 'de' MMMM, HH:mm:ss",
                        { locale: es }
                      )}
                    </p>
                    {assignment.cancellationReason && (
                      <p className="text-sm text-red-300 mt-1">
                        Razón: {assignment.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Acciones de cambio de estado */}
          {!isCompleted && (
            <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Cambiar Estado
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {STATE_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  const isCancelAction = action.value === 'CANCELED';

                  return (
                    <div key={action.value} className="space-y-2">
                      <button
                        onClick={() => {
                          if (isCancelAction && !cancellationReason) {
                            return;
                          }
                          handleStateChange(action.value);
                        }}
                        disabled={updating}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                          isCancelAction
                            ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50'
                            : 'bg-[#dd1828] hover:bg-[#dd1828]/90 text-white'
                        } disabled:bg-gray-600 disabled:cursor-not-allowed`}
                      >
                        <Icon className="w-5 h-5" />
                        {action.label}
                      </button>

                      {isCancelAction && (
                        <input
                          type="text"
                          placeholder="Razón de cancelación..."
                          value={cancellationReason}
                          onChange={(e) => setCancellationReason(e.target.value)}
                          className="w-full px-3 py-2 bg-[#030c13] border border-[#dd1828]/20 rounded text-white text-sm focus:border-[#dd1828] focus:outline-none"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
