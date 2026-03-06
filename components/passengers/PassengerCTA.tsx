'use client';

import { useTranslations } from 'next-intl';
import { Download, Smartphone, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PassengerCTA() {
  const t = useTranslations('passengerPage.cta');

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
            <Smartphone className="w-10 h-10 text-[#F8D347]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <Link href="/descargar-app">
              <Button
                size="lg"
                className="bg-[#F8D347] text-[#0C1A2B] hover:bg-[#F8D347]/90 min-w-[280px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-6 h-6 mr-2" />
                {t('button')}
              </Button>
            </Link>
          </div>

          {/* Available text */}
          <p className="text-white/60 mb-8 text-sm">
            {t('available')}
          </p>

          {/* Features */}
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-center text-left sm:text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#F8D347] flex-shrink-0" />
              <span className="text-white/80 text-sm">100% Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#F8D347] flex-shrink-0" />
              <span className="text-white/80 text-sm">Sin Suscripciones</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#F8D347] flex-shrink-0" />
              <span className="text-white/80 text-sm">100% Legal</span>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm italic">
              {t('note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
