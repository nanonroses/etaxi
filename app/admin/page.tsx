import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Car, Building2, Users, TrendingUp, Radio, CheckCircle, Clock, Activity } from 'lucide-react';

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    // Captación de datos (RideRequest, CompanyLead, DriverLead)
    totalRides,
    ridesThisMonth,
    ridesToday,
    totalCompanies,
    companiesThisMonth,
    companiesToday,
    totalDrivers,
    driversThisMonth,
    driversToday,
    // Operación (PassengerRequest, Assignment)
    pendingAssignments,
    activeAssignments,
    completedAssignmentsToday,
    completedAssignmentsMonth,
    // Flota
    availableTaxis,
    totalFleetOperators,
    totalOperationalDrivers,
  ] = await Promise.all([
    // Captación
    prisma.rideRequest.count(),
    prisma.rideRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.rideRequest.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.companyLead.count(),
    prisma.companyLead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.companyLead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.driverLead.count(),
    prisma.driverLead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.driverLead.count({ where: { createdAt: { gte: startOfToday } } }),
    // Operación
    prisma.passengerRequest.count({ where: { status: 'PENDING_ASSIGNMENT' } }),
    prisma.assignment.count({
      where: {
        status: { in: ['CREATED', 'SENT_TO_DRIVER', 'ACCEPTED_BY_DRIVER'] },
      },
    }),
    prisma.assignment.count({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startOfToday },
      },
    }),
    prisma.assignment.count({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startOfMonth },
      },
    }),
    // Flota
    prisma.taxi.count({ where: { operationalStatus: 'AVAILABLE' } }),
    prisma.fleetOperator.count({ where: { isActive: true } }),
    prisma.driver.count({ where: { isEnabled: true } }),
  ]);

  return {
    rides: { total: totalRides, month: ridesThisMonth, today: ridesToday },
    companies: { total: totalCompanies, month: companiesThisMonth, today: companiesToday },
    drivers: { total: totalDrivers, month: driversThisMonth, today: driversToday },
    operational: {
      pending: pendingAssignments,
      active: activeAssignments,
      completedToday: completedAssignmentsToday,
      completedMonth: completedAssignmentsMonth,
    },
    fleet: {
      availableTaxis,
      operators: totalFleetOperators,
      drivers: totalOperationalDrivers,
    },
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard ETAXI</h1>
        <p className="text-gray-400">Resumen operacional y captación de datos</p>
      </div>

      {/* Métricas Operacionales MVP */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Radio className="w-6 h-6 text-[#dd1828]" />
          Operación MVP - Asignación Manual
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/operacion/solicitudes"
            className="bg-[#182b33] rounded-xl p-6 border-2 border-[#dd1828] hover:border-[#dd1828]/70 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#dd1828]/20">
                <Clock className="w-6 h-6 text-[#dd1828]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Pendientes
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.operational.pending}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Solicitudes sin asignar
            </p>
          </Link>

          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">En Curso</h3>
            <p className="text-4xl font-bold text-white">
              {stats.operational.active}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Asignaciones activas
            </p>
          </div>

          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Completados Hoy
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.operational.completedToday}
            </p>
            <p className="text-sm text-gray-400 mt-2">Viajes finalizados</p>
          </div>

          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Este Mes
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.operational.completedMonth}
            </p>
            <p className="text-sm text-gray-400 mt-2">Viajes completados</p>
          </div>
        </div>
      </div>

      {/* Estado de Flota */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Estado de Flota</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#dd1828]/20">
                <Car className="w-6 h-6 text-[#dd1828]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Taxis Disponibles
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.fleet.availableTaxis}
            </p>
          </div>

          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Gremios/Centrales
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.fleet.operators}
            </p>
          </div>

          <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Conductores Activos
            </h3>
            <p className="text-4xl font-bold text-white">
              {stats.fleet.drivers}
            </p>
          </div>
        </div>
      </div>

      {/* Captación de Datos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Captación de Datos (Leads)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/ride-requests"
            className="block bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20 hover:border-[#dd1828]/50 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#dd1828]/20">
                <Car className="w-6 h-6 text-[#dd1828]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Solicitudes Web
            </h3>
            <p className="text-4xl font-bold text-white mb-4">
              {stats.rides.total}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-500">Este mes: </span>
                <span className="text-white font-semibold">{stats.rides.month}</span>
              </div>
              <div>
                <span className="text-gray-500">Hoy: </span>
                <span className="text-white font-semibold">{stats.rides.today}</span>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/companies"
            className="block bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20 hover:border-[#dd1828]/50 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Empresas B2B
            </h3>
            <p className="text-4xl font-bold text-white mb-4">
              {stats.companies.total}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-500">Este mes: </span>
                <span className="text-white font-semibold">{stats.companies.month}</span>
              </div>
              <div>
                <span className="text-gray-500">Hoy: </span>
                <span className="text-white font-semibold">{stats.companies.today}</span>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/drivers"
            className="block bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20 hover:border-[#dd1828]/50 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-1">
              Postulantes B2D
            </h3>
            <p className="text-4xl font-bold text-white mb-4">
              {stats.drivers.total}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-500">Este mes: </span>
                <span className="text-white font-semibold">{stats.drivers.month}</span>
              </div>
              <div>
                <span className="text-gray-500">Hoy: </span>
                <span className="text-white font-semibold">{stats.drivers.today}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/operacion/solicitudes"
            className="p-4 rounded-lg bg-[#dd1828]/20 hover:bg-[#dd1828]/30 border border-[#dd1828]/50 hover:border-[#dd1828] transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <Radio className="w-5 h-5 text-[#dd1828]" />
              <p className="text-white font-bold">Asignar Taxis Manualmente</p>
            </div>
            <p className="text-sm text-gray-300">
              Panel operacional para asignar taxis a solicitudes pendientes
            </p>
          </Link>

          <Link
            href="/admin/ride-requests"
            className="p-4 rounded-lg bg-[#030c13] hover:bg-[#dd1828]/10 border border-gray-700 hover:border-[#dd1828]/50 transition-colors"
          >
            <p className="text-white font-medium">Ver Solicitudes Web</p>
            <p className="text-sm text-gray-400 mt-1">
              Gestionar solicitudes de taxi desde el sitio web
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
