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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ETAXI Pasajeros - Taxis Legales y Seguros en Chile',
  description: 'Viaja seguro con la primera plataforma 100% regulada de Chile. Conductores profesionales, tarifa justa y tecnología que protege cada viaje.',
  keywords: ['taxis legales', 'pasajeros', 'viajes seguros', 'taxis regulados', 'transporte Chile', 'app taxis', 'ETAXI pasajeros'],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/pasajeros',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/pasajeros',
      'en-US': 'https://www.etaxi.cl/en/passengers',
    },
  },
  openGraph: {
    title: 'ETAXI Pasajeros - Tu Taxi Legal Siempre a tu Alcance',
    description: 'Viaja seguro con conductores profesionales, tarifa transparente y trazabilidad completa. 100% regulado bajo Ley 21.553.',
    url: 'https://www.etaxi.cl/pasajeros',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: 'https://www.etaxi.cl/og-image-passengers.jpg',
        width: 1200,
        height: 630,
        alt: 'ETAXI Pasajeros - Viaja Seguro con Taxis Legales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETAXI Pasajeros - Taxis Legales y Seguros',
    description: 'La primera plataforma 100% regulada de Chile. Conductores profesionales y tarifa justa.',
  },
};

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
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text content */}
              <div className="text-center md:text-left space-y-6">
                <div className="inline-block px-4 py-2 bg-[#F8D347]/20 rounded-full mb-4">
                  <p className="text-sm font-semibold text-[#F8D347]">
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
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#F8D347] text-[#0C1A2B] rounded-lg font-semibold text-lg hover:bg-[#F8D347]/90 transition-colors"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    {t('hero.cta1')}
                  </Link>
                  <a
                    href="#como-usar"
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
                  <div className="absolute inset-0 bg-[#F8D347]/20 blur-3xl rounded-full" />

                  {/* Icon */}
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#F8D347] to-[#F8D347]/70 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <Smartphone className="w-32 h-32 text-[#0C1A2B]" />
                  </div>
                </div>
              </div>
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
