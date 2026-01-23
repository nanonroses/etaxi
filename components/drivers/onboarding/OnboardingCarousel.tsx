'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingPhaseNav } from './OnboardingPhaseNav';
import { DownloadButton } from './DownloadButton';
import { onboardingPhases } from './onboardingData';
import type { OnboardingPhase } from './onboardingData';

interface OnboardingCarouselProps {
  translations: {
    phases: Record<string, { title: string; description: string }>;
    steps: Record<string, { title: string; description: string }>;
    navigation: {
      prev: string;
      next: string;
      stepOf: string;
    };
  };
}

export function OnboardingCarousel({ translations }: OnboardingCarouselProps) {
  const [activePhaseId, setActivePhaseId] = useState(onboardingPhases[0].id);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activePhase = onboardingPhases.find((p) => p.id === activePhaseId)!;
  const activeSteps = activePhase.steps;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: false,
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (selectedIndex > 0) {
      scrollTo(selectedIndex - 1);
    }
  }, [selectedIndex, scrollTo]);

  const scrollNext = useCallback(() => {
    if (selectedIndex < activeSteps.length - 1) {
      scrollTo(selectedIndex + 1);
    }
  }, [selectedIndex, activeSteps.length, scrollTo]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset carousel when phase changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      setSelectedIndex(0);
    }
  }, [activePhaseId, emblaApi]);

  const handlePhaseChange = (phaseId: string) => {
    setActivePhaseId(phaseId);
  };

  const getStepTranslation = (stepKey: string) => {
    const stepNum = stepKey.replace('step-', '');
    return translations.steps[stepNum] || { title: '', description: '' };
  };

  const getPhaseTranslation = (phase: OnboardingPhase) => {
    return translations.phases[phase.id] || { title: phase.id, description: '' };
  };

  const phasesWithTranslations = onboardingPhases.map((phase) => ({
    id: phase.id,
    title: getPhaseTranslation(phase).title,
    description: getPhaseTranslation(phase).description,
    icon: phase.icon,
    color: phase.color,
    stepsCount: phase.steps.length,
  }));

  // Safely get current step, handling edge cases where selectedIndex might be out of bounds
  const safeSelectedIndex = Math.min(selectedIndex, activeSteps.length - 1);
  const currentStep = activeSteps[safeSelectedIndex];
  const currentStepTranslation = currentStep
    ? getStepTranslation(currentStep.id)
    : { title: '', description: '' };

  return (
    <div className="w-full">
      {/* Phase Navigation */}
      <div className="mb-8">
        <OnboardingPhaseNav
          phases={phasesWithTranslations}
          activePhase={activePhaseId}
          onPhaseChange={handlePhaseChange}
        />
      </div>

      {/* Phase Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhaseId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-[#182b33] mb-2">
            {getPhaseTranslation(activePhase).title}
          </h2>
          <p className="text-[#596065]">
            {getPhaseTranslation(activePhase).description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Carousel */}
      <div className="relative">
        {/* Navigation Arrows - Desktop */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedIndex === 0}
          aria-label={translations.navigation.prev}
        >
          <ChevronLeft className="w-6 h-6 text-[#182b33]" />
        </button>

        <button
          onClick={scrollNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedIndex === activeSteps.length - 1}
          aria-label={translations.navigation.next}
        >
          <ChevronRight className="w-6 h-6 text-[#182b33]" />
        </button>

        {/* Embla Carousel */}
        <div className="overflow-hidden md:mx-16" ref={emblaRef}>
          <div className="flex">
            {activeSteps.map((step, index) => {
              const stepTranslation = getStepTranslation(step.id);
              return (
                <div
                  key={step.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: index === selectedIndex ? 1 : 0.5,
                      scale: index === selectedIndex ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    {/* iPhone-style Phone Frame */}
                    <div className="relative w-full max-w-[260px] aspect-[9/19]">
                      {/* Outer glow/shadow for depth */}
                      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] p-[7px]">
                        {/* Metallic edge highlight */}
                        <div className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-br from-zinc-500 via-zinc-700 to-zinc-900 pointer-events-none" />
                        {/* Inner black frame */}
                        <div className="relative w-full h-full rounded-[2rem] bg-black p-[2px]">
                          {/* Screen area */}
                          <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-black">
                            {/* Dynamic Island */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-[80px] h-[24px] bg-black rounded-full flex items-center justify-center gap-2 shadow-inner">
                              <div className="w-2 h-2 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
                              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 ring-1 ring-zinc-800" />
                            </div>
                            {/* Screen content */}
                            <Image
                              src={step.image}
                              alt={stepTranslation.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                              priority={index < 3}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Side buttons - Power button (right) */}
                      <div className="absolute -right-[3px] top-[100px] w-[3px] h-[55px] bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-r-sm shadow-md" />
                      {/* Side buttons - Volume buttons (left) */}
                      <div className="absolute -left-[3px] top-[75px] w-[3px] h-[28px] bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-l-sm shadow-md" />
                      <div className="absolute -left-[3px] top-[112px] w-[3px] h-[45px] bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-l-sm shadow-md" />
                      {/* Mute switch (left) */}
                      <div className="absolute -left-[3px] top-[50px] w-[3px] h-[16px] bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-l-sm shadow-md" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p className="md:hidden text-center text-sm text-[#596065] mt-4">
          Desliza para navegar
        </p>
      </div>

      {/* Step Info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePhaseId}-${safeSelectedIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 text-center max-w-lg mx-auto"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: `${activePhase.color}20` }}
          >
            <span
              className="text-sm font-semibold"
              style={{
                color:
                  activePhase.color === '#fff500' ? '#182b33' : activePhase.color,
              }}
            >
              {translations.navigation.stepOf
                .replace('[current]', String(safeSelectedIndex + 1))
                .replace('[total]', String(activeSteps.length))}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#182b33] mb-2">
            {currentStepTranslation.title}
          </h3>
          <p className="text-[#596065] leading-relaxed">
            {currentStepTranslation.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress */}
      <div className="mt-8">
        <OnboardingProgress
          current={safeSelectedIndex}
          total={activeSteps.length}
          phaseColor={activePhase.color}
        />
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="flex md:hidden justify-center gap-4 mt-6">
        <button
          onClick={scrollPrev}
          disabled={selectedIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">{translations.navigation.prev}</span>
        </button>
        <button
          onClick={scrollNext}
          disabled={selectedIndex === activeSteps.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-[#dd1828] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <span className="text-sm font-medium">{translations.navigation.next}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Sticky Download Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <DownloadButton className="shadow-2xl" />
      </div>
    </div>
  );
}
