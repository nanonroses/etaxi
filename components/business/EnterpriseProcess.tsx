'use client';

import { useTranslations } from 'next-intl';
import { Calendar, FileText, FileSignature, Settings, CheckCircle } from 'lucide-react';

export function EnterpriseProcess() {
  const t = useTranslations('businessPage.enterpriseProcess');

  const iconMap = {
    calendar: Calendar,
    fileText: FileText,
    fileSignature: FileSignature,
    settings: Settings,
    checkCircle: CheckCircle,
  };

  const steps = [
    {
      number: t('step1.number'),
      title: t('step1.title'),
      description: t('step1.description'),
      icon: t('step1.icon'),
    },
    {
      number: t('step2.number'),
      title: t('step2.title'),
      description: t('step2.description'),
      icon: t('step2.icon'),
    },
    {
      number: t('step3.number'),
      title: t('step3.title'),
      description: t('step3.description'),
      icon: t('step3.icon'),
    },
    {
      number: t('step4.number'),
      title: t('step4.title'),
      description: t('step4.description'),
      icon: t('step4.icon'),
    },
    {
      number: t('step5.number'),
      title: t('step5.title'),
      description: t('step5.description'),
      icon: t('step5.icon'),
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {!isLast && (
                  <div className="hidden md:block absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-[#F8D347] to-blue-400" />
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347]">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                      <span className="text-3xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F8D347] to-orange-400 flex items-center justify-center shadow-md flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#0C1A2B] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
            <p className="text-white font-bold text-lg">
              Tiempo promedio de implementación: 2-3 semanas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
