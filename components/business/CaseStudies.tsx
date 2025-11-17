'use client';

import { useTranslations } from 'next-intl';
import { Building2, Users, ShoppingCart, TrendingUp, CheckCircle } from 'lucide-react';

export function CaseStudies() {
  const t = useTranslations('businessPage.caseStudies');

  const cases = [
    {
      company: t('case1.company'),
      industry: t('case1.industry'),
      size: t('case1.employees'),
      challenge: t('case1.challenge'),
      solution: t('case1.solution'),
      results: t('case1.results'),
      icon: Building2,
      color: 'from-[#dd1828] to-[#182b33]',
    },
    {
      company: t('case2.company'),
      industry: t('case2.industry'),
      size: t('case2.members'),
      challenge: t('case2.challenge'),
      solution: t('case2.solution'),
      results: t('case2.results'),
      icon: Users,
      color: 'from-[#182b33] to-[#030c13]',
    },
    {
      company: t('case3.company'),
      industry: t('case3.industry'),
      size: t('case3.employees'),
      challenge: t('case3.challenge'),
      solution: t('case3.solution'),
      results: t('case3.results'),
      icon: ShoppingCart,
      color: 'from-[#596065] to-[#182b33]',
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

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => {
            const Icon = caseStudy.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#dd1828] hover:-translate-y-1 flex flex-col group"
              >
                {/* Icon and Company */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${caseStudy.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#182b33] mb-1">
                      {caseStudy.company}
                    </h3>
                    <p className="text-sm text-[#596065]">
                      {caseStudy.industry} • {caseStudy.size}
                    </p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="mb-4">
                  <h4 className="font-semibold text-[#182b33] mb-2 text-sm uppercase tracking-wide">
                    Desafío
                  </h4>
                  <p className="text-sm text-[#596065] leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                  <h4 className="font-semibold text-[#182b33] mb-2 text-sm uppercase tracking-wide">
                    Solución
                  </h4>
                  <p className="text-sm text-[#596065] leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="mt-auto pt-4 border-t border-[#596065]/20">
                  <h4 className="font-semibold text-[#182b33] mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#dd1828]" />
                    Resultados
                  </h4>
                  <div className="space-y-2">
                    {caseStudy.results.split('. ').map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#dd1828] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#182b33] font-medium">
                          {result.trim()}
                        </p>
                      </div>
                    ))}
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
