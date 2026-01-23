'use client';

import { useTranslations } from 'next-intl';
import { ClipboardCheck, FileSearch, GraduationCap, Rocket } from 'lucide-react';
import { m } from 'framer-motion';

export function OnboardingProcess() {
  const t = useTranslations('driverPage.onboarding');

  const steps = [
    {
      icon: ClipboardCheck,
      title: t('step1.title'),
      description: t('step1.description'),
      color: 'from-[#dd1828] to-[#182b33]',
      bgColor: 'bg-[#dd1828]/5',
      borderColor: 'border-[#dd1828]/20',
    },
    {
      icon: FileSearch,
      title: t('step2.title'),
      description: t('step2.description'),
      color: 'from-[#182b33] to-[#030c13]',
      bgColor: 'bg-[#182b33]/5',
      borderColor: 'border-[#182b33]/20',
    },
    {
      icon: GraduationCap,
      title: t('step3.title'),
      description: t('step3.description'),
      color: 'from-[#fff500] to-[#dd1828]',
      bgColor: 'bg-[#fff500]/10',
      borderColor: 'border-[#fff500]/30',
    },
    {
      icon: Rocket,
      title: t('step4.title'),
      description: t('step4.description'),
      color: 'from-[#dd1828] to-[#596065]',
      bgColor: 'bg-[#dd1828]/5',
      borderColor: 'border-[#dd1828]/20',
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#182b33] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#596065] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline for desktop */}
        <div className="hidden md:block relative">
          {/* Timeline line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#dd1828] via-[#182b33] via-[#fff500] to-[#dd1828] opacity-20" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  className="relative"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#fff500] flex items-center justify-center font-bold text-xl text-[#030c13] shadow-lg z-10 border-4 border-white">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className={`mt-16 ${step.bgColor} rounded-2xl p-6 border-2 ${step.borderColor} shadow-lg hover:shadow-xl hover:border-[#dd1828] transition-all duration-300 min-h-[280px] group`}>
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#182b33] mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#596065] leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/tablet vertical layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-1 bg-gradient-to-b from-current to-transparent opacity-20" style={{ color: '#fff500' }} />
                )}

                <div className="flex gap-4">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff500] flex items-center justify-center font-bold text-xl text-[#030c13] shadow-lg z-10 border-4 border-white">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 ${step.bgColor} rounded-2xl p-6 border-2 ${step.borderColor} shadow-lg group`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#182b33] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#596065] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
