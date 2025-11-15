import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SafetyFeatures } from '@/components/home/SafetyFeatures';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Activity, Users, FileCheck } from 'lucide-react';

export default function SeguridadPage() {
  const t = useTranslations('safetyPage');

  const securityFeatures = [
    {
      icon: Shield,
      title: t('features.panic.title'),
      description: t('features.panic.description'),
    },
    {
      icon: Activity,
      title: t('features.traceability.title'),
      description: t('features.traceability.description'),
    },
    {
      icon: Users,
      title: t('features.regulatedDrivers.title'),
      description: t('features.regulatedDrivers.description'),
    },
    {
      icon: FileCheck,
      title: t('features.insurance.title'),
      description: t('features.insurance.description'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[hsl(var(--foreground))]">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-[hsl(var(--muted-foreground))] md:text-2xl">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                {t('intro.title')}
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                {t('intro.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features from Home (reused) */}
        <SafetyFeatures />

        {/* Detailed Security Features */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-[hsl(var(--border))]">
                    <CardHeader>
                      <div className="w-16 h-16 mb-4 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-[hsl(var(--muted-foreground))]">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
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
