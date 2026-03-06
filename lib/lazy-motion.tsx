'use client';

import { LazyMotion, domAnimation, MotionConfig, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * LazyMotion provider that reduces framer-motion bundle size by ~50%
 * Uses domAnimation features (most common animations) instead of full bundle
 *
 * Respects user's prefers-reduced-motion preference automatically
 *
 * Wrap your app with this provider and use 'm' instead of 'motion' in components:
 * import { m } from 'framer-motion';
 * <m.div animate={{ opacity: 1 }} />
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
