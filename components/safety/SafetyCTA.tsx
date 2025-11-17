'use client';

import { useTranslations } from 'next-intl';
import { Download, Shield, MapPin, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SafetyCTA() {
  const t = useTranslations('safetyPage.cta');

  const features = [
    { icon: Check, text: t('features.feature1') },
    { icon: MapPin, text: t('features.feature2') },
    { icon: AlertCircle, text: t('features.feature3') },
    { icon: Shield, text: t('features.feature4') },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#F8D347] blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#F8D347] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[900px] px-4 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F8D347]/20 mb-6 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-[#F8D347]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <Icon className="w-6 h-6 text-[#F8D347] mx-auto mb-2" />
                  <p className="text-sm text-white/90">{feature.text}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link href="/descargar-app">
            <Button
              size="lg"
              className="bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90 min-w-[280px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-6 h-6 mr-2" />
              {t('button')}
            </Button>
          </Link>

          {/* Trust Badge */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              Más de 25,000 usuarios ya viajan seguros con ETAXI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
