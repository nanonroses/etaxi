'use client';

import { useTranslations } from 'next-intl';
import { Smartphone, Star, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DownloadAppCTAProps {
  headline?: string;
  subheadline?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export function DownloadAppCTA({ headline, subheadline, playStoreUrl, appStoreUrl }: DownloadAppCTAProps) {
  const t = useTranslations('download');

  const title = headline || t('title');
  const description = subheadline || t('description');

  return (
    <section className="w-full py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#dd1828]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#182b33]/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/10 text-[#182b33] font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Descarga Gratis</span>
            </motion.div>

            {/* Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#182b33] mb-4">
                {title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                'Reserva en segundos',
                'Pago seguro integrado',
                'Seguimiento en tiempo real',
                'Historial completo de viajes',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#dd1828] to-[#182b33] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={playStoreUrl || '#'}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#dd1828] text-white rounded-xl font-semibold hover:bg-[#182b33] transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Disponible en</div>
                  <div className="text-base font-bold">Google Play</div>
                </div>
              </a>

              <a
                href={appStoreUrl || '#'}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-[#182b33] text-[#182b33] rounded-xl font-semibold hover:bg-[#182b33] hover:text-white transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">Descargar en</div>
                  <div className="text-base font-bold">App Store</div>
                </div>
              </a>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.8 / 5.0 - Más de 15,000 descargas</span>
            </motion.div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Phone frame */}
              <div className="relative">
                <div className="w-full aspect-[9/16] bg-gradient-to-br from-[#dd1828] to-[#182b33] rounded-[3rem] shadow-2xl p-3 border-8 border-gray-950">
                  {/* Screen content placeholder */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] flex items-center justify-center overflow-hidden relative">
                    <Image
                      src="/images/placeholders/Screen Etaxi Chile.webp"
                      alt="ETAXI Chile App"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <div className="text-left">
                      <div className="text-xl font-bold text-[#182b33]">4.8</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
