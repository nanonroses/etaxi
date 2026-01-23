'use client';

import { useTranslations } from 'next-intl';
import { Shield, DollarSign, FileCheck, Car } from 'lucide-react';
import { m } from 'framer-motion';
import type { Benefit } from '@/lib/sanity.queries';

interface BenefitsGridProps {
  benefits?: Benefit[];
}

// Map icon names to components
const iconMap: Record<string, any> = {
  Shield,
  DollarSign,
  FileCheck,
  Car,
};

export function BenefitsGrid({ benefits: cmsBenefits }: BenefitsGridProps) {
  const t = useTranslations('benefits');

  // Fallback benefits using translations
  const defaultBenefits = [
    {
      icon: Shield,
      title: t('security.title'),
      description: t('security.description'),
    },
    {
      icon: DollarSign,
      title: t('transparency.title'),
      description: t('transparency.description'),
    },
    {
      icon: FileCheck,
      title: t('compliance.title'),
      description: t('compliance.description'),
    },
    {
      icon: Car,
      title: t('regulated.title'),
      description: t('regulated.description'),
    },
  ];

  // Use CMS benefits if available, otherwise use defaults
  const benefits = cmsBenefits && cmsBenefits.length > 0
    ? cmsBenefits.map(b => ({
      icon: b.icon ? iconMap[b.icon] || Shield : Shield,
      title: b.title,
      description: b.description,
    }))
    : defaultBenefits;

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-[1200px] px-4">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Viaja con la tranquilidad de un taxi 100% regulado
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#dd1828]/30 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#dd1828]/0 to-[#dd1828]/0 group-hover:from-[#dd1828]/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />

                  <div className="relative z-10 space-y-6">
                    {/* Icon */}
                    <m.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center shadow-lg group-hover:shadow-[#dd1828]/50"
                    >
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </m.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#182b33] group-hover:text-[#dd1828] transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#dd1828]/5 rounded-full blur-2xl group-hover:bg-[#dd1828]/10 transition-all" />
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 h-1 w-32 mx-auto bg-gradient-to-r from-[#dd1828] via-[#fff500] to-[#dd1828] rounded-full"
        />
      </div>
    </section>
  );
}
