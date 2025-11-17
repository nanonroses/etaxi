'use client';

import { useTranslations } from 'next-intl';
import { Clock, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

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
      color: 'from-[#dd1828] to-[#182b33]',
      bgColor: 'bg-[#dd1828]/5',
      borderColor: 'border-[#dd1828]/20',
    },
    {
      type: 'partTime',
      icon: Clock,
      title: t('partTime.title'),
      hours: t('partTime.hours'),
      trips: t('partTime.trips'),
      earnings: t('partTime.earnings'),
      description: t('partTime.description'),
      color: 'from-[#182b33] to-[#030c13]',
      bgColor: 'bg-[#182b33]/5',
      borderColor: 'border-[#182b33]/20',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1000px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`${scenario.bgColor} rounded-2xl p-8 border-2 ${scenario.borderColor} shadow-lg hover:shadow-xl hover:border-[#dd1828] hover:-translate-y-1 transition-all duration-300 group`}
              >
                {/* Header */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${scenario.color} text-white font-semibold text-sm mb-6 shadow-md`}>
                  <Icon className="w-4 h-4" />
                  {scenario.title}
                </div>

                {/* Earnings */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <DollarSign className="w-8 h-8 text-[#dd1828]" />
                    <span className="text-4xl font-bold text-[#182b33]">
                      {scenario.earnings}
                    </span>
                    <span className="text-[#596065]">/mes</span>
                  </div>
                  <p className="text-sm text-[#596065]">
                    {scenario.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[#596065]/20">
                    <span className="text-sm font-medium text-[#596065]">
                      Horas semanales
                    </span>
                    <span className="font-semibold text-[#182b33]">
                      {scenario.hours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-[#596065]">
                      Viajes mensuales
                    </span>
                    <span className="font-semibold text-[#182b33]">
                      {scenario.trips}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#fff500]/10 border-l-4 border-[#fff500] p-4 rounded-r-lg"
        >
          <p className="text-sm text-[#182b33]">
            {t('note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
