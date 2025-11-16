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
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0C1A2B] leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/pedir-taxi`}>
              <Button size="lg" className="w-full sm:w-auto min-w-[180px] bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90">
                {primaryCtaLabel}
              </Button>
            </Link>
            <Link href={`/${locale}/descargar-app`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px] border-[#0C1A2B] text-[#0C1A2B] hover:bg-[#0C1A2B]/5">
                {secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
