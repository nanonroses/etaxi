'use client';

import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PassengerStats } from '@/components/passengers/PassengerStats';
import { PassengerBenefits } from '@/components/passengers/PassengerBenefits';
import { HowToUse } from '@/components/passengers/HowToUse';
import { AppComparison } from '@/components/passengers/AppComparison';
import { UseCases } from '@/components/passengers/UseCases';
import { PassengerTestimonials } from '@/components/passengers/PassengerTestimonials';
import { PassengerFAQ } from '@/components/passengers/PassengerFAQ';
import { PassengerCTA } from '@/components/passengers/PassengerCTA';
import { StructuredData } from '@/components/seo/StructuredData';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';

export default function PasajerosPage() {
  const t = useTranslations('passengerPage');

  return (
    <div className="flex min-h-screen flex-col">
      {/* Schema.org Structured Data */}
      <StructuredData type="service" data={{
        serviceType: 'Taxi Service for Passengers',
        catalogName: 'Servicios para Pasajeros',
        description: 'Plataforma de taxis 100% legales con conductores verificados, tarifas transparentes y trazabilidad completa.',
      }} />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Enhanced Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-[#dd1828] via-[#182b33] to-[#030c13] text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#dd1828] via-[#182b33] to-[#030c13] animate-gradient-slow" />

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#fff500] blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text content */}
              <m.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center md:text-left space-y-6"
              >
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
                  <Link
                    href="/descargar-app"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#fff500] text-[#182b33] rounded-lg font-semibold text-lg hover:bg-[#fff500]/90 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    {t('hero.cta1')}
                  </Link>
                  <a
                    href="#como-usar"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                  >
                    {t('hero.cta2')}
                  </a>
                </div>
              </m.div>

              {/* Right: Visual element */}
              <m.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="flex justify-center"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fff500]/40 to-[#dd1828]/30 blur-3xl rounded-full" />

                  {/* Icon */}
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#fff500] to-[#dd1828] flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-white/20">
                    <Smartphone className="w-32 h-32 text-[#182b33]" />
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <PassengerStats />

        {/* Benefits Section */}
        <PassengerBenefits />

        {/* How to Use Section */}
        <div id="como-usar">
          <HowToUse />
        </div>

        {/* App Comparison Section */}
        <AppComparison />

        {/* Use Cases Section */}
        <UseCases />

        {/* Testimonials Section */}
        <PassengerTestimonials />

        {/* FAQ Section */}
        <PassengerFAQ />

        {/* Final CTA Section */}
        <PassengerCTA />
      </main>

      <Footer />
    </div>
  );
}
