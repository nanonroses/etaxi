'use client';

import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Shield, Newspaper } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BlogHero() {
  const t = useTranslations('blog');

  const stats = [
    { icon: Newspaper, value: '6+', label: t('hero.stats.articles') },
    { icon: BookOpen, value: '5', label: t('hero.stats.categories') },
    { icon: TrendingUp, value: '2025', label: t('hero.stats.updated') },
    { icon: Shield, value: '100%', label: t('hero.stats.verified') },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] py-20 lg:py-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#dd1828] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fff500] rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/20 border border-[#dd1828]/30 mb-6"
          >
            <Newspaper className="w-4 h-4 text-[#dd1828]" />
            <span className="text-sm font-medium text-white">{t('hero.badge')}</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('hero.title.part1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dd1828] to-[#fff500]">
              {t('hero.title.highlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            {t('hero.subtitle')}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="w-6 h-6 text-[#fff500] mb-2" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
