import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Car, Building2, Users, TrendingUp } from 'lucide-react';

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalRides,
    ridesThisMonth,
    ridesToday,
    totalCompanies,
    companiesThisMonth,
    companiesToday,
    totalDrivers,
    driversThisMonth,
    driversToday,
  ] = await Promise.all([
    prisma.rideRequest.count(),
    prisma.rideRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.rideRequest.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.companyLead.count(),
    prisma.companyLead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.companyLead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.driverLead.count(),
    prisma.driverLead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.driverLead.count({ where: { createdAt: { gte: startOfToday } } }),
  ]);

  return {
    rides: { total: totalRides, month: ridesThisMonth, today: ridesToday },
    companies: { total: totalCompanies, month: companiesThisMonth, today: companiesToday },
    drivers: { total: totalDrivers, month: driversThisMonth, today: driversToday },
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: 'Solicitudes de Taxi',
      icon: Car,
      total: stats.rides.total,
      month: stats.rides.month,
      today: stats.rides.today,
      href: '/admin/ride-requests',
      color: '#dd1828',
    },
    {
      title: 'Empresas & Gremios',
      icon: Building2,
      total: stats.companies.total,
      month: stats.companies.month,
      today: stats.companies.today,
      href: '/admin/companies',
      color: '#0ea5e9',
    },
    {
      title: 'Conductores',
      icon: Users,
      total: stats.drivers.total,
      month: stats.drivers.month,
      today: stats.drivers.today,
      href: '/admin/drivers',
      color: '#10b981',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Resumen de actividad ETAXI</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="block bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20 hover:border-[#dd1828]/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-300 mb-1">
                {card.title}
              </h3>

              <p className="text-4xl font-bold text-white mb-4">
                {card.total}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Este mes: </span>
                  <span className="text-white font-semibold">{card.month}</span>
                </div>
                <div>
                  <span className="text-gray-500">Hoy: </span>
                  <span className="text-white font-semibold">{card.today}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#182b33] rounded-xl p-6 border border-[#dd1828]/20">
        <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/ride-requests"
            className="p-4 rounded-lg bg-[#030c13] hover:bg-[#dd1828]/10 border border-gray-700 hover:border-[#dd1828]/50 transition-colors"
          >
            <p className="text-white font-medium">Ver Solicitudes Pendientes</p>
            <p className="text-sm text-gray-400 mt-1">
              Gestionar solicitudes de taxi
            </p>
          </Link>

          <Link
            href="/admin/companies"
            className="p-4 rounded-lg bg-[#030c13] hover:bg-[#dd1828]/10 border border-gray-700 hover:border-[#dd1828]/50 transition-colors"
          >
            <p className="text-white font-medium">Revisar Leads B2B</p>
            <p className="text-sm text-gray-400 mt-1">
              Contactos de empresas y gremios
            </p>
          </Link>

          <Link
            href="/admin/drivers"
            className="p-4 rounded-lg bg-[#030c13] hover:bg-[#dd1828]/10 border border-gray-700 hover:border-[#dd1828]/50 transition-colors"
          >
            <p className="text-white font-medium">Validar Conductores</p>
            <p className="text-sm text-gray-400 mt-1">
              Postulaciones de conductores
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
