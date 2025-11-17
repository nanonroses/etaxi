'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Phone, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function B2BCTA() {
  const t = useTranslations('businessPage.cta');

  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#dd1828] via-[#182b33] to-[#030c13] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#fff500] blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#fff500] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-[#fff500] text-[#182b33] hover:bg-[#fff500]/90 min-w-[280px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold"
            >
              <Calendar className="w-6 h-6 mr-2" />
              {t('demo')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#fff500] text-[#fff500] hover:bg-[#fff500]/10 min-w-[280px] text-lg h-14 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-6 h-6 mr-2" />
              {t('meeting')}
            </Button>
          </div>

          {/* Phone CTA */}
          <div className="mb-8">
            <a
              href="tel:+56912345678"
              className="inline-flex items-center gap-2 text-[#fff500] hover:text-[#fff500]/80 transition-colors font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('phone')}
            </a>
          </div>

          {/* Trust Badge */}
          <div className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-white/80 text-sm">
              {t('trustBadge')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DualCTA() {
  const t = useTranslations('businessPage.finalCTA');

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enterprise CTA */}
          <div className="bg-gradient-to-br from-[#dd1828] to-[#182b33] rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#fff500] blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#fff500]/20 flex items-center justify-center mb-6 backdrop-blur-sm border-2 border-[#fff500]/30">
                <Building2 className="w-8 h-8 text-[#fff500]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('enterprise.title')}
              </h3>

              <p className="text-white/90 mb-6 leading-relaxed">
                {t('enterprise.description')}
              </p>

              <Button
                size="lg"
                className="bg-[#fff500] text-[#182b33] hover:bg-[#fff500]/90 w-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {t('enterprise.button')}
              </Button>
            </div>
          </div>

          {/* Guild CTA */}
          <div className="bg-gradient-to-br from-[#182b33] to-[#030c13] rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300 border-2 border-[#596065]/30">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#fff500] blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#fff500]/20 flex items-center justify-center mb-6 backdrop-blur-sm border-2 border-[#fff500]/30">
                <Users className="w-8 h-8 text-[#fff500]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('guild.title')}
              </h3>

              <p className="text-white/90 mb-6 leading-relaxed">
                {t('guild.description')}
              </p>

              <Button
                size="lg"
                className="bg-transparent border-2 border-[#fff500] text-[#fff500] hover:bg-[#fff500]/10 w-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {t('guild.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
