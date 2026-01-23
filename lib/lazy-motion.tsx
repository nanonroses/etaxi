'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * LazyMotion provider that reduces framer-motion bundle size by ~50%
 * Uses domAnimation features (most common animations) instead of full bundle
 *
 * Wrap your app with this provider and use 'm' instead of 'motion' in components:
 * import { m } from 'framer-motion';
 * <m.div animate={{ opacity: 1 }} />
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
