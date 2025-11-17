'use client';

import { useTranslations } from 'next-intl';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';

export function EarningsCalculator() {
  const t = useTranslations('driverPage.earnings');

  const scenarios = [
    {
      type: 'fullTime',
      icon: TrendingUp,
      title: t('fullTime.title'),
      hours: t('fullTime.hours'),
      trips: t('fullTime.trips'),
      earnings: t('fullTime.earnings'),
      description: t('fullTime.description'),
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      type: 'partTime',
      icon: Clock,
      title: t('partTime.title'),
      hours: t('partTime.hours'),
      trips: t('partTime.trips'),
      earnings: t('partTime.earnings'),
      description: t('partTime.description'),
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1000px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div
                key={index}
                className={`${scenario.bgColor} rounded-2xl p-8 border-2 ${scenario.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Header */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${scenario.color} text-white font-semibold text-sm mb-6 shadow-md`}>
                  <Icon className="w-4 h-4" />
                  {scenario.title}
                </div>

                {/* Earnings */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <span className="text-4xl font-bold text-[#0C1A2B]">
                      {scenario.earnings}
                    </span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-muted-foreground">
                      Horas semanales
                    </span>
                    <span className="font-semibold text-[#0C1A2B]">
                      {scenario.hours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Viajes mensuales
                    </span>
                    <span className="font-semibold text-[#0C1A2B]">
                      {scenario.trips}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-sm text-yellow-800">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
