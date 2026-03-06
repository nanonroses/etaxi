'use client';

import { useTranslations } from 'next-intl';
import { FileCheck, DollarSign, MapPin, Shield } from 'lucide-react';
import { m } from 'framer-motion';

export function WhyItWorks() {
  const t = useTranslations('howItWorksPage.benefits');

  const benefits = [
    {
      icon: FileCheck,
      title: t('benefit1.title'),
      description: t('benefit1.description'),
      color: 'from-[#182b33] to-[#030c13]',
      bgColor: 'bg-white',
    },
    {
      icon: DollarSign,
      title: t('benefit2.title'),
      description: t('benefit2.description'),
      color: 'from-[#dd1828] to-[#182b33]',
      bgColor: 'bg-gradient-to-b from-white to-gray-50',
    },
    {
      icon: MapPin,
      title: t('benefit3.title'),
      description: t('benefit3.description'),
      color: 'from-[#596065] to-[#182b33]',
      bgColor: 'bg-white',
    },
    {
      icon: Shield,
      title: t('benefit4.title'),
      description: t('benefit4.description'),
      color: 'from-[#dd1828] to-[#fff500]',
      bgColor: 'bg-gradient-to-b from-white to-gray-50',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`${benefit.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#596065]/20 hover:border-[#dd1828] hover:-translate-y-2 text-center group`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#182b33] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#596065] leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
