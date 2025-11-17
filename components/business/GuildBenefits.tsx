'use client';

import { useTranslations } from 'next-intl';
import { Layers, Zap, Monitor, MapPin, TrendingUp, Users, DollarSign, Shield } from 'lucide-react';

export function GuildBenefits() {
  const t = useTranslations('businessPage.guild');

  const benefits = [
    {
      title: t('benefit1.title'),
      description: t('benefit1.description'),
      icon: Layers,
      color: 'from-[#182b33] to-[#030c13]',
    },
    {
      title: t('benefit2.title'),
      description: t('benefit2.description'),
      icon: Zap,
      color: 'from-[#fff500] to-[#dd1828]',
    },
    {
      title: t('benefit3.title'),
      description: t('benefit3.description'),
      icon: Monitor,
      color: 'from-[#596065] to-[#182b33]',
    },
    {
      title: t('benefit4.title'),
      description: t('benefit4.description'),
      icon: MapPin,
      color: 'from-[#dd1828] to-[#182b33]',
    },
    {
      title: t('benefit5.title'),
      description: t('benefit5.description'),
      icon: TrendingUp,
      color: 'from-[#182b33] to-[#596065]',
    },
    {
      title: t('benefit6.title'),
      description: t('benefit6.description'),
      icon: Users,
      color: 'from-[#dd1828] to-[#596065]',
    },
    {
      title: t('benefit7.title'),
      description: t('benefit7.description'),
      icon: DollarSign,
      color: 'from-[#fff500] to-[#dd1828]',
    },
    {
      title: t('benefit8.title'),
      description: t('benefit8.description'),
      icon: Shield,
      color: 'from-[#182b33] to-[#030c13]',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#182b33]/10 rounded-full mb-4 border border-[#182b33]/30">
            <p className="text-sm font-semibold text-[#182b33]">
              Para Gremios y Centrales
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto mb-6">
            {t('subtitle')}
          </p>
          {/* Intro text */}
          <div className="max-w-3xl mx-auto bg-[#182b33]/5 border-2 border-[#182b33]/20 rounded-xl p-6">
            <p className="text-[#596065] leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </div>

        {/* Benefits Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-b from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#182b33] hover:-translate-y-1 flex flex-col group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#182b33] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#596065] leading-relaxed flex-1">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
