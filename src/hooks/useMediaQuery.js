import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../animations/gsap.js';

/**
 * Tracks the OS-level `prefers-reduced-motion` setting and re-renders
 * when it changes. Components read this to decide whether to run GSAP.
 */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
};

/**
 * Tracks whether a given media query matches, for responsive GSAP logic
 * (e.g. disabling pinned sections on small screens).
 *
 * @param {string} query
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};
