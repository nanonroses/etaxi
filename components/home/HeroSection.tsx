'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Car, Users } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  // Use CMS data if available, otherwise fallback to translations
  const heroTitle = title || t('title');
  const heroSubtitle = subtitle || t('subtitle');
  const primaryCtaLabel = primaryCta || t('ctaPrimary');
  const secondaryCtaLabel = secondaryCta || t('ctaSecondary');

  // Stats data
  const stats = [
    { icon: Car, value: '500+', label: 'Conductores Certificados' },
    { icon: CheckCircle, value: '50,000+', label: 'Viajes Seguros' },
    { icon: Users, value: '4.8★', label: 'Rating Usuarios' },
    { icon: Shield, value: '100%', label: 'Regulados' },
  ];

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#dd1828] via-[#182b33] to-[#030c13]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fff500] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Diagonal overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#dd1828]/90 to-transparent" />

      <div className="container relative mx-auto max-w-7xl px-4 py-20 pb-32 md:pb-40 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8 text-white z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Shield className="w-4 h-4 text-[#fff500]" />
              <span className="text-sm font-medium">100% Taxis Regulados - Ley 21.553</span>
            </motion.div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl">
                {heroSubtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href={`/${locale}/descargar-app`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px] bg-[#fff500] text-[#030c13] hover:bg-[#fff500]/90 shadow-2xl shadow-[#fff500]/20 text-lg font-semibold px-8 py-6 rounded-xl transition-all hover:scale-105"
                >
                  {primaryCtaLabel}
                </Button>
              </Link>
              <Link href={`/${locale}/conductores`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-w-[220px] border-2 border-white text-white hover:bg-white hover:text-[#dd1828] text-lg font-semibold px-8 py-6 rounded-xl transition-all hover:scale-105"
                >
                  {secondaryCtaLabel}
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-6 pt-6 text-sm text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Seguridad Certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Tarifas Transparentes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Illustration/Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Placeholder for taxi illustration */}
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Glass morphism card with mockup */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-12">
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/images/placeholders/eTaxi Multiplataforma.webp"
                    alt="ETAXI - Plataforma Multiplataforma"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <Shield className="w-12 h-12 text-[#fff500]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
