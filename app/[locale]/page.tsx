import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { AirportCTA } from '@/components/home/AirportCTA';
import { BenefitsGrid } from '@/components/home/BenefitsGrid';
import { MinisterioValidation } from '@/components/home/MinisterioValidation';
import { WhyETAXI } from '@/components/home/WhyETAXI';
import { SafetyFeatures } from '@/components/home/SafetyFeatures';
import { AppPreview } from '@/components/home/AppPreview';
import { ConductorCTA } from '@/components/home/ConductorCTA';
import { Testimonials } from '@/components/home/Testimonials';
import { StructuredData } from '@/components/seo/StructuredData';
import { getHomePage, getSiteSettings, getAppDownload } from '@/lib/sanity.queries';
import { seoConfig } from '@/app/seo.config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  keywords: seoConfig.home.keywords,
  alternates: {
    canonical: 'https://www.etaxi.cl/es',
    languages: {
      'es-CL': 'https://www.etaxi.cl/es',
      'en-US': 'https://www.etaxi.cl/en',
    },
  },
  openGraph: {
    title: seoConfig.home.title,
    description: seoConfig.home.description,
    url: 'https://www.etaxi.cl/',
    siteName: 'ETAXI',
    type: 'website',
    locale: 'es_CL',
    images: [
      {
        url: 'https://www.etaxi.cl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ETAXI - Taxis 100% Legales y Regulados en Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.home.title,
    description: seoConfig.home.description,
  },
};

export default async function Home() {
  // Fetch data from Sanity CMS
  const homeData = await getHomePage();
  const siteSettings = await getSiteSettings();
  const appDownload = await getAppDownload();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Schema.org Structured Data */}
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="localBusiness" />

      <Navbar />

      <main className="flex-1">
        <HeroSection
          title={homeData?.heroTitle}
          subtitle={homeData?.heroSubtitle}
          primaryCta={siteSettings?.primaryCtaLabel}
          secondaryCta={siteSettings?.secondaryCtaLabel}
        />
        <HowItWorks />
        <AirportCTA />
        <BenefitsGrid benefits={homeData?.benefits} />
        <MinisterioValidation />
        <WhyETAXI />
        <SafetyFeatures intro={homeData?.safetyIntro} />
        <AppPreview />
        <Testimonials />
        <ConductorCTA />
      </main>

      <Footer />
    </div>
  );
}
