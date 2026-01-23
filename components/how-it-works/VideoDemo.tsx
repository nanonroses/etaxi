'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { m } from 'framer-motion';

export function VideoDemo() {
  const t = useTranslations('howItWorksPage.videoDemo');

  const features = [
    t('features.feature1'),
    t('features.feature2'),
    t('features.feature3'),
    t('features.feature4'),
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1000px] px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Video Container */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#596065]/30 hover:border-[#dd1828]/50 transition-colors duration-500"
        >
          {/* Aspect Ratio Container 16:9 */}
          <div className="aspect-video relative">
            {/* YouTube Embed */}
            <iframe
              src="https://www.youtube.com/embed/P5nw3HH7ANA"
              title="ETAXI - Cómo Funciona"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </m.div>

        {/* Features List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-md border border-[#596065]/20 hover:border-[#dd1828] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#dd1828]/10 flex items-center justify-center group-hover:bg-[#dd1828] transition-colors duration-300">
                <Check className="w-5 h-5 text-[#dd1828] group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-[#182b33] font-medium">{feature}</span>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
