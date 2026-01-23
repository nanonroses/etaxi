'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check, Car, TrendingUp, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';

export function ConductorCTA() {
  const t = useTranslations('conductorCta');
  const locale = useLocale();

  const features = [
    {
      icon: Check,
      text: t('features.legal'),
    },
    {
      icon: TrendingUp,
      text: t('features.transparent'),
    },
    {
      icon: Shield,
      text: t('features.support'),
    },
  ];

  const benefits = [
    { icon: Award, label: 'Sin Comisiones Abusivas', value: 'Tarifas Justas' },
    { icon: Shield, label: 'Respaldo Legal Total', value: '100% Regulado' },
    { icon: TrendingUp, label: 'Más Viajes', value: 'Más Ingresos' },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#dd1828] via-[#182b33] to-[#030c13] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fff500] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual Element */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main circle */}
              <div className="w-96 h-96 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-2xl">
                <div className="w-80 h-80 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-64 h-64 rounded-full bg-gradient-to-br from-[#fff500]/30 to-transparent flex items-center justify-center"
                  >
                    <Car className="w-32 h-32 text-white" />
                  </m.div>
                </div>
              </div>

              {/* Floating badges */}
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const positions = [
                  '-top-8 left-1/4',
                  'top-1/2 -right-12',
                  '-bottom-8 left-1/3',
                ];

                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    animate={{ y: [0, -10, 0] }}
                    style={{ animationDelay: `${index * 0.3}s` }}
                    className={`absolute ${positions[index]} bg-white rounded-2xl shadow-xl p-4 border border-gray-100`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{benefit.label}</div>
                        <div className="text-sm font-bold text-[#182b33]">{benefit.value}</div>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </m.div>

          {/* Right: Content */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-white"
          >
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Car className="w-4 h-4 text-[#fff500]" />
              <span className="text-sm font-medium">Únete a ETAXI</span>
            </m.div>

            {/* Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {t('title')}
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Icon className="w-5 h-5 text-[#fff500]" />
                    </div>
                    <span className="text-lg text-white/90">{feature.text}</span>
                  </m.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-4"
            >
              <Link href={`/${locale}/conductores`}>
                <Button
                  size="lg"
                  className="bg-[#fff500] text-[#030c13] hover:bg-[#fff500]/90 min-w-[280px] font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:scale-105 transition-all"
                >
                  {t('button')} →
                </Button>
              </Link>

              <p className="text-sm text-white/70 mt-4">
                Sin costos iniciales. Empieza a ganar hoy.
              </p>
            </m.div>

            {/* Trust badge */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-3 pt-4 text-sm text-white/80"
            >
              <Shield className="w-5 h-5 text-green-400" />
              <span>Más de 500 conductores confían en ETAXI</span>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
