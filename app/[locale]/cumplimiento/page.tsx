import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileCheck, Scale, MapPin, IdCard } from 'lucide-react';

export default function CumplimientoPage() {
  const t = useTranslations('compliancePage');

  const regulations = [
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

        {/* Regulations Section */}
        <section className="w-full py-12 md:py-24 bg-[hsl(var(--muted))]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--foreground))]">
              {t('regulations.title')}
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
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                {t('commitment.title')}
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                {t('commitment.description')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
