'use client';

import { useTranslations } from 'next-intl';
import { Moon, Plane, Briefcase, Users, Heart, Calendar } from 'lucide-react';

const iconMap = {
  moon: Moon,
  plane: Plane,
  briefcase: Briefcase,
  users: Users,
  heart: Heart,
  calendar: Calendar,
};

export function UseCases() {
  const t = useTranslations('passengerPage.useCases');

  const cases = [
    {
      title: t('case1.title'),
      description: t('case1.description'),
      icon: t('case1.icon'),
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
    },
    {
      title: t('case2.title'),
      description: t('case2.description'),
      icon: t('case2.icon'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('case3.title'),
      description: t('case3.description'),
      icon: t('case3.icon'),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      title: t('case4.title'),
      description: t('case4.description'),
      icon: t('case4.icon'),
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
    },
    {
      title: t('case5.title'),
      description: t('case5.description'),
      icon: t('case5.icon'),
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
    },
    {
      title: t('case6.title'),
      description: t('case6.description'),
      icon: t('case6.icon'),
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
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
          {cases.map((useCase, index) => {
            const Icon = iconMap[useCase.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className={`${useCase.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#F8D347]`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0C1A2B] mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {useCase.description}
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
