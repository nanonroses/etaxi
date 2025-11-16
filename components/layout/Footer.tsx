'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="w-full border-t border-[hsl(var(--border))] bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[hsl(var(--primary))]">
              ETAXI
            </h3>
            <p className="mt-3 text-base text-[hsl(var(--muted-foreground))]">
              {locale === 'es'
                ? 'Taxis regulados en Chile'
                : 'Regulated taxis in Chile'}
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">
              {locale === 'es' ? 'Legal' : 'Legal'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/terminos`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacidad`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cumplimiento`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {t('legal.compliance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">
              {locale === 'es' ? 'Soporte' : 'Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/ayuda`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {t('support.help')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/reclamos`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {t('support.claims')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contacto`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Contacto' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8 text-center">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
