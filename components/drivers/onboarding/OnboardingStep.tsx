'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface OnboardingStepProps {
  image: string;
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
}

export function OnboardingStep({
  image,
  title,
  description,
  stepNumber,
  totalSteps,
}: OnboardingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center px-4 pb-4"
    >
      {/* Image Container */}
      <div className="relative w-full max-w-[280px] aspect-[9/19] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#182b33]/20 bg-[#182b33]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 280px, 320px"
        />
      </div>

      {/* Step Info */}
      <div className="mt-6 text-center max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fff500]/20 rounded-full mb-3">
          <span className="text-xs font-semibold text-[#182b33]">
            Paso {stepNumber} de {totalSteps}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#182b33] mb-2">{title}</h3>
        <p className="text-sm text-[#596065] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
