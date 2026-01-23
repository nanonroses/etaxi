import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { OnboardingCarousel } from '@/components/drivers/onboarding';
import { DownloadButton } from '@/components/drivers/onboarding';
import { StructuredData } from '@/components/seo/StructuredData';
import { BookOpen, CheckCircle2, Clock, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.guiaInstalacion.title,
  description: seoConfig.guiaInstalacion.description,
  keywords: seoConfig.guiaInstalacion.keywords,
  alternates: {
    canonical: 'https://www.etaxi.cl/es/conductores/guia-instalacion',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/conductores/guia-instalacion',
      'en-US': 'https://www.etaxi.cl/en/drivers/installation-guide',
    },
  },
  openGraph: {
    title: seoConfig.guiaInstalacion.title,
    description: seoConfig.guiaInstalacion.description,
    url: 'https://www.etaxi.cl/conductores/guia-instalacion',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.guiaInstalacion.title,
    description: seoConfig.guiaInstalacion.description,
  },
};

export default async function GuiaInstalacionPage() {
  const t = await getTranslations('driverOnboarding');

  // Build translations object for the carousel component
  const carouselTranslations = {
    phases: {
      descarga: {
        title: t('phases.descarga.title'),
        description: t('phases.descarga.description'),
      },
      acceso: {
        title: t('phases.acceso.title'),
        description: t('phases.acceso.description'),
      },
      configuracion: {
        title: t('phases.configuracion.title'),
        description: t('phases.configuracion.description'),
      },
      permisos: {
        title: t('phases.permisos.title'),
        description: t('phases.permisos.description'),
      },
      funciones: {
        title: t('phases.funciones.title'),
        description: t('phases.funciones.description'),
      },
    },
    steps: Object.fromEntries(
      Array.from({ length: 37 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return [
          num,
          {
            title: t(`steps.${num}.title`),
            description: t(`steps.${num}.description`),
          },
        ];
      })
    ),
    navigation: {
      prev: t('navigation.prev'),
      next: t('navigation.next'),
      stepOf: t('navigation.stepOf'),
    },
  };

  const features = [
    {
      icon: Clock,
      title: t('features.time.title'),
      description: t('features.time.description'),
    },
    {
      icon: Smartphone,
      title: t('features.android.title'),
      description: t('features.android.description'),
    },
    {
      icon: CheckCircle2,
      title: t('features.steps.title'),
      description: t('features.steps.description'),
    },
    {
      icon: BookOpen,
      title: t('features.visual.title'),
      description: t('features.visual.description'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <StructuredData
        type="service"
        data={{
          serviceType: 'Driver Onboarding Guide',
          catalogName: 'Guía de Instalación App Conductor',
          description:
            'Guía paso a paso para descargar, instalar y configurar la aplicación ETAXI para conductores de taxi.',
        }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-[#fff500]/20 rounded-full mb-4">
                <p className="text-sm font-semibold text-[#fff500]">
                  {t('hero.badge')}
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {t('hero.title')}
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm"
                    >
                      <Icon className="w-8 h-8 text-[#fff500] mb-2" />
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-white/60 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <OnboardingCarousel translations={carouselTranslations} />
          </div>
        </section>

        {/* FAQ Quick Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-[800px] px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#182b33] text-center mb-8">
              {t('faq.title')}
            </h2>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#182b33] mb-2">
                    {t(`faq.q${i}.question`)}
                  </h3>
                  <p className="text-[#596065]">{t(`faq.q${i}.answer`)}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/ayuda"
                className="text-[#dd1828] font-semibold hover:underline"
              >
                {t('faq.moreHelp')}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-r from-[#dd1828] via-[#182b33] to-[#030c13] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#fff500] blur-3xl" />
          </div>

          <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/80 mb-8">{t('cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DownloadButton label={t('cta.download')} />
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                {t('cta.contact')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Spacer for mobile sticky button */}
      <div className="h-24 md:hidden" />
    </div>
  );
}
