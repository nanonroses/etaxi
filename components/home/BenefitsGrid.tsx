'use client';

import { useTranslations } from 'next-intl';
import { Shield, DollarSign, FileCheck, Car } from 'lucide-react';
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
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#182b33]">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-[#F5F5F5] rounded-xl p-6 shadow-sm space-y-4 transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-lg bg-[#dd1828]/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#dd1828]" />
                </div>
                <h3 className="text-xl font-semibold text-[#182b33]">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
