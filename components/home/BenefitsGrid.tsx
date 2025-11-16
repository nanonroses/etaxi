'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-[hsl(var(--foreground))] tracking-tight">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-[hsl(var(--border))] hover:shadow-md transition-shadow">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[hsl(var(--primary))]" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
