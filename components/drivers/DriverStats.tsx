'use client';

import { useTranslations } from 'next-intl';
import { Users, TrendingUp, Star, DollarSign } from 'lucide-react';

export function DriverStats() {
  const t = useTranslations('driverPage.stats');

  const stats = [
    {
      icon: Users,
      value: t('drivers'),
      label: t('driversLabel'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: TrendingUp,
      value: t('trips'),
      label: t('tripsLabel'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Star,
      value: t('rating'),
      label: t('ratingLabel'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: DollarSign,
      value: t('earnings'),
      label: t('earningsLabel'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="w-full py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
