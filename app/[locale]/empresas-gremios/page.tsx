import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { EnterpriseBenefits } from '@/components/business/EnterpriseBenefits';
import { GuildBenefits } from '@/components/business/GuildBenefits';
import { CaseStudies } from '@/components/business/CaseStudies';
import { ComparisonTable } from '@/components/business/ComparisonTable';
import { EnterpriseProcess } from '@/components/business/EnterpriseProcess';
import { GuildProcess } from '@/components/business/GuildProcess';
import { B2BCTA, DualCTA } from '@/components/business/B2BCTA';
import { StructuredData } from '@/components/seo/StructuredData';
import { Building2, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ETAXI Empresas y Gremios - Soluciones B2B de Transporte Regulado',
  description: 'Digitaliza tu operación de movilidad corporativa o gremial con ETAXI. Trazabilidad completa, gestión centralizada, reportes en tiempo real y 100% legal según Ley 21.553.',
  keywords: ['ETAXI empresas', 'transporte corporativo', 'gremios taxi', 'soluciones B2B', 'gestión de flota', 'movilidad empresarial', 'Ley 21.553'],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/empresas-gremios',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/empresas-gremios',
      'en-US': 'https://www.etaxi.cl/en/business-guilds',
    },
  },
  openGraph: {
    title: 'ETAXI Empresas y Gremios - Soluciones B2B de Transporte Regulado',
    description: 'Digitaliza tu operación con la única plataforma 100% legal. Trazabilidad, reportes y gestión centralizada.',
    url: 'https://www.etaxi.cl/empresas-gremios',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: 'https://www.etaxi.cl/og-image-business.jpg',
        width: 1200,
        height: 630,
        alt: 'ETAXI Empresas y Gremios - Soluciones B2B',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETAXI Empresas y Gremios - Soluciones B2B',
    description: 'Digitaliza tu operación de transporte regulado con trazabilidad completa y gestión centralizada.',
  },
};

export default function EmpresasGremiosPage() {
  const t = useTranslations('businessPage');

  return (
    <div className="flex min-h-screen flex-col">
      {/* Schema.org Structured Data */}
      <StructuredData type="service" data={{
        serviceType: 'B2B Corporate Transport Solutions',
        catalogName: 'Soluciones Empresariales y Gremiales',
        description: 'Soluciones de transporte regulado para empresas y gremios. Gestión de flota, facturación centralizada, reportes y 100% cumplimiento legal.',
      }} />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-[#030c13] via-[#182b33] to-[#030c13] text-white relative overflow-hidden animate-gradient">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-[#dd1828]/20 rounded-full mb-4 border border-[#dd1828]/30">
                <p className="text-sm font-semibold text-[#fff500]">
                  {t('hero.badge')}
                </p>
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#dd1828]/20 mb-6 backdrop-blur-sm border-2 border-[#dd1828]/30">
                <Building2 className="w-10 h-10 text-[#fff500]" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  className="bg-[#dd1828] text-white hover:bg-[#dd1828]/90 hover:border-[#fff500] border-2 border-transparent min-w-[220px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  {t('hero.ctaDemo')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#fff500] text-[#fff500] hover:bg-[#fff500]/10 min-w-[220px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Shield className="w-6 h-6 mr-2" />
                  {t('hero.ctaMeeting')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Benefits Section */}
        <EnterpriseBenefits />

        {/* Guild Benefits Section */}
        <GuildBenefits />

        {/* Case Studies */}
        <CaseStudies />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Enterprise Process */}
        <EnterpriseProcess />

        {/* Guild Process */}
        <GuildProcess />

        {/* Dual CTA (Enterprise vs Guild) */}
        <DualCTA />

        {/* Final CTA */}
        <B2BCTA />
      </main>

      <Footer />
    </div>
  );
}
