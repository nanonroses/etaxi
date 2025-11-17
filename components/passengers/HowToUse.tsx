'use client';

import { useTranslations } from 'next-intl';
import { Download, MapPin, CheckCircle, Eye, Shield, Star } from 'lucide-react';

export function HowToUse() {
  const t = useTranslations('passengerPage.howToUse');

  const steps = [
    {
      number: t('step1.number'),
      icon: Download,
      title: t('step1.title'),
      description: t('step1.description'),
      detail: t('step1.detail'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: t('step2.number'),
      icon: MapPin,
      title: t('step2.title'),
      description: t('step2.description'),
      detail: t('step2.detail'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: t('step3.number'),
      icon: CheckCircle,
      title: t('step3.title'),
      description: t('step3.description'),
      detail: t('step3.detail'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: t('step4.number'),
      icon: Eye,
      title: t('step4.title'),
      description: t('step4.description'),
      detail: t('step4.detail'),
      color: 'from-orange-500 to-red-500',
    },
    {
      number: t('step5.number'),
      icon: Shield,
      title: t('step5.title'),
      description: t('step5.description'),
      detail: t('step5.detail'),
      color: 'from-red-500 to-pink-500',
    },
    {
      number: t('step6.number'),
      icon: Star,
      title: t('step6.title'),
      description: t('step6.description'),
      detail: t('step6.detail'),
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
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
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347]"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#F8D347] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-[#0C1A2B]">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md mt-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0C1A2B] mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {step.description}
                </p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
