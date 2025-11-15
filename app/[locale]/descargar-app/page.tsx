import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function DescargarAppPage() {
  const t = useTranslations('downloadPage');

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

        {/* Download CTA */}
        <DownloadAppCTA />

        {/* Why Use ETAXI Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--foreground))]">
              {t('whyUse.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-[hsl(var(--border))]">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-[hsl(var(--muted-foreground))]">
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

        {/* App Screenshots Placeholder */}
        <section className="w-full py-12 md:py-24 bg-[hsl(var(--muted))]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--foreground))]">
              {t('screenshots.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <div className="aspect-[9/16] bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--accent))]/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--primary))]/20 flex items-center justify-center">
                        <span className="text-2xl text-[hsl(var(--primary))]">📱</span>
                      </div>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Screenshot {item}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(var(--foreground))]">
              {t('faq.title')}
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-[hsl(var(--border))]">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[hsl(var(--muted-foreground))]">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
