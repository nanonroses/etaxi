'use client';

import { useTranslations } from 'next-intl';
import { Download, Car } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function DualCTA() {
  const t = useTranslations('howItWorksPage.cta');

  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#dd1828] via-[#182b33] to-[#030c13] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#fff500] blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#fff500] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Passenger CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-[#fff500] transition-all duration-300"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#dd1828]/20 mb-6 backdrop-blur-sm">
                <Download className="w-8 h-8 text-[#fff500]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('passenger.title')}
              </h3>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('passenger.description')}
              </p>

              {/* Button */}
              <Link href="/descargar-app">
                <Button
                  size="lg"
                  className="bg-[#fff500] text-[#030c13] hover:bg-[#fff500]/90 hover:border-[#dd1828] hover:shadow-[0_0_20px_rgba(221,24,40,0.5)] border-2 border-transparent w-full md:w-auto min-w-[250px] text-lg h-12 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t('passenger.button')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Driver CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-[#fff500] transition-all duration-300"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fff500]/20 mb-6 backdrop-blur-sm">
                <Car className="w-8 h-8 text-[#fff500]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t('driver.title')}
              </h3>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {t('driver.description')}
              </p>

              {/* Button */}
              <Link href="/conductores">
                <Button
                  size="lg"
                  className="bg-transparent text-[#fff500] border-2 border-[#fff500] hover:bg-[#fff500] hover:text-[#030c13] w-full md:w-auto min-w-[250px] text-lg h-12 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Car className="w-5 h-5 mr-2" />
                  {t('driver.button')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
