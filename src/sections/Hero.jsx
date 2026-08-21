import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { PERSON } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP);

/**
 * Hero — the visual anchor of the site.
 * - Entrance timeline: logo-ish wordmark, headline lines, copy, CTAs, decoratives
 * - Mouse-parallax on selected decorative chips
 * Reduced motion: content is visible immediately, no parallax.
 */
export default function Hero({ ready }) {
  const root = useRef(null);
  const decor = useRef([]);

  useGSAP(
    () => {
      if (!ready) return;

      if (prefersReducedMotion()) {
        gsap.set(root.current.querySelectorAll('[data-hero]'), { opacity: 1, y: 0, yPercent: 0, clipPath: 'none' });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.from('[data-hero="brand"]', { yPercent: 120, duration: 0.8 })
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 12, duration: 0.6 }, '-=0.4')
        .from(
          '[data-hero="line"]',
          { yPercent: 115, duration: 1, stagger: 0.12 },
          '-=0.3',
        )
        .from('[data-hero="copy"]', { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
        .from(
          '[data-hero="cta"]',
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          '-=0.4',
        )
        .from(
          '[data-hero="decor"]',
          { opacity: 0, scale: 0.8, duration: 0.8, stagger: 0.08 },
          '-=0.6',
        )
        .from('[data-hero="scroll"]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.3');

      // Mouse parallax on decorative chips (GPU transform only)
      const onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        decor.current.forEach((el, i) => {
          if (!el) return;
          const depth = (i + 1) * 12;
          gsap.to(el, { x: dx * depth, y: dy * depth, duration: 0.8, ease: 'power2.out' });
        });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="home"
      ref={root}
      className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-28 pb-10 md:px-12 md:pt-32"
      aria-label="Introduction"
    >
      {/* Decorative typographic wordmark — experimental treatment */}
      <div
        data-hero="decor"
        ref={(el) => (decor.current[0] = el)}
        className="pointer-events-none absolute right-4 top-24 select-none font-display text-[18vw] font-bold leading-none tracking-tightest text-white/[0.04] md:right-12 md:text-[12vw]"
        aria-hidden="true"
      >
        DEV
      </div>
      <div
        data-hero="decor"
        ref={(el) => (decor.current[1] = el)}
        className="pointer-events-none absolute left-4 bottom-40 select-none font-mono text-[0.7rem] uppercase tracking-wider text-white/20 md:left-12"
        aria-hidden="true"
      >
        {'// creative.dev'}
      </div>
      <div
        data-hero="decor"
        ref={(el) => (decor.current[2] = el)}
        className="pointer-events-none absolute right-8 bottom-32 hidden font-mono text-[0.7rem] uppercase tracking-wider text-accent/60 md:block"
        aria-hidden="true"
      >
        ◢ scroll to explore
      </div>

      <div data-hero="eyebrow" className="eyebrow mt-4">
        Frontend Developer · Creative Developer · Cybersecurity
      </div>

      <div className="mt-auto max-w-[1600px]">
        <h1 className="font-display text-[13vw] font-bold leading-[0.92] tracking-tightest text-paper sm:text-[10vw] lg:text-[8.5vw]">
          <span className="line-mask">
            <span data-hero="line" className="block">
              Frontend Developer
            </span>
          </span>
          <span className="line-mask">
            <span data-hero="line" className="block">
              <span className="text-accent">&amp;</span> Creative Builder.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            data-hero="copy"
            className="max-w-md text-balance text-base leading-relaxed text-gray-soft md:text-lg"
          >
            I build thoughtful digital experiences with code, design, and motion.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              data-hero="cta"
              href="#projects"
              className="group inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[0.72rem] uppercase tracking-wider text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              View my work
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              data-hero="cta"
              href="#contact"
              className="group inline-flex items-center gap-2 bg-paper px-5 py-3 font-mono text-[0.72rem] uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-accent"
            >
              Let&apos;s connect
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero="scroll"
        className="mt-10 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft"
      >
        <ArrowDown size={14} className="text-accent" />
        Scroll
      </div>

      {/* Wordmark reveal line at bottom */}
      <div className="mt-6 overflow-hidden border-t border-white/10 pt-4">
        <div data-hero="brand" className="font-display text-sm font-semibold tracking-tightest text-paper/80">
          {PERSON.brand} — {PERSON.role}
        </div>
      </div>
    </section>
  );
}
