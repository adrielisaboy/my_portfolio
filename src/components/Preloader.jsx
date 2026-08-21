import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Atom, Binary, Braces, Code2, Palette } from 'lucide-react';
import { PERSON } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP);

/**
 * Preloader — walks through the stack that shaped the developer journey,
 * then exits via a clipped panel wipe.
 */
export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const brand = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        // Keep content accessible: show briefly then complete.
        const t = gsap.timeline({ onComplete });
        t.set(root.current.querySelectorAll('[data-stack]'), { opacity: 1, y: 0 });
        t.to(root.current, { autoAlpha: 0, duration: 0.3 }, '+=0.1');
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => onComplete && onComplete(),
      });

      // 1. Brand + stack journey slide in
      tl.from(brand.current, { yPercent: 120, duration: 0.7, ease: EASE.out });
      tl.fromTo(
        root.current.querySelectorAll('[data-stack]'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.16, ease: EASE.out },
        '<0.15',
      );

      // 2. Exit — wipe up + fade brand
      tl.to(brand.current, { yPercent: -120, duration: 0.6, ease: EASE.inOut }, '+=0.25');
      tl.to(root.current, { yPercent: -100, duration: 0.8, ease: EASE.inOut }, '<0.1');
      tl.set(root.current, { display: 'none' });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-12"
      role="status"
      aria-live="polite"
      aria-label="Loading ADRiEL.DEV"
    >
      <div className="overflow-hidden">
        <span ref={brand} className="block font-display text-2xl font-semibold tracking-tightest text-paper">
          {PERSON.brand}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-5">
          {[
            [Code2, 'HTML', '</>'],
            [Palette, 'CSS', '#'],
            [Braces, 'JavaScript', '{}'],
            [Binary, 'ES6', '06'],
            [Atom, 'React', 'R'],
          ].map(([Icon, label, symbol]) => (
            <div
              key={label}
              data-stack
              className="border border-white/15 bg-white/[0.03] p-4 opacity-0 md:p-5"
            >
              <Icon className="mb-8 text-accent" size={20} strokeWidth={1.5} />
              <div className="font-display text-2xl font-semibold text-paper">{symbol}</div>
              <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-wider text-gray-soft">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
        <span>Loading experience</span>
        <span>v1.0</span>
      </div>
    </div>
  );
}
