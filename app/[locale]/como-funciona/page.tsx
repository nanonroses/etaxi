'use client';

import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FlowSection } from '@/components/how-it-works/FlowSection';
import { EcosystemDiagram } from '@/components/how-it-works/EcosystemDiagram';
import { TechStack } from '@/components/how-it-works/TechStack';
import { VideoDemo } from '@/components/how-it-works/VideoDemo';
import { WhyItWorks } from '@/components/how-it-works/WhyItWorks';
import { DualCTA } from '@/components/how-it-works/DualCTA';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComoFuncionaPage() {
  const t = useTranslations('howItWorksPage');
  const tPassenger = useTranslations('howItWorksPage.passengerFlow');
  const tDriver = useTranslations('howItWorksPage.driverFlow');
  const tBusiness = useTranslations('howItWorksPage.businessFlow');

  // Prepare steps for each flow
  const passengerSteps = [
    {
      number: tPassenger('step1.number'),
      title: tPassenger('step1.title'),
      description: tPassenger('step1.description'),
      icon: tPassenger('step1.icon'),
    },
    {
      number: tPassenger('step2.number'),
      title: tPassenger('step2.title'),
      description: tPassenger('step2.description'),
      icon: tPassenger('step2.icon'),
    },
    {
      number: tPassenger('step3.number'),
      title: tPassenger('step3.title'),
      description: tPassenger('step3.description'),
      icon: tPassenger('step3.icon'),
    },
    {
      number: tPassenger('step4.number'),
      title: tPassenger('step4.title'),
      description: tPassenger('step4.description'),
      icon: tPassenger('step4.icon'),
    },
    {
      number: tPassenger('step5.number'),
      title: tPassenger('step5.title'),
      description: tPassenger('step5.description'),
      icon: tPassenger('step5.icon'),
    },
    {
      number: tPassenger('step6.number'),
      title: tPassenger('step6.title'),
      description: tPassenger('step6.description'),
      icon: tPassenger('step6.icon'),
    },
  ];

  const driverSteps = [
    {
      number: tDriver('step1.number'),
      title: tDriver('step1.title'),
      description: tDriver('step1.description'),
      icon: tDriver('step1.icon'),
    },
    {
      number: tDriver('step2.number'),
      title: tDriver('step2.title'),
      description: tDriver('step2.description'),
      icon: tDriver('step2.icon'),
    },
    {
      number: tDriver('step3.number'),
      title: tDriver('step3.title'),
      description: tDriver('step3.description'),
      icon: tDriver('step3.icon'),
    },
    {
      number: tDriver('step4.number'),
      title: tDriver('step4.title'),
      description: tDriver('step4.description'),
      icon: tDriver('step4.icon'),
    },
    {
      number: tDriver('step5.number'),
      title: tDriver('step5.title'),
      description: tDriver('step5.description'),
      icon: tDriver('step5.icon'),
    },
    {
      number: tDriver('step6.number'),
      title: tDriver('step6.title'),
      description: tDriver('step6.description'),
      icon: tDriver('step6.icon'),
    },
  ];

  const businessSteps = [
    {
      number: tBusiness('step1.number'),
      title: tBusiness('step1.title'),
      description: tBusiness('step1.description'),
      icon: tBusiness('step1.icon'),
    },
    {
      number: tBusiness('step2.number'),
      title: tBusiness('step2.title'),
      description: tBusiness('step2.description'),
      icon: tBusiness('step2.icon'),
    },
    {
      number: tBusiness('step3.number'),
      title: tBusiness('step3.title'),
      description: tBusiness('step3.description'),
      icon: tBusiness('step3.icon'),
    },
    {
      number: tBusiness('step4.number'),
      title: tBusiness('step4.title'),
      description: tBusiness('step4.description'),
      icon: tBusiness('step4.icon'),
    },
    {
      number: tBusiness('step5.number'),
      title: tBusiness('step5.title'),
      description: tBusiness('step5.description'),
      icon: tBusiness('step5.icon'),
    },
    {
      number: tBusiness('step6.number'),
      title: tBusiness('step6.title'),
      description: tBusiness('step6.description'),
      icon: tBusiness('step6.icon'),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto max-w-[1200px] px-4 py-4">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] animate-gradient-slow" />

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#fff500] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#dd1828] blur-[140px] opacity-30" />
          </div>

          <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-[#fff500]/20 rounded-full mb-4">
                <p className="text-sm font-semibold text-[#fff500]">
                  {t('hero.badge')}
                </p>
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#dd1828]/15 mb-6 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <Info className="w-10 h-10 text-[#fff500]" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Passenger Flow */}
        <FlowSection
          title={tPassenger('title')}
          subtitle={tPassenger('subtitle')}
          steps={passengerSteps}
          bgColor="bg-white"
          accentColor="from-[#dd1828] to-[#182b33]"
        />

        {/* Driver Flow */}
        <FlowSection
          title={tDriver('title')}
          subtitle={tDriver('subtitle')}
          steps={driverSteps}
          bgColor="bg-[#030c13]"
          accentColor="from-[#fff500] to-[#dd1828]"
        />

        {/* Business Flow */}
        <FlowSection
          title={tBusiness('title')}
          subtitle={tBusiness('subtitle')}
          steps={businessSteps}
          bgColor="bg-white"
          accentColor="from-[#182b33] to-[#030c13]"
        />

        {/* Ecosystem Diagram */}
        <EcosystemDiagram />

        {/* Tech Stack */}
        <TechStack />

        {/* Video Demo */}
        <VideoDemo />

        {/* Why It Works */}
        <WhyItWorks />

        {/* Dual CTA */}
        <DualCTA />
      </main>

      <Footer />
    </div>
  );
}
