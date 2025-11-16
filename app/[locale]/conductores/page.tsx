import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Check, Users, FileCheck, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import { getDriverPage } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.conductores.title,
  description: seoConfig.conductores.description,
  keywords: seoConfig.conductores.keywords,
  openGraph: {
    title: seoConfig.conductores.title,
    description: seoConfig.conductores.description,
    url: 'https://www.etaxi.cl/conductores',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.conductores.title,
    description: seoConfig.conductores.description,
  },
};

export default async function ConductoresPage() {
  // Fetch from Sanity CMS
  const cmsData = await getDriverPage();
  const t = useTranslations('driverPage');

  // Use CMS data with fallbacks to translations
  const heroTitle = cmsData?.heroTitle || t('hero.title');
  const heroSubtitle = cmsData?.heroSubtitle || t('hero.subtitle');

  // Benefits
  const benefits = cmsData?.benefits && cmsData.benefits.length > 0
    ? cmsData.benefits
    : [
        {
          title: t('benefits.benefit1.title'),
          description: t('benefits.benefit1.description'),
        },
        {
          title: t('benefits.benefit2.title'),
          description: t('benefits.benefit2.description'),
        },
        {
          title: t('benefits.benefit3.title'),
          description: t('benefits.benefit3.description'),
        },
        {
          title: t('benefits.benefit4.title'),
          description: t('benefits.benefit4.description'),
        },
      ];

  // Requirements
  const requirementsIntro = cmsData?.requirementsIntro || t('requirements.intro');
  const requirements = cmsData?.requirements && cmsData.requirements.length > 0
    ? cmsData.requirements
    : [
        t('requirements.list.0'),
        t('requirements.list.1'),
        t('requirements.list.2'),
        t('requirements.list.3'),
      ];

  // Steps
  const stepsTitle = cmsData?.stepsTitle || t('steps.title');
  const steps = cmsData?.steps && cmsData.steps.length > 0
    ? cmsData.steps
    : [
        t('steps.list.0'),
        t('steps.list.1'),
        t('steps.list.2'),
        t('steps.list.3'),
      ];

  // CTA
  const ctaTitle = cmsData?.ctaTitle || t('cta.title');
  const ctaSubtitle = cmsData?.ctaSubtitle || t('cta.subtitle');
  const ctaButton = cmsData?.ctaButton || t('cta.button');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#dd1828] leading-tight">
                  {heroTitle}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#182b33]">
              Beneficios para conductores
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-[#F5F5F5] rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#dd1828] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-[#182b33] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="w-full py-16 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#182b33]">
              {t('requirements.title')}
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-8 leading-relaxed">
              {requirementsIntro}
            </p>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ul className="space-y-4">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-[#dd1828] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#182b33]">
              {stepsTitle}
            </h2>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#dd1828] text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-lg text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-[#182b33] mb-4">
              {ctaTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {ctaSubtitle}
            </p>

            <Link href="/contacto">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] bg-[#dd1828] text-white hover:bg-[#dd1828]/90">
                {ctaButton}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
