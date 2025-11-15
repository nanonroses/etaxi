'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  // Use CMS data if available, otherwise fallback to translations
  const heroTitle = title || t('title');
  const heroSubtitle = subtitle || t('subtitle');
  const primaryCtaLabel = primaryCta || t('ctaPrimary');
  const secondaryCtaLabel = secondaryCta || t('ctaSecondary');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[hsl(var(--foreground))]">
              {heroTitle}
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] md:text-2xl max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/pedir-taxi`}>
              <Button size="lg" className="w-full sm:w-auto">
                {primaryCtaLabel}
              </Button>
            </Link>
            <Link href={`/${locale}/descargar-app`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
