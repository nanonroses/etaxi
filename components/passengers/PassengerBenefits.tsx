'use client';

import { useTranslations } from 'next-intl';
import { Shield, DollarSign, MapPin, Clock, FileCheck, Users } from 'lucide-react';

export function PassengerBenefits() {
  const t = useTranslations('passengerPage.benefits');

  const benefits = [
    {
      icon: Users,
      title: t('benefit1.title'),
      description: t('benefit1.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: DollarSign,
      title: t('benefit2.title'),
      description: t('benefit2.description'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: t('benefit3.title'),
      description: t('benefit3.description'),
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: MapPin,
      title: t('benefit4.title'),
      description: t('benefit4.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileCheck,
      title: t('benefit5.title'),
      description: t('benefit5.description'),
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Clock,
      title: t('benefit6.title'),
      description: t('benefit6.description'),
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
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
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347]"
              >
                <div className="flex flex-col items-start">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0C1A2B] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
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
