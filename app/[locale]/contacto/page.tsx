import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/common/ContactForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.contacto.title,
  description: seoConfig.contacto.description,
  keywords: seoConfig.contacto.keywords,
  openGraph: {
    title: seoConfig.contacto.title,
    description: seoConfig.contacto.description,
    url: 'https://www.etaxi.cl/contacto',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.contacto.title,
    description: seoConfig.contacto.description,
  },
};

export default function ContactoPage() {
  const t = useTranslations('contactPage');

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

        {/* Contact Form and Info Section */}
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="border-[hsl(var(--border))]">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-4">
                      {t('info.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Email</p>
                        <a
                          href={`mailto:${t('info.email')}`}
                          className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          {t('info.email')}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Teléfono</p>
                        <a
                          href={`tel:${t('info.phone')}`}
                          className="text-[hsl(var(--foreground))] font-medium hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          {t('info.phone')}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-[hsl(var(--border))]">
                  <CardHeader>
                    <CardTitle className="text-xl mb-4">
                      {t('info.social.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <a
                        href="https://facebook.com/etaxi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center hover:bg-[hsl(var(--primary))]/20 transition-colors"
                        aria-label={t('info.social.facebook')}
                      >
                        <Facebook className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </a>
                      <a
                        href="https://twitter.com/etaxi_cl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center hover:bg-[hsl(var(--primary))]/20 transition-colors"
                        aria-label={t('info.social.twitter')}
                      >
                        <Twitter className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
                      </a>
                      <a
                        href="https://instagram.com/etaxi_cl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center hover:bg-[hsl(var(--primary))]/20 transition-colors"
                        aria-label={t('info.social.instagram')}
                      >
                        <Instagram className="w-6 h-6 text-[hsl(var(--primary))]" aria-hidden="true" />
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
