'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Navigation, History, ThumbsUp, AlertCircle, User } from 'lucide-react';

export function AppFeatures() {
  const t = useTranslations('downloadPage.appFeatures');

  const features = [
    {
      icon: MapPin,
      title: t('feature1.title'),
      description: t('feature1.description'),
    },
    {
      icon: Navigation,
      title: t('feature2.title'),
      description: t('feature2.description'),
    },
    {
      icon: History,
      title: t('feature3.title'),
      description: t('feature3.description'),
    },
    {
      icon: ThumbsUp,
      title: t('feature4.title'),
      description: t('feature4.description'),
    },
    {
      icon: AlertCircle,
      title: t('feature5.title'),
      description: t('feature5.description'),
    },
    {
      icon: User,
      title: t('feature6.title'),
      description: t('feature6.description'),
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F8D347] to-[#F8D347]/70 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#0C1A2B]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0C1A2B] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
