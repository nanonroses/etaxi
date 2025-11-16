import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, CheckCircle, Shield } from 'lucide-react';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.pedirTaxi.title,
  description: seoConfig.pedirTaxi.description,
  keywords: seoConfig.pedirTaxi.keywords,
  openGraph: {
    title: seoConfig.pedirTaxi.title,
    description: seoConfig.pedirTaxi.description,
    url: 'https://www.etaxi.cl/pedir-taxi',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.pedirTaxi.title,
    description: seoConfig.pedirTaxi.description,
  },
};

export default function PedirTaxiPage() {
  const t = useTranslations('requestTaxiPage');

  const steps = [
    {
      icon: MapPin,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
    },
    {
      icon: Shield,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
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
                {t('hero.title')}
              </h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Request Form Section */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {t('form.originLabel')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Origin Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="origin"
                      className="text-sm font-medium text-[hsl(var(--foreground))]"
                    >
                      {t('form.originLabel')}
                    </label>
                    <Input
                      id="origin"
                      type="text"
                      placeholder={t('form.originPlaceholder')}
                      className="w-full"
                      aria-label={t('form.originLabel')}
                    />
                  </div>

                  {/* Destination Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="destination"
                      className="text-sm font-medium text-[hsl(var(--foreground))]"
                    >
                      {t('form.destinationLabel')}
                    </label>
                    <Input
                      id="destination"
                      type="text"
                      placeholder={t('form.destinationPlaceholder')}
                      className="w-full"
                      aria-label={t('form.destinationLabel')}
                    />
                  </div>

                  {/* Passengers Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="passengers"
                      className="text-sm font-medium text-[hsl(var(--foreground))]"
                    >
                      {t('form.passengersLabel')}
                    </label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="4"
                      placeholder={t('form.passengersPlaceholder')}
                      className="w-full"
                      aria-label={t('form.passengersLabel')}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="default"
                    className="w-full"
                    type="button"
                  >
                    {t('form.submitButton')}
                  </Button>

                  {/* Note */}
                  <p className="text-sm text-[hsl(var(--muted-foreground))] text-center mt-4">
                    {t('form.note')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-[1200px] px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-[hsl(var(--foreground))] tracking-tight">
              {t('howItWorks.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="border-[hsl(var(--border))] text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-[hsl(var(--muted-foreground))]">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <DownloadAppCTA />
      </main>

      <Footer />
    </div>
  );
}
