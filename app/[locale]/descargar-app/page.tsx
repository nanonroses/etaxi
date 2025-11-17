import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';
import { AppStats } from '@/components/download/AppStats';
import { AppFeatures } from '@/components/download/AppFeatures';
import { AppScreenshots } from '@/components/download/AppScreenshots';
import { SystemRequirements } from '@/components/download/SystemRequirements';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check, Smartphone } from 'lucide-react';
import { getAppDownload } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import Image from 'next/image';
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

        {/* Enhanced Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white relative overflow-hidden">
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

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#download"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#F8D347] text-[#0C1A2B] rounded-lg font-semibold text-lg hover:bg-[#F8D347]/90 transition-colors"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Descargar Ahora
                  </a>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    Ver Características
                  </a>
                </div>
              </div>

              {/* Right: Phone mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#F8D347]/20 blur-3xl rounded-full" />

                  {/* Phone */}
                  <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300" style={{ width: '300px' }}>
                    {/* Notch */}
                    <div className="bg-black rounded-t-[2.5rem] h-8 flex items-center justify-center mb-2">
                      <div className="w-24 h-5 bg-gray-900 rounded-full" />
                    </div>

                    {/* Screen */}
                    <div className="aspect-[9/16] rounded-[2rem] bg-gradient-to-br from-[#F8D347] to-[#F8D347]/70 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src="/images/placeholders/Screen Etaxi Chile.webp"
                        alt="ETAXI App - Pantalla"
                        fill
                        className="object-cover rounded-[2rem]"
                      />
                    </div>

                    {/* Home indicator */}
                    <div className="bg-black rounded-b-[2.5rem] h-10 flex items-center justify-center mt-2">
                      <div className="w-28 h-1 bg-white rounded-full opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
        <section className="w-full py-16 md:py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0C1A2B]">
              {t('faq.title')}
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0C1A2B]">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
