'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="w-full border-t border-[hsl(var(--border))] bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
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

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">
              {locale === 'es' ? 'Servicios' : 'Services'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/pedir-taxi`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Pedir Taxi' : 'Request Taxi'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/descargar-app`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Descargar App' : 'Download App'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/seguridad`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Seguridad' : 'Security'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">
              {locale === 'es' ? 'Empresa' : 'Company'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/empresas-gremios`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Empresas & Gremios' : 'Business & Guilds'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/conductores`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Conductores' : 'Drivers'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cumplimiento`}
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  {locale === 'es' ? 'Cumplimiento' : 'Compliance'}
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
                  {locale === 'es' ? 'Ayuda' : 'Help'}
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

        {/* Legal Links */}
        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <Link
              href={`/${locale}/terminos-y-condiciones`}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {t('legal.terms')}
            </Link>
            <Link
              href={`/${locale}/politica-privacidad`}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {t('legal.privacy')}
            </Link>
            <Link
              href={`/${locale}/politica-cookies`}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {t('legal.cookies')}
            </Link>
            <Link
              href={`/${locale}/cumplimiento`}
              className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {t('legal.compliance')}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
