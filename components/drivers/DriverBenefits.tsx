'use client';

import { useTranslations } from 'next-intl';
import { Shield, DollarSign, TrendingUp, Headphones, Users, Lock } from 'lucide-react';
import { m } from 'framer-motion';

export function DriverBenefits() {
  const t = useTranslations('driverPage.benefits');

  const benefits = [
    {
      icon: Shield,
      title: t('benefit1.title'),
      description: t('benefit1.description'),
      color: 'from-[#dd1828] to-[#182b33]',
    },
    {
      icon: DollarSign,
      title: t('benefit2.title'),
      description: t('benefit2.description'),
      color: 'from-[#182b33] to-[#030c13]',
    },
    {
      icon: TrendingUp,
      title: t('benefit3.title'),
      description: t('benefit3.description'),
      color: 'from-[#fff500] to-[#dd1828]',
    },
    {
      icon: Headphones,
      title: t('benefit4.title'),
      description: t('benefit4.description'),
      color: 'from-[#dd1828] to-[#596065]',
    },
    {
      icon: Users,
      title: t('benefit5.title'),
      description: t('benefit5.description'),
      color: 'from-[#182b33] to-[#596065]',
    },
    {
      icon: Lock,
      title: t('benefit6.title'),
      description: t('benefit6.description'),
      color: 'from-[#dd1828] to-[#182b33]',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#596065]/20 hover:border-[#dd1828] hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-start">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#182b33] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#596065] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
