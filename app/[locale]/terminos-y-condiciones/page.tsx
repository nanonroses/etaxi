import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FileText, Scale, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | ETAXI - Plataforma Legal de Taxis en Chile',
  description: 'Términos y Condiciones de Uso de ETAXI. Conoce los términos legales que rigen el uso de nuestra plataforma tecnológica de intermediación para taxis regulados en Chile.',
  keywords: ['términos y condiciones', 'ETAXI legal', 'condiciones de uso', 'plataforma tecnológica', 'intermediación taxis'],
  alternates: {
    canonical: 'https://www.etaxi.cl/es/terminos-y-condiciones',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es/terminos-y-condiciones',
      'en-US': 'https://www.etaxi.cl/en/terms-and-conditions',
    },
  },
  openGraph: {
    title: 'Términos y Condiciones | ETAXI',
    description: 'Términos y Condiciones de Uso de ETAXI - Plataforma tecnológica de taxis legales en Chile.',
    url: 'https://www.etaxi.cl/terminos-y-condiciones',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TerminosYCondicionesPage() {
  const t = useTranslations('legalPages.terms');

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
                <FileText className="w-8 h-8 text-[#F8D347]" />
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

        {/* Content */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-[900px] px-4">
            <div className="prose prose-lg max-w-none">

              {/* Section 1: Aceptación */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#F8D347]" />
                  {t('section1.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('section1.content')}
                </p>
              </div>

              {/* Section 2: Descripción del Servicio */}
              <div className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-2">
                  {t('section2.title')}
                </h2>
                <p className="text-sm font-semibold text-blue-700 mb-4">
                  {t('section2.subtitle')}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('section2.content')}
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-[#0C1A2B] mb-2">
                    {t('section2.responsibilities.title')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>{t('section2.responsibilities.etaxi')}</li>
                    <li>{t('section2.responsibilities.operators')}</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Alcance del Servicio */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4">
                  {t('section3.title')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-2">
                      {t('section3.web.title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('section3.web.content')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C1A2B] mb-2">
                      {t('section3.apps.title')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>{t('section3.apps.passenger')}</li>
                      <li>{t('section3.apps.driver')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Registro */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4">
                  {t('section4.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('section4.content')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('section4.obligations')}
                </p>
              </div>

              {/* Section 5: Uso Aceptable */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4">
                  {t('section5.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('section5.intro')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('section5.rule1')}</li>
                  <li>{t('section5.rule2')}</li>
                  <li>{t('section5.rule3')}</li>
                  <li>{t('section5.rule4')}</li>
                  <li>{t('section5.rule5')}</li>
                </ul>
              </div>

              {/* Section 6: Limitaciones de Responsabilidad */}
              <div className="mb-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  {t('section6.title')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {t('section6.intro')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>{t('section6.limit1')}</li>
                  <li>{t('section6.limit2')}</li>
                  <li>{t('section6.limit3')}</li>
                  <li>{t('section6.limit4')}</li>
                </ul>
              </div>

              {/* Sections 7-11 */}
              {[7, 8, 9, 10, 11].map((num) => {
                const key = `section${num}` as any;
                const section = t.raw(key);

                return (
                  <div key={num} className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0C1A2B] mb-4">
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
