import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { DriverStats } from '@/components/drivers/DriverStats';
import { DriverBenefits } from '@/components/drivers/DriverBenefits';
import { DriverRequirements } from '@/components/drivers/DriverRequirements';
import { OnboardingProcess } from '@/components/drivers/OnboardingProcess';
import { EarningsCalculator } from '@/components/drivers/EarningsCalculator';
import { DriverTestimonials } from '@/components/drivers/DriverTestimonials';
import { DriverFAQ } from '@/components/drivers/DriverFAQ';
import { StructuredData } from '@/components/seo/StructuredData';
import { Check, Users, FileCheck, TrendingUp, Shield, Car } from 'lucide-react';
import Link from 'next/link';
import { getDriverPage } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.conductores.title,
  description: seoConfig.conductores.description,
  keywords: seoConfig.conductores.keywords,
  alternates: {
    canonical: 'https://www.etaxi.cl/es/conductores',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/conductores',
      'en-US': 'https://www.etaxi.cl/en/drivers',
    },
  },
  openGraph: {
    title: seoConfig.conductores.title,
    description: seoConfig.conductores.description,
    url: 'https://www.etaxi.cl/conductores',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: 'https://www.etaxi.cl/og-image-drivers.jpg',
        width: 1200,
        height: 630,
        alt: 'ETAXI Conductores - Únete a la Plataforma Legal',
      },
    ],
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
  const t = await getTranslations('driverPage');

  return (
    <div className="flex min-h-screen flex-col">
      {/* Schema.org Structured Data */}
      <StructuredData type="service" data={{
        serviceType: 'Driver Partnership Program',
        catalogName: 'Programa para Conductores',
        description: 'Únete a ETAXI como conductor profesional. Plataforma 100% legal, sin comisiones abusivas, más viajes y respeto a tu trabajo.',
      }} />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Enhanced Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] animate-gradient-slow" />

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#dd1828] blur-[140px] opacity-30" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text content */}
              <div className="text-center md:text-left space-y-6">
                <div className="inline-block px-4 py-2 bg-[#fff500]/20 rounded-full mb-4">
                  <p className="text-sm font-semibold text-[#fff500]">
                    {t('hero.badge')}
                  </p>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {t('hero.title')}
                </h1>

                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {t('hero.subtitle')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#registro"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#fff500] text-[#030c13] rounded-lg font-semibold text-lg hover:bg-[#fff500]/90 hover:shadow-[0_0_20px_rgba(221,24,40,0.5)] transition-all duration-300 hover:scale-105"
                  >
                    <Car className="w-5 h-5 mr-2" />
                    {t('hero.cta1')}
                  </a>
                  <a
                    href="#requisitos"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    {t('hero.cta2')}
                  </a>
                </div>
              </div>

              {/* Right: Visual element */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#fff500]/20 blur-3xl rounded-full" />

                  {/* Icon */}
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#fff500] to-[#fff500]/70 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <Car className="w-32 h-32 text-[#030c13]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <DriverStats />

        {/* Benefits Section */}
        <DriverBenefits />

        {/* Earnings Calculator */}
        <EarningsCalculator />

        {/* Requirements Section */}
        <DriverRequirements />

        {/* Onboarding Process */}
        <OnboardingProcess />

        {/* Testimonials */}
        <DriverTestimonials />

        {/* FAQ */}
        <DriverFAQ />

        {/* Final CTA Section */}
        <section className="w-full py-16 bg-gradient-to-r from-[#dd1828] via-[#182b33] to-[#030c13] text-white relative overflow-hidden" id="registro">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {t('cta.subtitle')}
            </p>
            <Link href="/contacto">
              <Button size="lg" className="bg-[#fff500] text-[#030c13] hover:bg-[#fff500]/90 hover:shadow-[0_0_20px_rgba(221,24,40,0.5)] min-w-[250px] text-lg font-bold transition-all duration-300 hover:scale-105">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
