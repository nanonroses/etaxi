'use client';

import { useTranslations } from 'next-intl';
import { User, Smartphone, Car, Shield, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function EcosystemDiagram() {
  const t = useTranslations('howItWorksPage.ecosystem');

  const actors = [
    {
      title: t('passenger.title'),
      icon: User,
      items: t.raw('passenger.actions') as string[],
      color: 'from-[#dd1828] to-[#182b33]',
      bgColor: 'bg-white',
    },
    {
      title: t('platform.title'),
      icon: Smartphone,
      items: t.raw('platform.features') as string[],
      color: 'from-[#fff500] to-[#dd1828]',
      bgColor: 'bg-gradient-to-b from-white to-gray-50',
    },
    {
      title: t('driver.title'),
      icon: Car,
      items: t.raw('driver.actions') as string[],
      color: 'from-[#182b33] to-[#030c13]',
      bgColor: 'bg-white',
    },
    {
      title: t('authority.title'),
      icon: Shield,
      items: t.raw('authority.role') as string[],
      color: 'from-[#596065] to-[#182b33]',
      bgColor: 'bg-gradient-to-b from-white to-gray-50',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Desktop Diagram - 2x2 Grid with Arrows */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 mb-12 max-w-5xl mx-auto">
          {/* Row 1 */}
          <div className="flex items-center gap-8">
            {/* Passenger */}
            <ActorCard {...actors[0]} index={0} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <ArrowRight className="w-10 h-10 text-[#fff500] animate-pulse-slow" />
            </motion.div>
          </div>

          {/* Platform (top right) */}
          <ActorCard {...actors[1]} index={1} />

          {/* Row 2 */}
          {/* Driver (bottom left) */}
          <ActorCard {...actors[2]} index={2} />

          <div className="flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <ArrowRight className="w-10 h-10 text-[#fff500] transform rotate-180 animate-pulse-slow" />
            </motion.div>
            {/* Authority */}
            <ActorCard {...actors[3]} index={3} />
          </div>
        </div>

        {/* Mobile/Tablet Layout - Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {actors.map((actor, index) => (
            <div key={index}>
              <ActorCard {...actor} index={index} />
              {index < actors.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex justify-center my-4"
                >
                  <ArrowRight className="w-8 h-8 text-[#fff500] transform rotate-90 animate-pulse-slow" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Central Message */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-[#fff500] rounded-full shadow-lg">
            <p className="text-[#182b33] font-bold">
              Todo conectado. Todo legal. Todo trazable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ActorCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
  color: string;
  bgColor: string;
  index: number;
}

function ActorCard({ title, icon: Icon, items, color, bgColor, index }: ActorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className={`${bgColor} rounded-2xl p-6 shadow-lg border-2 border-[#596065]/20 hover:border-[#dd1828] hover:shadow-xl transition-all duration-300 flex-1 group`}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#182b33]">
          {title}
        </h3>
      </div>

      {/* Items List */}
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-[#dd1828] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[#596065]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
