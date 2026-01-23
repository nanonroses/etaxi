'use client';

import { useTranslations } from 'next-intl';
import { Users, TrendingUp, Star, DollarSign } from 'lucide-react';
import { m } from 'framer-motion';

export function DriverStats() {
  const t = useTranslations('driverPage.stats');

  const stats = [
    {
      icon: Users,
      value: t('drivers'),
      label: t('driversLabel'),
      color: 'text-[#dd1828]',
      bgColor: 'bg-[#dd1828]/10',
    },
    {
      icon: TrendingUp,
      value: t('trips'),
      label: t('tripsLabel'),
      color: 'text-[#182b33]',
      bgColor: 'bg-[#182b33]/10',
    },
    {
      icon: Star,
      value: t('rating'),
      label: t('ratingLabel'),
      color: 'text-[#fff500]',
      bgColor: 'bg-[#fff500]/20',
    },
    {
      icon: DollarSign,
      value: t('earnings'),
      label: t('earningsLabel'),
      color: 'text-[#dd1828]',
      bgColor: 'bg-[#dd1828]/10',
    },
  ];

  return (
    <section className="w-full py-12 bg-white border-y border-[#596065]/20">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#182b33] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[#596065]">
                  {stat.label}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
