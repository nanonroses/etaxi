'use client';

import { useTranslations } from 'next-intl';
import { Smartphone } from 'lucide-react';

export function AppScreenshots() {
  const t = useTranslations('downloadPage.screenshots');

  const screenshots = [
    {
      label: t('screen1'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: t('screen2'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: t('screen3'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      label: t('screen4'),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: t('screen5'),
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Horizontal scrollable gallery */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center"
                style={{ width: '280px' }}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-3 border-8 border-gray-800">
                  {/* Phone notch */}
                  <div className="bg-gray-800 rounded-t-2xl h-6 flex items-center justify-center mb-1">
                    <div className="w-20 h-4 bg-black rounded-full" />
                  </div>

                  {/* Screen content */}
                  <div
                    className={`aspect-[9/16] rounded-2xl bg-gradient-to-br ${screenshot.gradient} flex flex-col items-center justify-center p-6 text-white relative overflow-hidden`}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-90" />
                      <p className="text-sm font-semibold opacity-90">
                        {screenshot.label}
                      </p>
                    </div>

                    {/* Screenshot placeholder badge */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <p className="text-xs font-medium">Preview</p>
                    </div>
                  </div>

                  {/* Phone home indicator */}
                  <div className="bg-gray-800 rounded-b-2xl h-8 flex items-center justify-center mt-1">
                    <div className="w-24 h-1 bg-white rounded-full opacity-50" />
                  </div>
                </div>

                {/* Label below phone */}
                <p className="text-center mt-4 text-sm font-medium text-[#0C1A2B]">
                  {screenshot.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              ← Desliza para ver más →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
