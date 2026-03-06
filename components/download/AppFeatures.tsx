'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Navigation, History, ThumbsUp, AlertCircle, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function FeatureCard({
  icon: Icon,
  title,
  description,
  index
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#F8D347] group relative overflow-hidden transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8D347]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F8D347] via-[#F8D347]/50 to-[#F8D347] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F8D347] to-[#F8D347]/70 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden">
            {/* Icon shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Icon className="w-7 h-7 text-[#0C1A2B] relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#0C1A2B] mb-2 group-hover:text-[#F8D347] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F8D347]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

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
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] via-white to-[hsl(var(--muted))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F8D347] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-[#F8D347]/10 rounded-full mb-4 border border-[#F8D347]/20">
            <p className="text-sm font-semibold text-[#0C1A2B]">
              Características Principales
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0C1A2B] mb-4 bg-clip-text">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
