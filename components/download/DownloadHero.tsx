'use client';

import { useTranslations } from 'next-intl';
import { Smartphone } from 'lucide-react';
import Image from 'next/image';

export function DownloadHero() {
  const t = useTranslations('downloadPage');

  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-b from-[#0C1A2B] via-[#182b33] to-[#0C1A2B] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#F8D347] blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#F8D347] rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#F8D347] rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center md:text-left space-y-6">
            <div
              className="inline-block px-4 py-2 bg-[#F8D347]/20 rounded-full mb-4 border border-[#F8D347]/30 backdrop-blur-sm"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
            >
              <p className="text-sm font-semibold text-[#F8D347]">
                {t('hero.badge')}
              </p>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
            >
              {t('hero.title')}
            </h1>

            <p
              className="text-lg md:text-xl text-white/80 leading-relaxed"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Download Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}
            >
              <a
                href="#download"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F8D347] text-[#0C1A2B] rounded-lg font-semibold text-lg hover:bg-[#F8D347]/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Smartphone className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Descargar Ahora</span>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                Ver Características
              </a>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div
            className="flex justify-center"
            style={{ animation: 'fadeInRight 0.8s ease-out 0.4s both' }}
          >
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-[#F8D347]/30 blur-3xl rounded-full animate-pulse" />

              {/* Floating animation */}
              <div className="relative" style={{ animation: 'float 6s ease-in-out infinite' }}>
                {/* Phone */}
                <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-500 group" style={{ width: '300px' }}>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 rounded-[3rem] transition-opacity duration-500 pointer-events-none" />

                  {/* Notch */}
                  <div className="bg-black rounded-t-[2.5rem] h-8 flex items-center justify-center mb-2 relative z-10">
                    <div className="w-24 h-5 bg-gray-900 rounded-full" />
                  </div>

                  {/* Screen */}
                  <div className="aspect-[9/16] rounded-[2rem] bg-gradient-to-br from-[#F8D347] to-[#F8D347]/70 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/placeholders/Screen Etaxi Chile.webp"
                      alt="ETAXI App - Pantalla"
                      fill
                      className="object-cover rounded-[2rem] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Screen overlay shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Home indicator */}
                  <div className="bg-black rounded-b-[2.5rem] h-10 flex items-center justify-center mt-2 relative z-10">
                    <div className="w-28 h-1 bg-white rounded-full opacity-50" />
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-4 border-2 border-[#F8D347]/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
