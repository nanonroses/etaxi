'use client';

import { useTranslations } from 'next-intl';
import { Smartphone, Server, Zap, MapPin, Lock, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export function TechStack() {
  const t = useTranslations('howItWorksPage.techStack');

  const features = [
    {
      icon: Smartphone,
      title: t('feature1.title'),
      description: t('feature1.description'),
      color: 'from-[#dd1828] to-[#182b33]',
    },
    {
      icon: Server,
      title: t('feature2.title'),
      description: t('feature2.description'),
      color: 'from-[#182b33] to-[#030c13]',
    },
    {
      icon: Zap,
      title: t('feature3.title'),
      description: t('feature3.description'),
      color: 'from-[#fff500] to-[#dd1828]',
    },
    {
      icon: MapPin,
      title: t('feature4.title'),
      description: t('feature4.description'),
      color: 'from-[#596065] to-[#182b33]',
    },
    {
      icon: Lock,
      title: t('feature5.title'),
      description: t('feature5.description'),
      color: 'from-[#dd1828] to-[#596065]',
    },
    {
      icon: LayoutDashboard,
      title: t('feature6.title'),
      description: t('feature6.description'),
      color: 'from-[#182b33] to-[#596065]',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#030c13] to-[#182b33] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#fff500] blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#dd1828] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                className="bg-[#182b33] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#596065]/20 hover:border-[#dd1828] hover:-translate-y-1 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
