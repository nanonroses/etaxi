'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, User, Phone, Clock, Car, UserCheck, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface PassengerRequest {
  id: string;
  passengerName: string;
  passengerPhone: string;
  passengerEmail?: string;
  originAddress: string;
  destinationAddress?: string;
  scheduledFor?: string;
  channel: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface FleetOperator {
  id: string;
  name: string;
  type: string;
  city: string;
}

interface Taxi {
  id: string;
  licensePlate: string;
  type: string;
  city: string;
  operationalStatus: string;
  fleetOperator: FleetOperator;
}

interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  isEnabled: boolean;
  fleetOperator: FleetOperator;
}

export default function AsignarTaxiPage({
  params,
}: {
  params: { requestId: string };
}) {
  const router = useRouter();
  const [request, setRequest] = useState<PassengerRequest | null>(null);
  const [operators, setOperators] = useState<FleetOperator[]>([]);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [selectedOperatorId, setSelectedOperatorId] = useState<string>('');
  const [selectedTaxiId, setSelectedTaxiId] = useState<string>('');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar solicitud de pasajero
  useEffect(() => {
    const loadRequest = async () => {
      try {
        const res = await fetch(`/api/operator/requests/${params.requestId}`);
        if (!res.ok) {
          throw new Error('No se pudo cargar la solicitud');
        }
        const data = await res.json();
        setRequest(data.request);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [params.requestId]);

  // Cargar operadores de flota
  useEffect(() => {
    const loadOperators = async () => {
      try {
        const res = await fetch('/api/operator/fleet-operators');
        if (res.ok) {
          const data = await res.json();
          setOperators(data.operators || []);
        }
      } catch (err) {
        console.error('Error loading operators:', err);
      }
    };

    loadOperators();
  }, []);

  // Cargar taxis cuando se selecciona operador
  useEffect(() => {
    if (!selectedOperatorId) {
      setTaxis([]);
      return;
    }

    const loadTaxis = async () => {
      try {
        const res = await fetch(
          `/api/operator/taxis?operatorId=${selectedOperatorId}&status=AVAILABLE`
        );
        if (res.ok) {
          const data = await res.json();
          setTaxis(data.taxis || []);
        }
      } catch (err) {
        console.error('Error loading taxis:', err);
      }
    };

    loadTaxis();
  }, [selectedOperatorId]);

  // Cargar conductores cuando se selecciona operador
  useEffect(() => {
    if (!selectedOperatorId) {
      setDrivers([]);
      return;
    }

    const loadDrivers = async () => {
      try {
        const res = await fetch(
          `/api/operator/drivers?operatorId=${selectedOperatorId}&enabled=true`
        );
        if (res.ok) {
          const data = await res.json();
          setDrivers(data.drivers || []);
        }
      } catch (err) {
        console.error('Error loading drivers:', err);
      }
    };

    loadDrivers();
  }, [selectedOperatorId]);

  const handleAssign = async () => {
    if (!selectedTaxiId || !selectedDriverId) {
      setError('Debe seleccionar un taxi y un conductor');
      return;
    }

    setAssigning(true);
    setError(null);

    try {
      const res = await fetch('/api/operator/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: params.requestId,
          taxiId: selectedTaxiId,
          driverId: selectedDriverId,
          operatorId: selectedOperatorId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear asignación');
      }

      // Redirigir a seguimiento
      router.push(`/admin/operacion/seguimiento/${data.assignment.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-400">Solicitud no encontrada</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Asignar Taxi a Solicitud
        </h1>
        <p className="text-gray-400">
          Seleccione el gremio, taxi y conductor para esta solicitud
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna 1: Datos del pasajero */}
        <div className="lg:col-span-1">
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Datos del Pasajero
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Nombre</p>
                <p className="text-white font-medium">{request.passengerName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Teléfono</p>
                <p className="text-white">{request.passengerPhone}</p>
              </div>

              {request.passengerEmail && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <p className="text-white text-sm">{request.passengerEmail}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Origen
                </p>
                <p className="text-white">{request.originAddress}</p>
              </div>

              {request.destinationAddress && (
                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Destino
                  </p>
                  <p className="text-white">{request.destinationAddress}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-400 mb-1">Creada</p>
                <p className="text-white">
                  {format(
                    new Date(request.createdAt),
                    "d 'de' MMMM, HH:mm",
                    { locale: es }
                  )}
                </p>
              </div>

              {request.notes && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Notas</p>
                  <p className="text-gray-300 text-sm">{request.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna 2-3: Selección de taxi y conductor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Paso 1: Seleccionar Operador */}
          <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Paso 1: Seleccionar Gremio/Central
            </h3>
            <select
              value={selectedOperatorId}
              onChange={(e) => {
                setSelectedOperatorId(e.target.value);
                setSelectedTaxiId('');
                setSelectedDriverId('');
              }}
              className="w-full px-4 py-3 bg-[#030c13] border border-[#dd1828]/20 rounded-lg text-white focus:border-[#dd1828] focus:outline-none"
            >
              <option value="">Seleccione un operador...</option>
              {operators.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name} - {op.city} ({op.type})
                </option>
              ))}
            </select>
          </div>

          {/* Paso 2: Seleccionar Taxi */}
          {selectedOperatorId && (
            <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Paso 2: Seleccionar Taxi Disponible
              </h3>

              {taxis.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No hay taxis disponibles para este operador
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {taxis.map((taxi) => (
                    <div
                      key={taxi.id}
                      onClick={() => setSelectedTaxiId(taxi.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTaxiId === taxi.id
                          ? 'border-[#dd1828] bg-[#dd1828]/10'
                          : 'border-[#dd1828]/20 hover:border-[#dd1828]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">
                            {taxi.licensePlate}
                          </p>
                          <p className="text-sm text-gray-400">
                            {taxi.type} - {taxi.city}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          {taxi.operationalStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Paso 3: Seleccionar Conductor */}
          {selectedTaxiId && (
            <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Paso 3: Seleccionar Conductor
              </h3>

              {drivers.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No hay conductores habilitados para este operador
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {drivers.map((driver) => (
                    <div
                      key={driver.id}
                      onClick={() => setSelectedDriverId(driver.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDriverId === driver.id
                          ? 'border-[#dd1828] bg-[#dd1828]/10'
                          : 'border-[#dd1828]/20 hover:border-[#dd1828]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">
                            {driver.fullName}
                          </p>
                          <p className="text-sm text-gray-400">{driver.phone}</p>
                          {driver.email && (
                            <p className="text-xs text-gray-500">
                              {driver.email}
                            </p>
                          )}
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          Habilitado
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Botón de confirmación */}
          {selectedTaxiId && selectedDriverId && (
            <div className="bg-[#182b33] border border-[#dd1828]/20 rounded-lg p-6">
              <button
                onClick={handleAssign}
                disabled={assigning}
                className="w-full px-6 py-4 bg-[#dd1828] hover:bg-[#dd1828]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg"
              >
                {assigning ? 'Creando asignación...' : 'Confirmar Asignación'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
