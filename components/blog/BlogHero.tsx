'use client';

import { m } from 'framer-motion';
import { BookOpen, TrendingUp, Shield, Newspaper, Zap } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const TICKER_ES = [
  'Ley Uber sin registro digital: el riesgo para las apps',
  'ETAXI opera sin incertidumbre regulatoria',
  'InDrive: 900.000 descargas en Chile durante 2025',
  'Alza del transporte público en Santiago desde febrero 2026',
  'Nuevo gobierno y Ley 21.553: qué cambiará',
  'Uber lanza Zonas de Alerta para conductores',
  'Taxis regulados: ventajas reales frente a las apps',
];

const TICKER_EN = [
  'Uber Law without digital registry: risk for apps',
  'ETAXI operates without regulatory uncertainty',
  'InDrive: 900,000 downloads in Chile during 2025',
  'Santiago public transport fare hike from February 2026',
  'New government and Law 21.553: what will change',
  'Uber launches Alert Zones for drivers',
  'Regulated taxis: real advantages over apps',
];

export function BlogHero() {
  const t = useTranslations('blog');
  const locale = useLocale();

  const tickerItems = locale === 'es' ? TICKER_ES : TICKER_EN;
  const repeatedTicker = [...tickerItems, ...tickerItems]; // Duplicate for seamless loop

  const stats = [
    { icon: Newspaper, value: '16+', label: t('hero.stats.articles') },
    { icon: BookOpen, value: '5', label: t('hero.stats.categories') },
    { icon: TrendingUp, value: '2026', label: t('hero.stats.updated') },
    { icon: Shield, value: '100%', label: t('hero.stats.verified') },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#182b33] via-[#030c13] to-[#182b33] pt-20 lg:pt-28 pb-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#dd1828] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#fff500] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dd1828]/20 border border-[#dd1828]/30 mb-6"
          >
            <Newspaper className="w-4 h-4 text-[#dd1828]" />
            <span className="text-sm font-medium text-white">{t('hero.badge')}</span>
          </m.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
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
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <stat.icon className="w-6 h-6 text-[#fff500] mb-2" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </m.div>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* News ticker strip */}
      <div className="relative border-t border-white/10 bg-[#dd1828]/90 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center">
          {/* Static label */}
          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#dd1828] border-r border-white/20 z-10">
            <Zap className="w-4 h-4 text-white" fill="currentColor" />
            <span className="text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
              {locale === 'es' ? 'En vivo' : 'Live'}
            </span>
          </div>

          {/* Scrolling ticker */}
          <div className="overflow-hidden flex-1 py-3">
            <m.div
              className="flex gap-0 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {repeatedTicker.map((item, i) => (
                <span key={i} className="inline-flex items-center text-white text-sm font-medium">
                  <span className="mx-6 text-white/50">◆</span>
                  {item}
                </span>
              ))}
            </m.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
