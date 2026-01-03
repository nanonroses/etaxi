'use client';

import { useTranslations } from 'next-intl';
import { Smartphone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function PhoneCard({
  label,
  gradient,
  index,
  imageSrc
}: {
  label: string;
  gradient: string;
  index: number;
  imageSrc?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 snap-center"
      style={{ width: '300px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.05)' : 'scale(1)'
            }`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-0'
            }`}
          style={{ transform: 'translateZ(-50px)' }}
        />

        <div className="bg-white rounded-3xl shadow-2xl p-3 border-8 border-gray-800 relative">
          {/* Phone notch */}
          <div className="bg-gray-800 rounded-t-2xl h-6 flex items-center justify-center mb-1">
            <div className="w-20 h-4 bg-black rounded-full" />
          </div>

          {/* Screen content */}
          <div className="aspect-[9/16] rounded-2xl relative overflow-hidden">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-white relative`}>
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white blur-3xl" />
                </div>

                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <Smartphone className={`w-16 h-16 mx-auto mb-4 opacity-90 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                    }`} />
                  <p className="text-sm font-semibold opacity-90">
                    {label}
                  </p>
                </div>

                {/* Screenshot placeholder badge */}
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 ${isHovered ? 'scale-110 bg-white/30' : 'scale-100'
                  }`}>
                  <p className="text-xs font-medium">Preview</p>
                </div>
              </div>
            )}
          </div>

          {/* Phone home indicator */}
          <div className="bg-gray-800 rounded-b-2xl h-8 flex items-center justify-center mt-1">
            <div className="w-24 h-1 bg-white rounded-full opacity-50" />
          </div>
        </div>
      </div>

      {/* Label below phone */}
      <p className="text-center mt-4 text-sm font-medium text-[#0C1A2B]">
        {label}
      </p>
    </div>
  );
}

export function AppScreenshots() {
  const t = useTranslations('downloadPage.screenshots');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const screenshots = [
    {
      label: t('screen1'),
      gradient: 'from-blue-500 to-cyan-500',
      imageSrc: '/images/placeholders/Screen Etaxi Chile.webp',
    },
    {
      label: t('screen2'),
      gradient: 'from-purple-500 to-pink-500',
      imageSrc: '/images/placeholders/Screenshot_20170918-133259.webp',
    },
    {
      label: t('screen3'),
      gradient: 'from-orange-500 to-red-500',
      imageSrc: '/images/placeholders/Screenshot_20190428-185723_Etaxi Chile.webp',
    },
    {
      label: t('screen4'),
      gradient: 'from-green-500 to-emerald-500',
      imageSrc: '/images/placeholders/Screenshot_20190929-165858_Etaxi Chile.webp',
    },
    {
      label: t('screen5'),
      gradient: 'from-indigo-500 to-purple-500',
      imageSrc: '/images/placeholders/Screenshot_20190428-185735_Etaxi Chile.webp',
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-[hsl(var(--muted))] to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-[1400px] px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4 border border-blue-500/20">
            <p className="text-sm font-semibold text-[#0C1A2B]">
              Galería de Pantallas
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0C1A2B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Horizontal scrollable gallery */}
        <div className="relative">
          {/* Gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-white via-white to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-10"
          >
            {screenshots.map((screenshot, index) => (
              <PhoneCard
                key={index}
                label={screenshot.label}
                gradient={screenshot.gradient}
                index={index}
                imageSrc={screenshot.imageSrc}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${Math.abs(scrollPosition - index * 320) < 200
                    ? 'w-8 bg-[#F8D347]'
                    : 'w-2 bg-gray-300'
                  }`}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground animate-pulse">
              ← Desliza para ver más →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
