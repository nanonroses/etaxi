'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, DollarSign, FileCheck, Car } from 'lucide-react';

export function BenefitsGrid() {
  const t = useTranslations('benefits');

  const benefits = [
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

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--foreground))]">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-[hsl(var(--border))]">
                <CardHeader>
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-[hsl(var(--primary))]" />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-[hsl(var(--muted-foreground))]">
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
