'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import { m } from 'framer-motion';

export function SafetyComparison() {
  const t = useTranslations('safetyPage.safetyComparison');

  const features = [
    {
      title: t('feature1.title'),
      etaxi: t('feature1.etaxi'),
      others: t('feature1.others'),
    },
    {
      title: t('feature2.title'),
      etaxi: t('feature2.etaxi'),
      others: t('feature2.others'),
    },
    {
      title: t('feature3.title'),
      etaxi: t('feature3.etaxi'),
      others: t('feature3.others'),
    },
    {
      title: t('feature4.title'),
      etaxi: t('feature4.etaxi'),
      others: t('feature4.others'),
    },
    {
      title: t('feature5.title'),
      etaxi: t('feature5.etaxi'),
      others: t('feature5.others'),
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-[#f8f9fa] to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-[#dd1828]/10 rounded-full"
        />
        <m.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-green-500/10 rounded-full"
        />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#dd1828]/10 border border-[#dd1828]/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#dd1828]" />
            <span className="text-sm font-bold text-[#dd1828]">Comparativa Visual</span>
          </m.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Desktop Comparison - Modern Card Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12">
          {/* ETAXI Card */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 shadow-xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <m.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                >
                  <Shield className="w-8 h-8 text-white" />
                </m.div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0C1A2B]">ETAXI</h3>
                  <p className="text-sm text-green-600 font-semibold">100% Legal y Seguro</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 hover:border-green-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <m.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mt-0.5 shadow-md"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </m.div>
                      <div>
                        <h4 className="font-bold text-[#0C1A2B] text-sm mb-1">{feature.title}</h4>
                        <p className="text-sm text-green-700">{feature.etaxi}</p>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Score */}
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-2 p-4 bg-green-500 rounded-2xl"
              >
                <span className="text-white font-bold text-2xl">5/5</span>
                <span className="text-white/80 text-sm">Puntuación de Seguridad</span>
              </m.div>
            </div>
          </m.div>

          {/* Others Card */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200 shadow-xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <m.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg"
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </m.div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0C1A2B]">Apps No Reguladas</h3>
                  <p className="text-sm text-red-600 font-semibold">Riesgos de Seguridad</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-red-100 group opacity-80"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mt-0.5 shadow-md">
                        <X className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0C1A2B] text-sm mb-1">{feature.title}</h4>
                        <p className="text-sm text-red-700">{feature.others}</p>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Score */}
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-2 p-4 bg-red-500 rounded-2xl"
              >
                <span className="text-white font-bold text-2xl">0/5</span>
                <span className="text-white/80 text-sm">Puntuación de Seguridad</span>
              </m.div>
            </div>
          </m.div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {features.map((feature, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
            >
              <h3 className="text-lg font-bold text-[#0C1A2B] mb-4 text-center">
                {feature.title}
              </h3>

              {/* ETAXI */}
              <div className="mb-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      ETAXI
                    </p>
                    <p className="text-sm text-green-700">
                      {feature.etaxi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Others */}
              <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                    <X className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800 mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Apps No Reguladas
                    </p>
                    <p className="text-sm text-red-700">
                      {feature.others}
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <m.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#dd1828] to-[#ff4444] rounded-full shadow-xl cursor-pointer group"
          >
            <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold text-lg">
              La seguridad no es negociable. Elige ETAXI.
            </span>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
