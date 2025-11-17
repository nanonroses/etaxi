'use client';

import { useTranslations } from 'next-intl';
import { Check, AlertTriangle, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyETAXI() {
  const t = useTranslations('whyEtaxi');

  const comparisons = [
    {
      category: 'Legalidad',
      them: t('vsCompetition.feature1.them'),
      us: t('vsCompetition.feature1.us'),
      icon: Shield,
    },
    {
      category: 'Tarifas',
      them: t('vsCompetition.feature2.them'),
      us: t('vsCompetition.feature2.us'),
      icon: AlertTriangle,
    },
    {
      category: 'Conductores',
      them: t('vsCompetition.feature3.them'),
      us: t('vsCompetition.feature3.us'),
      icon: Award,
    },
    {
      category: 'Seguridad',
      them: t('vsCompetition.feature4.them'),
      us: t('vsCompetition.feature4.us'),
      icon: Shield,
    },
    {
      category: 'Soporte',
      them: t('vsCompetition.feature5.them'),
      us: t('vsCompetition.feature5.us'),
      icon: Check,
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#dd1828]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#182b33]/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto max-w-[1100px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/10 text-[#182b33] font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm">La diferencia ETAXI</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {comparisons.slice(0, 3).map((comparison, index) => {
            const Icon = comparison.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#dd1828]/30 transition-all group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[#182b33] text-lg">
                    {comparison.category}
                  </h3>
                </div>

                {/* Others */}
                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">
                      <span className="font-semibold">Otros:</span> {comparison.them}
                    </p>
                  </div>
                </div>

                {/* ETAXI */}
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">ETAXI:</span> {comparison.us}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full-width comparison table for remaining items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="grid grid-cols-2 bg-gradient-to-r from-[#dd1828] to-[#182b33] text-white">
            <div className="py-6 px-8 text-center border-r border-white/10">
              <p className="text-sm font-medium opacity-90 mb-2">
                {t('vsCompetition.title')}
              </p>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-400">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <div className="py-6 px-8 text-center">
              <p className="text-sm font-medium opacity-90 mb-2">ETAXI</p>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-400">
                <Check className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.slice(3).map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className={`grid grid-cols-2 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } border-b last:border-b-0 border-gray-200 hover:bg-gray-100 transition-colors`}
            >
              {/* Them */}
              <div className="py-6 px-8 border-r border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {comparison.them}
                  </p>
                </div>
              </div>

              {/* Us */}
              <div className="py-6 px-8 bg-gradient-to-r from-transparent to-green-50/30">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-[#182b33] font-semibold leading-relaxed">
                    {comparison.us}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-[#182b33]">ETAXI:</span> Taxis 100% legales, regulados y seguros
          </p>
        </motion.div>
      </div>
    </section>
  );
}
