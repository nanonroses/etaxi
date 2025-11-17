import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';
import { DownloadHero } from '@/components/download/DownloadHero';
import { AppStats } from '@/components/download/AppStats';
import { AppFeatures } from '@/components/download/AppFeatures';
import { AppScreenshots } from '@/components/download/AppScreenshots';
import { SystemRequirements } from '@/components/download/SystemRequirements';
import { AccordionAnimated } from '@/components/ui/accordion-animated';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { getAppDownload } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.descargarApp.title,
  description: seoConfig.descargarApp.description,
  keywords: seoConfig.descargarApp.keywords,
  openGraph: {
    title: seoConfig.descargarApp.title,
    description: seoConfig.descargarApp.description,
    url: 'https://www.etaxi.cl/descargar-app',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.descargarApp.title,
    description: seoConfig.descargarApp.description,
  },
};

export default async function DescargarAppPage() {
  const appData = await getAppDownload();
  const t = await getTranslations('downloadPage');

  const features = [
    {
      title: t('whyUse.feature1.title'),
      description: t('whyUse.feature1.description'),
    },
    {
      title: t('whyUse.feature2.title'),
      description: t('whyUse.feature2.description'),
    },
    {
      title: t('whyUse.feature3.title'),
      description: t('whyUse.feature3.description'),
    },
    {
      title: t('whyUse.feature4.title'),
      description: t('whyUse.feature4.description'),
    },
  ];

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
    },
    {
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
    },
    {
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <DownloadHero />

        {/* Stats Section */}
        <AppStats />

        {/* Download CTA */}
        <div id="download">
          <DownloadAppCTA
            headline={appData?.headline}
            subheadline={appData?.subheadline}
            playStoreUrl={appData?.playStoreUrl}
            appStoreUrl={appData?.appStoreUrl}
          />
        </div>

        {/* App Features Section */}
        <div id="features">
          <AppFeatures />
        </div>

        {/* Why Use ETAXI Section */}
        <section className="w-full py-16 md:py-20 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0C1A2B]">
              {t('whyUse.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-[#F8D347] transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-xl mb-2 text-[#0C1A2B]">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* App Screenshots */}
        <AppScreenshots />

        {/* System Requirements */}
        <SystemRequirements />

        {/* FAQ Section */}
        <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] via-white to-[hsl(var(--muted))] relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#F8D347] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-[#F8D347]/10 rounded-full mb-4 border border-[#F8D347]/20">
                <p className="text-sm font-semibold text-[#0C1A2B]">
                  Preguntas Frecuentes
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#0C1A2B]">
                {t('faq.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resolvemos tus dudas sobre la aplicación ETAXI
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <AccordionAnimated items={faqs} />
            </div>
          </div>
        </section>

        {/* Final Download CTA */}
        <section className="w-full py-16 bg-gradient-to-br from-[#0C1A2B] to-[#182b33] text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Descarga ETAXI gratis y viaja con la tranquilidad que mereces
            </p>
            <DownloadAppCTA
              headline=""
              subheadline=""
              playStoreUrl={appData?.playStoreUrl}
              appStoreUrl={appData?.appStoreUrl}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
