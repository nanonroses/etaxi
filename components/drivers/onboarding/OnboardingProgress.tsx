'use client';

import { m } from 'framer-motion';

interface OnboardingProgressProps {
  current: number;
  total: number;
  phaseColor?: string;
}

export function OnboardingProgress({
  current,
  total,
  phaseColor = '#dd1828',
}: OnboardingProgressProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <m.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: phaseColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-6'
                : index < current
                ? 'opacity-70'
                : 'opacity-30'
            }`}
            style={{
              backgroundColor: index <= current ? phaseColor : '#d1d5db',
            }}
            aria-label={`Ir al paso ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
