import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Cookie, Settings, Shield, Clock, RefreshCw, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | ETAXI - Gestión de Cookies y Privacidad',
  description: 'Política de Cookies de ETAXI. Conoce qué cookies utilizamos, para qué las usamos y cómo puedes gestionarlas o desactivarlas en tu navegador.',
  keywords: ['política de cookies', 'cookies ETAXI', 'privacidad', 'gestión de cookies', 'cookies esenciales', 'cookies analíticas'],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/politica-cookies',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/politica-cookies',
      'en-US': 'https://www.etaxi.cl/en/cookie-policy',
    },
  },
  openGraph: {
    title: 'Política de Cookies | ETAXI',
    description: 'Conoce cómo ETAXI utiliza cookies en su sitio web y cómo puedes gestionarlas.',
    url: 'https://www.etaxi.cl/politica-cookies',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PoliticaCookiesPage() {
  const t = useTranslations('legalPages.cookies');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <section className="w-full py-12 bg-gradient-to-b from-[#0C1A2B] to-[#182b33] text-white">
          <div className="container mx-auto max-w-[900px] px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8D347]/20 mb-6">
                <Cookie className="w-8 h-8 text-[#F8D347]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t('title')}
              </h1>
              <p className="text-white/80">
                {t('lastUpdated')}
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="w-full py-8 bg-blue-50">
          <div className="container mx-auto max-w-[900px] px-4">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {t('intro')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-[900px] px-4">
            <div className="prose prose-lg max-w-none space-y-12">

              {/* Section 1: ¿Qué son las Cookies? */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-[#F8D347]" />
                  {t('section1.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('section1.content')}
                </p>
              </div>

              {/* Section 2: ¿Para qué Usamos las Cookies? */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-[#F8D347]" />
                  {t('section2.title')}
                </h2>
                <p className="text-muted-foreground mb-3">{t('section2.intro')}</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('section2.purpose1')}</li>
                  <li>{t('section2.purpose2')}</li>
                  <li>{t('section2.purpose3')}</li>
                  <li>{t('section2.purpose4')}</li>
                </ul>
              </div>

              {/* Section 3: Tipos de Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#F8D347]" />
                  {t('section3.title')}
                </h2>

                <div className="space-y-6">
                  {/* 3.1 Essential Cookies */}
                  <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                      {t('section3.essential.title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('section3.essential.content')}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {t('section3.essential.examples')}
                    </p>
                  </div>

                  {/* 3.2 Analytics Cookies */}
                  <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                      {t('section3.analytics.title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('section3.analytics.content')}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {t('section3.analytics.examples')}
                    </p>
                  </div>

                  {/* 3.3 Functional Cookies */}
                  <div className="p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                      {t('section3.functional.title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('section3.functional.content')}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {t('section3.functional.examples')}
                    </p>
                  </div>

                  {/* 3.4 Marketing Cookies */}
                  <div className="p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                      {t('section3.marketing.title')}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {t('section3.marketing.content')}
                    </p>
                    <p className="text-sm font-semibold text-orange-700">
                      {t('section3.marketing.note')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Cookies de Terceros */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4">
                  {t('section4.title')}
                </h2>
                <p className="text-muted-foreground mb-3">
                  {t('section4.content')}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {t('section4.examples')}
                </p>
              </div>

              {/* Section 5: Cómo Gestionar y Desactivar */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-[#F8D347]" />
                  {t('section5.title')}
                </h2>
                <p className="text-muted-foreground mb-4">{t('section5.intro')}</p>

                {/* 5.1 Browser Settings */}
                <div className="mb-6 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                    {t('section5.browser.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('section5.browser.content')}
                  </p>
                  <p className="font-semibold text-[#0C1A2B] mb-2">
                    {t('section5.browser.links')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>{t('section5.browser.chrome')}</li>
                    <li>{t('section5.browser.firefox')}</li>
                    <li>{t('section5.browser.safari')}</li>
                    <li>{t('section5.browser.edge')}</li>
                  </ul>
                </div>

                {/* 5.2 Opt-Out Analytics */}
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                    {t('section5.optOut.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('section5.optOut.content')}
                  </p>
                </div>

                {/* 5.3 Consequences */}
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {t('section5.consequences.title')}
                  </h3>
                  <p className="text-sm text-yellow-700">
                    {t('section5.consequences.content')}
                  </p>
                </div>
              </div>

              {/* Section 6: Duración de las Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#F8D347]" />
                  {t('section6.title')}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Cookies de sesión:</strong> {t('section6.session')}</li>
                  <li><strong>Cookies persistentes:</strong> {t('section6.persistent')}</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t('section6.duration')}
                </p>
              </div>

              {/* Section 7: Actualizaciones */}
              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                  {t('section7.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('section7.content')}
                </p>
              </div>

              {/* Section 8: Contacto */}
              <div className="p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#F8D347]" />
                  {t('section8.title')}
                </h2>
                <p className="text-muted-foreground mb-3">
                  {t('section8.content')}
                </p>
                <div className="space-y-1">
                  <p className="text-[#0C1A2B] font-semibold">
                    {t('section8.email')}
                  </p>
                  <p className="text-muted-foreground">
                    {t('section8.address')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
