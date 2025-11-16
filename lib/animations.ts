// Micro-animaciones sobrias para ETAXI
// Basadas en principios de motion design profesional

/**
 * Clases de animación para Tailwind CSS
 * Usar con className para agregar micro-animaciones sutiles
 */

// Fade in (entrada suave)
export const fadeIn = 'animate-in fade-in duration-500';
export const fadeInSlow = 'animate-in fade-in duration-700';

// Slide up (deslizar hacia arriba)
export const slideUp = 'animate-in slide-in-from-bottom-4 duration-500';
export const slideUpSlow = 'animate-in slide-in-from-bottom-6 duration-700';

// Scale (escala suave)
export const scaleIn = 'animate-in zoom-in-95 duration-300';

// Hover effects (efectos al hover)
export const hoverLift = 'transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg';
export const hoverGlow = 'transition-all duration-200 hover:shadow-md hover:shadow-[#dd1828]/20';
export const hoverUnderline = 'relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#dd1828] after:transition-all after:duration-300 hover:after:w-full';

// Button animations
export const buttonPress = 'active:scale-95 transition-transform duration-100';
export const buttonHover = 'transition-all duration-200 hover:brightness-110';

// Card animations
export const cardHover = 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1';
export const cardFloat = 'transition-all duration-500 hover:shadow-2xl hover:-translate-y-2';

// Loading states
export const pulse = 'animate-pulse';
export const spin = 'animate-spin';

// Delays para animaciones escalonadas
export const delay100 = 'animation-delay-100';
export const delay200 = 'animation-delay-200';
export const delay300 = 'animation-delay-300';

/**
 * Variantes de animación para framer-motion (si se necesita en el futuro)
 */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Animación de conteo para números (opcional)
 */
export function animateCount(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) {
  const startTime = performance.now();
  const diff = end - start;

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.round(start + diff * eased);
    callback(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Smooth scroll helper
 */
export function smoothScrollTo(targetId: string, offset: number = 80) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
