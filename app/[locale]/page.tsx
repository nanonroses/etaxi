import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { BenefitsGrid } from '@/components/home/BenefitsGrid';
import { SafetyFeatures } from '@/components/home/SafetyFeatures';
import { DownloadAppCTA } from '@/components/home/DownloadAppCTA';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <BenefitsGrid />
        <SafetyFeatures />
        <DownloadAppCTA />
      </main>

      <Footer />
    </div>
  );
}
