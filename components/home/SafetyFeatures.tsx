'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface SafetyFeaturesProps {
  intro?: string;
}

export function SafetyFeatures({ intro }: SafetyFeaturesProps) {
  const t = useTranslations('safety');
  const locale = useLocale();

  const features = [
    t('features.recording'),
    t('features.panic'),
    t('features.tracking'),
    t('features.verified'),
    t('features.support'),
  ];

  return (
    <section className="w-full py-16 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-4xl px-4 space-y-8">
        <h2 className="text-3xl font-bold text-[#0C1A2B]">
          {t('title')}
        </h2>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-border pb-6 last:border-0">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#F8D347] mt-0.5 flex-shrink-0" />
                <p className="text-base text-muted-foreground leading-relaxed">{feature}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href={`/${locale}/seguridad`}>
            <Button variant="link" className="text-base text-[#0C1A2B]">
              {t('learnMore')} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
