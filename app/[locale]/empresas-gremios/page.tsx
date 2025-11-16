import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { getBusinessPage } from '@/lib/sanity.queries';
import { generateMetadata as genMeta } from '@/app/seo.config';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return genMeta('empresasGremios', 'es');
}

export default async function EmpresasGremiosPage() {
  // Fetch from Sanity CMS
  const cmsData = await getBusinessPage();
  const t = useTranslations('businessPage');

  // Use CMS data with fallbacks to translations
  const heroTitle = cmsData?.heroTitle || t('hero.title');
  const heroSubtitle = cmsData?.heroSubtitle || t('hero.subtitle');

  // Enterprise benefits
  const enterpriseBenefits = cmsData?.enterpriseBenefits && cmsData.enterpriseBenefits.length > 0
    ? cmsData.enterpriseBenefits
    : [
        {
          title: t('enterprise.benefit1.title'),
          description: t('enterprise.benefit1.description'),
        },
        {
          title: t('enterprise.benefit2.title'),
          description: t('enterprise.benefit2.description'),
        },
        {
          title: t('enterprise.benefit3.title'),
          description: t('enterprise.benefit3.description'),
        },
        {
          title: t('enterprise.benefit4.title'),
          description: t('enterprise.benefit4.description'),
        },
      ];

  // Guild section
  const guildIntro = cmsData?.guildIntro || t('guild.intro');
  const guildBenefits = cmsData?.guildBenefits && cmsData.guildBenefits.length > 0
    ? cmsData.guildBenefits
    : [
        {
          title: t('guild.benefit1.title'),
          body: t('guild.benefit1.body'),
        },
        {
          title: t('guild.benefit2.title'),
          body: t('guild.benefit2.body'),
        },
        {
          title: t('guild.benefit3.title'),
          body: t('guild.benefit3.body'),
        },
        {
          title: t('guild.benefit4.title'),
          body: t('guild.benefit4.body'),
        },
      ];

  // CTA section
  const ctaTitle = cmsData?.ctaTitle || t('cta.title');
  const ctaSubtitle = cmsData?.ctaSubtitle || t('cta.subtitle');
  const ctaButton = cmsData?.ctaButton || t('cta.button');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#dd1828] leading-tight">
                  {heroTitle}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Benefits Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#182b33]">
              Soluciones para empresas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {enterpriseBenefits.map((benefit, index) => (
                <div key={index} className="bg-[#F5F5F5] rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#dd1828] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-[#182b33] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guild Benefits Section */}
        <section className="w-full py-16 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6 text-[#182b33]">
                Soluciones para gremios de taxistas
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-12 leading-relaxed">
                {guildIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guildBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#182b33] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold text-[#182b33] mb-4">
              {ctaTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {ctaSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contacto">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] bg-[#dd1828] text-white hover:bg-[#dd1828]/90">
                  {ctaButton}
                </Button>
              </Link>
              <Link href="/ayuda">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] border-[#182b33] text-[#182b33] hover:bg-[#182b33]/5">
                  Solicitar información
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
