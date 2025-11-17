'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Shield, AlertTriangle } from 'lucide-react';

export function SafetyComparison() {
  const t = useTranslations('safetyPage.safetyComparison');

  const features = [
    {
      title: t('feature1.title'),
      etaxi: t('feature1.etaxi'),
      others: t('feature1.others'),
    },
    {
      title: t('feature2.title'),
      etaxi: t('feature2.etaxi'),
      others: t('feature2.others'),
    },
    {
      title: t('feature3.title'),
      etaxi: t('feature3.etaxi'),
      others: t('feature3.others'),
    },
    {
      title: t('feature4.title'),
      etaxi: t('feature4.etaxi'),
      others: t('feature4.others'),
    },
    {
      title: t('feature5.title'),
      etaxi: t('feature5.etaxi'),
      others: t('feature5.others'),
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
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

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0C1A2B] to-[#182b33]">
                <th className="px-6 py-4 text-left text-white font-bold text-lg w-1/3">
                  Aspecto de Seguridad
                </th>
                <th className="px-6 py-4 text-center bg-green-600 text-white font-bold text-lg w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6" />
                    ETAXI
                  </div>
                </th>
                <th className="px-6 py-4 text-center bg-red-600 text-white font-bold text-lg w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Apps No Reguladas
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 font-semibold text-[#0C1A2B] border-b border-gray-200">
                    {feature.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-green-50">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-sm text-green-800 font-medium">
                        {feature.etaxi}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-red-50">
                    <div className="flex items-start gap-3">
                      <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-sm text-red-800">
                        {feature.others}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-lg font-bold text-[#0C1A2B] mb-4 text-center">
                {feature.title}
              </h3>

              {/* ETAXI */}
              <div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      ETAXI
                    </p>
                    <p className="text-sm text-green-700">
                      {feature.etaxi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Others */}
              <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800 mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Apps No Reguladas
                    </p>
                    <p className="text-sm text-red-700">
                      {feature.others}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <div className="inline-block px-8 py-4 bg-[#F8D347] rounded-full shadow-lg">
            <p className="text-[#0C1A2B] font-bold text-lg">
              La seguridad no es negociable. Elige ETAXI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
