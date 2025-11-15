'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export function DownloadAppCTA() {
  const t = useTranslations('download');

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white border-none">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">
                  {t('title')}
                </h2>
                <p className="text-white/90 mb-6">
                  {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-[hsl(var(--primary))] hover:bg-white/90"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    {t('appStore')}
                  </Button>

                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-[hsl(var(--primary))] hover:bg-white/90"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    {t('playStore')}
                  </Button>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex-shrink-0 hidden lg:block">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-28 h-28 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    QR Code
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
