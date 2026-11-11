import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const NAV_OFFSET = 72;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

/**
 * Lenis guidato dal ticker di GSAP: un solo requestAnimationFrame per
 * smooth scroll e ScrollTrigger, nessun drift tra i due.
 * Con prefers-reduced-motion resta lo scroll nativo.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    duration: 1.1,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: false
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = time => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id, { immediate = false } = {}) {
  const el = id === 'top' ? document.body : document.getElementById(id);
  if (!el) return;
  const target = id === 'top' ? 0 : el;
  if (lenis) {
    lenis.scrollTo(target, { offset: id === 'top' ? 0 : -NAV_OFFSET + 40, immediate });
  } else {
    const y = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 40;
    window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
}

export { gsap, ScrollTrigger };
