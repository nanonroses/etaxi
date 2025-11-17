'use client';

import { useTranslations } from 'next-intl';
import { FileCheck, Car, CheckCircle } from 'lucide-react';

export function DriverRequirements() {
  const t = useTranslations('driverPage.requirements');

  const legalRequirements = [
    {
      title: t('legal.req1.title'),
      description: t('legal.req1.description'),
    },
    {
      title: t('legal.req2.title'),
      description: t('legal.req2.description'),
    },
    {
      title: t('legal.req3.title'),
      description: t('legal.req3.description'),
    },
    {
      title: t('legal.req4.title'),
      description: t('legal.req4.description'),
    },
  ];

  const vehicleRequirements = [
    {
      title: t('vehicle.req1.title'),
      description: t('vehicle.req1.description'),
    },
    {
      title: t('vehicle.req2.title'),
      description: t('vehicle.req2.description'),
    },
    {
      title: t('vehicle.req3.title'),
      description: t('vehicle.req3.description'),
    },
    {
      title: t('vehicle.req4.title'),
      description: t('vehicle.req4.description'),
    },
  ];

  const optionalRequirements = [
    t('optional.req1'),
    t('optional.req2'),
    t('optional.req3'),
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[hsl(var(--muted))] to-white" id="requisitos">
      <div className="container mx-auto max-w-[1100px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Legal Requirements */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <FileCheck className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{t('legal.title')}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {legalRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0C1A2B] mb-1">{req.title}</h4>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Requirements */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <Car className="w-8 h-8" />
                <h3 className="text-2xl font-bold">{t('vehicle.title')}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicleRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0C1A2B] mb-1">{req.title}</h4>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-[#0C1A2B] mb-4 flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-gray-600" />
              {t('optional.title')}
            </h3>
            <ul className="space-y-3">
              {optionalRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-400 mt-2" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Nota Legal:</span> Todos los requisitos están basados en la Ley 21.553 sobre Modernización del Transporte Remunerado de Pasajeros y el Decreto Supremo 212. Es responsabilidad del conductor mantener su documentación vigente.
          </p>
        </div>
      </div>
    </section>
  );
}
