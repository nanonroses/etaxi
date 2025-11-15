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
    <section className="w-full py-12 md:py-24 bg-[hsl(var(--muted))]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-4">
                {t('title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
                    <span className="text-[hsl(var(--foreground))]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-center">
                <Link href={`/${locale}/seguridad`}>
                  <Button variant="link">
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
