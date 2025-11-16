import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileCheck, Scale, MapPin, IdCard } from 'lucide-react';
import { getCompliancePage } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.cumplimiento.title,
  description: seoConfig.cumplimiento.description,
  keywords: seoConfig.cumplimiento.keywords,
  openGraph: {
    title: seoConfig.cumplimiento.title,
    description: seoConfig.cumplimiento.description,
    url: 'https://www.etaxi.cl/cumplimiento',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.cumplimiento.title,
    description: seoConfig.cumplimiento.description,
  },
};

// Map icon names to components
const iconMap: Record<string, any> = {
  Scale,
  FileCheck,
  MapPin,
  IdCard,
};

export default async function CumplimientoPage() {
  // Fetch from Sanity CMS
  const cmsData = await getCompliancePage();
  const t = useTranslations('compliancePage');

  // Use CMS data with fallbacks to translations
  const heroTitle = cmsData?.title || t('hero.title');
  const heroSubtitle = t('hero.subtitle');
  const introTitle = t('intro.title');
  const introDescription = cmsData?.intro || t('intro.description');
  const regulationsTitle = t('regulations.title');
  const commitmentTitle = t('commitment.title');
  const commitmentDescription = cmsData?.lawMention || t('commitment.description');

  // Use CMS regulations if available, otherwise use translations
  const regulations = cmsData?.regulations && cmsData.regulations.length > 0
    ? cmsData.regulations.map((regulation) => ({
        icon: regulation.icon ? iconMap[regulation.icon] || Scale : Scale,
        title: regulation.title,
        description: regulation.description,
      }))
    : [
        {
          icon: Scale,
          title: t('regulations.law21553.title'),
          description: t('regulations.law21553.description'),
        },
        {
          icon: FileCheck,
          title: t('regulations.ds212.title'),
          description: t('regulations.ds212.description'),
        },
        {
          icon: MapPin,
          title: t('regulations.municipal.title'),
          description: t('regulations.municipal.description'),
        },
        {
          icon: IdCard,
          title: t('regulations.licenses.title'),
          description: t('regulations.licenses.description'),
        },
      ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-[hsl(var(--foreground))] leading-tight">
                {heroTitle}
              </h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))] tracking-tight">
                {introTitle}
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
                {introDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Regulations Section */}
        <section className="w-full py-16 md:py-24 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-[hsl(var(--foreground))] tracking-tight">
              {regulationsTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {regulations.map((regulation, index) => {
                const Icon = regulation.icon;
                return (
                  <Card key={index} className="border-[hsl(var(--border))]">
                    <CardHeader>
                      <div className="w-16 h-16 mb-4 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {regulation.title}
                      </CardTitle>
                      <CardDescription className="text-[hsl(var(--muted-foreground))]">
                        {regulation.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))] tracking-tight">
                {commitmentTitle}
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
                {commitmentDescription}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
