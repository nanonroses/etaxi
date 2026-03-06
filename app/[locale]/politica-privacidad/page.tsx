import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | ETAXI - Protección de Datos Personales',
  description: 'Política de Privacidad de ETAXI. Conoce cómo recopilamos, usamos, compartimos y protegemos tu información personal en cumplimiento con la legislación chilena.',
  keywords: ['política de privacidad', 'protección de datos', 'ETAXI privacidad', 'datos personales', 'derechos ARCO'],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/politica-privacidad',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/politica-privacidad',
      'en-US': 'https://www.etaxi.cl/en/privacy-policy',
    },
  },
  openGraph: {
    title: 'Política de Privacidad | ETAXI',
    description: 'Conoce cómo ETAXI protege tu información personal y respeta tus derechos de privacidad.',
    url: 'https://www.etaxi.cl/politica-privacidad',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PoliticaPrivacidadPage() {
  const t = useTranslations('legalPages.privacy');

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
                <Shield className="w-8 h-8 text-[#F8D347]" />
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

              {/* Section 1: Información que Recopilamos */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-6 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#F8D347]" />
                  {t('section1.title')}
                </h2>

                {/* 1.1 Sitio Web */}
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#0C1A2B] mb-3">
                    {t('section1.web.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>{t('section1.web.item1')}</li>
                    <li>{t('section1.web.item2')}</li>
                    <li>{t('section1.web.item3')}</li>
                  </ul>
                </div>

                {/* 1.2 Apps */}
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#0C1A2B] mb-4">
                    {t('section1.apps.title')}
                  </h3>

                  {/* App Pasajero */}
                  <div className="mb-4">
                    <p className="font-semibold text-[#0C1A2B] mb-2">
                      {t('section1.apps.passenger.title')}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>{t('section1.apps.passenger.item1')}</li>
                      <li>{t('section1.apps.passenger.item2')}</li>
                      <li>{t('section1.apps.passenger.item3')}</li>
                      <li>{t('section1.apps.passenger.item4')}</li>
                      <li>{t('section1.apps.passenger.item5')}</li>
                    </ul>
                  </div>

                  {/* App Conductor */}
                  <div>
                    <p className="font-semibold text-[#0C1A2B] mb-2">
                      {t('section1.apps.driver.title')}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>{t('section1.apps.driver.item1')}</li>
                      <li>{t('section1.apps.driver.item2')}</li>
                      <li>{t('section1.apps.driver.item3')}</li>
                      <li>{t('section1.apps.driver.item4')}</li>
                      <li>{t('section1.apps.driver.item5')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2: Cómo Usamos la Información */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#F8D347]" />
                  {t('section2.title')}
                </h2>
                <p className="text-muted-foreground mb-3">{t('section2.intro')}</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('section2.purpose1')}</li>
                  <li>{t('section2.purpose2')}</li>
                  <li>{t('section2.purpose3')}</li>
                  <li>{t('section2.purpose4')}</li>
                  <li>{t('section2.purpose5')}</li>
                  <li>{t('section2.purpose6')}</li>
                </ul>
              </div>

              {/* Section 3: Con Quién Compartimos */}
              <div>
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-[#F8D347]" />
                  {t('section3.title')}
                </h2>
                <p className="text-muted-foreground mb-4">{t('section3.intro')}</p>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const key = `party${num}` as any;
                    const party = t.raw(`section3.${key}`);
                    return (
                      <div key={num} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold text-[#0C1A2B] mb-2">{party.title}</p>
                        <p className="text-sm text-muted-foreground">{party.content}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">
                    {t('section3.noSale')}
                  </p>
                </div>
              </div>

              {/* Section 4: Derechos ARCO */}
              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  {t('section4.title')}
                </h2>
                <p className="text-muted-foreground mb-3">{t('section4.intro')}</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li><strong>A</strong>cceso: {t('section4.right1').split(': ')[1]}</li>
                  <li><strong>R</strong>ectificación: {t('section4.right2').split(': ')[1]}</li>
                  <li><strong>C</strong>ancelación: {t('section4.right3').split(': ')[1]}</li>
                  <li><strong>O</strong>posición: {t('section4.right4').split(': ')[1]}</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  {t('section4.exercise')}
                </p>
              </div>

              {/* Sections 5-11 */}
              {[5, 6, 7, 8, 9, 10, 11].map((num) => {
                const key = `section${num}` as any;
                const section = t.raw(key);

                return (
                  <div key={num}>
                    <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                      <Lock className="w-6 h-6 text-[#F8D347]" />
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                      {section.email && (
                        <>
                          <br />
                          <strong>{section.email}</strong>
                          <br />
                          {section.address}
                        </>
                      )}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
