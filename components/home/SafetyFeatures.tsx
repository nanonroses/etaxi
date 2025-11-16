'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    <section className="w-full py-16 md:py-24 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {t('title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
                    <span className="text-base text-[hsl(var(--foreground))] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <Link href={`/${locale}/seguridad`}>
                  <Button variant="link" className="text-base">
                    {t('learnMore')} →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
