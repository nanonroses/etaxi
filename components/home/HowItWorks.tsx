'use client';

import { useTranslations } from 'next-intl';
import { Smartphone, Search, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: Smartphone,
      number: '1',
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      icon: Search,
      number: '2',
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      icon: Shield,
      number: '3',
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Number Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center font-bold text-2xl text-white shadow-xl z-10 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center mb-8 mt-10 shadow-2xl group-hover:shadow-[#dd1828]/50"
                >
                  <Icon className="w-14 h-14 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-[#182b33] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {step.description}
                </p>

                {/* Connector Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-8 lg:-right-12">
                    <motion.svg
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12H58M58 12L48 2M58 12L48 22"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="12" x2="58" y2="12">
                          <stop offset="0%" stopColor="#dd1828" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#dd1828" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm">
            Simple, seguro y 100% regulado
          </p>
        </motion.div>
      </div>
    </section>
  );
}
