'use client';

import { useTranslations } from 'next-intl';
import { ClipboardCheck, FileSearch, GraduationCap, Rocket } from 'lucide-react';

export function OnboardingProcess() {
  const t = useTranslations('driverPage.onboarding');

  const steps = [
    {
      icon: ClipboardCheck,
      title: t('step1.title'),
      description: t('step1.description'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: FileSearch,
      title: t('step2.title'),
      description: t('step2.description'),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: GraduationCap,
      title: t('step3.title'),
      description: t('step3.description'),
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      icon: Rocket,
      title: t('step4.title'),
      description: t('step4.description'),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
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

        {/* Timeline for desktop */}
        <div className="hidden md:block relative">
          {/* Timeline line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#F8D347] flex items-center justify-center font-bold text-xl text-[#0C1A2B] shadow-lg z-10 border-4 border-white">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className={`mt-16 ${step.bgColor} rounded-2xl p-6 border-2 ${step.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 min-h-[280px]`}>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#0C1A2B] mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet vertical layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-1 bg-gradient-to-b from-current to-transparent opacity-20" style={{ color: '#F8D347' }} />
                )}

                <div className="flex gap-4">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F8D347] flex items-center justify-center font-bold text-xl text-[#0C1A2B] shadow-lg z-10 border-4 border-white">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 ${step.bgColor} rounded-2xl p-6 border-2 ${step.borderColor} shadow-lg`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#0C1A2B] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
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
