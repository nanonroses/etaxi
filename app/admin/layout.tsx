import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Car, Building2, Users } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#030c13]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#182b33] border-r border-[#dd1828]/20">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-1">ETAXI</h1>
          <p className="text-sm text-gray-400">Panel de Control</p>
        </div>

        <nav className="px-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 mb-1 rounded-lg text-gray-300 hover:bg-[#dd1828]/10 hover:text-[#dd1828] transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/ride-requests"
            className="flex items-center gap-3 px-3 py-2 mb-1 rounded-lg text-gray-300 hover:bg-[#dd1828]/10 hover:text-[#dd1828] transition-colors"
          >
            <Car className="w-5 h-5" />
            <span>Solicitudes de Taxi</span>
          </Link>

          <Link
            href="/admin/companies"
            className="flex items-center gap-3 px-3 py-2 mb-1 rounded-lg text-gray-300 hover:bg-[#dd1828]/10 hover:text-[#dd1828] transition-colors"
          >
            <Building2 className="w-5 h-5" />
            <span>Empresas & Gremios</span>
          </Link>

          <Link
            href="/admin/drivers"
            className="flex items-center gap-3 px-3 py-2 mb-1 rounded-lg text-gray-300 hover:bg-[#dd1828]/10 hover:text-[#dd1828] transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Conductores</span>
          </Link>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#dd1828]/20">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="text-white font-medium">{session.user?.name}</p>
              <p className="text-gray-400 text-xs">{session.user?.email}</p>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="p-2 rounded-lg text-gray-400 hover:bg-[#dd1828]/10 hover:text-[#dd1828] transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
