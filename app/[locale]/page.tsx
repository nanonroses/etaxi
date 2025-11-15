import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { BenefitsGrid } from '@/components/home/BenefitsGrid';
import { SafetyFeatures } from '@/components/home/SafetyFeatures';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';
import { getHomePage, getSiteSettings, getAppDownload } from '@/lib/sanity.queries';

export default async function Home() {
  // Fetch data from Sanity CMS
  const homeData = await getHomePage();
  const siteSettings = await getSiteSettings();
  const appDownload = await getAppDownload();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection
          title={homeData?.heroTitle}
          subtitle={homeData?.heroSubtitle}
          primaryCta={siteSettings?.primaryCtaLabel}
          secondaryCta={siteSettings?.secondaryCtaLabel}
        />
        <BenefitsGrid benefits={homeData?.benefits} />
        <SafetyFeatures intro={homeData?.safetyIntro} />
        <DownloadAppCTA
          headline={appDownload?.headline}
          subheadline={appDownload?.subheadline}
          playStoreUrl={appDownload?.playStoreUrl}
          appStoreUrl={appDownload?.appStoreUrl}
        />
      </main>

      <Footer />
    </div>
  );
}
