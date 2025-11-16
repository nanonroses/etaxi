import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/common/ContactForm';
import { HelpCircle, AlertCircle, Mail, Phone } from 'lucide-react';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.ayuda.title,
  description: seoConfig.ayuda.description,
  keywords: seoConfig.ayuda.keywords,
  openGraph: {
    title: seoConfig.ayuda.title,
    description: seoConfig.ayuda.description,
    url: 'https://www.etaxi.cl/ayuda',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.ayuda.title,
    description: seoConfig.ayuda.description,
  },
};

export default function AyudaPage() {
  const t = useTranslations('helpPage');

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
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                {t('intro.description')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-12">
                <HelpCircle className="w-8 h-8 text-[hsl(var(--primary))] mr-3" aria-hidden="true" />
                <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                  {t('faq.title')}
                </h2>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-[hsl(var(--border))]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[hsl(var(--foreground))]">
                        {faq.question}
                      </CardTitle>
                      <CardDescription className="text-[hsl(var(--muted-foreground))] mt-2">
                        {faq.answer}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Complaints Section */}
        <section className="w-full py-12 md:py-24 bg-[hsl(var(--muted))]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-[hsl(var(--border))]">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-[hsl(var(--primary))]" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl mb-4">
                    {t('complaints.title')}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {t('complaints.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-w-2xl mx-auto">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-[hsl(var(--foreground))]">
                {t('support.title')}
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                {t('support.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="border-[hsl(var(--border))]">
                  <CardContent className="flex items-center space-x-4 pt-6">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">Email</p>
                      <a
                        href={`mailto:${t('support.email')}`}
                        className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
                      >
                        {t('support.email')}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[hsl(var(--border))]">
                  <CardContent className="flex items-center space-x-4 pt-6">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">Teléfono</p>
                      <a
                        href={`tel:${t('support.phone')}`}
                        className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
                      >
                        {t('support.phone')}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
