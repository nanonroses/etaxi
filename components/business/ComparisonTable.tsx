'use client';

import { useTranslations } from 'next-intl';
import { Check, X, AlertTriangle, Shield, Radio, Smartphone } from 'lucide-react';

export function ComparisonTable() {
  const t = useTranslations('businessPage.comparison');

  const features = [
    {
      title: t('feature1.title'),
      etaxi: t('feature1.etaxi'),
      apps: t('feature1.apps'),
      traditional: t('feature1.traditional'),
    },
    {
      title: t('feature2.title'),
      etaxi: t('feature2.etaxi'),
      apps: t('feature2.apps'),
      traditional: t('feature2.traditional'),
    },
    {
      title: t('feature3.title'),
      etaxi: t('feature3.etaxi'),
      apps: t('feature3.apps'),
      traditional: t('feature3.traditional'),
    },
    {
      title: t('feature4.title'),
      etaxi: t('feature4.etaxi'),
      apps: t('feature4.apps'),
      traditional: t('feature4.traditional'),
    },
    {
      title: t('feature5.title'),
      etaxi: t('feature5.etaxi'),
      apps: t('feature5.apps'),
      traditional: t('feature5.traditional'),
    },
    {
      title: t('feature6.title'),
      etaxi: t('feature6.etaxi'),
      apps: t('feature6.apps'),
      traditional: t('feature6.traditional'),
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
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

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#182b33] to-[#030c13]">
                <th className="px-6 py-4 text-left text-white font-bold text-lg w-1/4">
                  Aspecto
                </th>
                <th className="px-6 py-4 text-center bg-[#dd1828] text-white font-bold text-lg w-1/4">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6" />
                    ETAXI
                  </div>
                </th>
                <th className="px-6 py-4 text-center bg-[#596065] text-white font-bold text-lg w-1/4">
                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    Apps No Reguladas
                  </div>
                </th>
                <th className="px-6 py-4 text-center bg-[#182b33] text-white font-bold text-lg w-1/4">
                  <div className="flex items-center justify-center gap-2">
                    <Radio className="w-6 h-6" />
                    Radio Tradicional
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
                  } hover:bg-[#fff500]/10 transition-colors`}
                >
                  <td className="px-6 py-4 font-semibold text-[#182b33] border-b border-gray-200">
                    {feature.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-[#dd1828]/5">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#dd1828] flex-shrink-0 mt-1" />
                      <p className="text-sm text-[#182b33] font-medium">
                        {feature.etaxi}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-[#596065]/5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-[#596065] flex-shrink-0 mt-1" />
                      <p className="text-sm text-[#596065]">
                        {feature.apps}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <X className="w-6 h-6 text-[#596065] flex-shrink-0 mt-1" />
                      <p className="text-sm text-[#596065]">
                        {feature.traditional}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-lg font-bold text-[#0C1A2B] mb-4 text-center">
                {feature.title}
              </h3>

              {/* ETAXI */}
              <div className="mb-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
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

              {/* Apps No Reguladas */}
              <div className="mb-3 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-orange-800 mb-1 flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Apps No Reguladas
                    </p>
                    <p className="text-sm text-orange-700">
                      {feature.apps}
                    </p>
                  </div>
                </div>
              </div>

              {/* Radio Tradicional */}
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="flex items-start gap-3">
                  <X className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <Radio className="w-4 h-4" />
                      Radio Tradicional
                    </p>
                    <p className="text-sm text-gray-700">
                      {feature.traditional}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
