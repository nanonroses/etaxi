'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, Car } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { PASSENGER_APP_URLS } from '@/lib/constants';

export function BlogCTA() {
  const locale = useLocale();
  const t = useTranslations('blog');

  return (
    <section className="py-16 bg-gradient-to-br from-[#dd1828] to-[#a01020]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center"
          >
            <Car className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={PASSENGER_APP_URLS.ios}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#dd1828] font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              {t('cta.downloadApp')}
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/como-funciona`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                {t('cta.learnMore')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
