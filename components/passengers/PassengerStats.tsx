'use client';

import { useTranslations } from 'next-intl';
import { Users, MapPin, Star, Building } from 'lucide-react';

export function PassengerStats() {
  const t = useTranslations('passengerPage.stats');

  const stats = [
    {
      icon: Users,
      value: t('passengers'),
      label: t('passengersLabel'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      value: t('trips'),
      label: t('tripsLabel'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Star,
      value: t('rating'),
      label: t('ratingLabel'),
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Building,
      value: t('cities'),
      label: t('citiesLabel'),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="w-full py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
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
