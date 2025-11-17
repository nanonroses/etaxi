'use client';

import { useTranslations } from 'next-intl';
import { Download, Star, Car, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function CounterAnimation({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extraer número del valor (ej: "50K+" -> 50, "4.8" -> 4.8)
  const targetValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
  const suffix = value.replace(/[\d.]/g, '');
  const isDecimal = value.includes('.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = targetValue * easeOut;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, hasAnimated]);

  const displayValue = isDecimal
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return (
    <div ref={elementRef} className="text-3xl md:text-4xl font-bold text-[#0C1A2B] mb-2">
      {displayValue}{suffix}
    </div>
  );
}

export function AppStats() {
  const t = useTranslations('downloadPage.stats');

  const stats = [
    {
      icon: Download,
      value: t('downloads'),
      label: t('downloadsLabel'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-200',
    },
    {
      icon: Star,
      value: t('rating'),
      label: t('ratingLabel'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      hoverBg: 'hover:bg-yellow-200',
    },
    {
      icon: Car,
      value: t('trips'),
      label: t('tripsLabel'),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverBg: 'hover:bg-green-200',
    },
    {
      icon: Users,
      value: t('drivers'),
      label: t('driversLabel'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      hoverBg: 'hover:bg-purple-200',
    },
  ];

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white via-gray-50 to-white border-y border-gray-200 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F8D347] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group transform transition-all duration-500 hover:scale-110"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${stat.bgColor} ${stat.hoverBg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:rotate-6 relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <CounterAnimation value={stat.value} duration={2000} />
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
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
      `}</style>
    </section>
  );
}
