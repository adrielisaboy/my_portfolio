import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Whether the user has requested reduced motion at the OS level.
 * Used across the app to gate non-essential GSAP animations.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shared easing tokens so motion feels consistent across sections.
 */
export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

/**
 * Run a setup function only when motion is allowed. When the user has
 * requested reduced motion we skip the GSAP work entirely and the
 * content remains visible (handled by the `.gsap-fallback` utility).
 *
 * @param {() => void} setup - GSAP timeline / ScrollTrigger setup
 */
export const withMotion = (setup) => {
  if (prefersReducedMotion()) return;
  setup();
};

/**
 * Reveal a set of elements with a staggered y-translate + fade.
 * Used by several sections for consistency.
 *
 * @param {gsap.TweenTarget} target
 * @param {object} [opts]
 */
export const revealUp = (target, opts = {}) => {
  if (prefersReducedMotion()) return null;
  return gsap.from(target, {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: EASE.out,
    stagger: 0.08,
    ...opts,
  });
};

export { gsap, ScrollTrigger };
