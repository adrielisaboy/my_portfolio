import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EXPERIENCE } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Experience() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Progressively reveal the vertical timeline line as the user scrolls
      gsap.fromTo(
        '[data-timeline="line"]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '[data-timeline="track"]',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1,
          },
        },
      );

      // Each item: content reveal + date slide-in
      gsap.utils.toArray('[data-timeline="item"]').forEach((item) => {
        const content = item.querySelector('[data-timeline="content"]');
        const date = item.querySelector('[data-timeline="date"]');
        const dot = item.querySelector('[data-timeline="dot"]');

        gsap.from(content, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
        gsap.from(date, {
          x: -24,
          opacity: 0,
          duration: 0.7,
          ease: EASE.out,
          scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: EASE.out,
          scrollTrigger: { trigger: item, start: 'top 78%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="experience"
      ref={root}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16">
          <div className="eyebrow">04 — Experience</div>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl">
            The journey so far.
          </h2>
        </div>

        <div data-timeline="track" className="relative grid grid-cols-12 gap-4 md:gap-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/10 md:left-[16.66%]" aria-hidden="true">
            <div
              data-timeline="line"
              className="h-full w-full origin-top scale-y-0 bg-accent"
              style={{ willChange: 'transform' }}
            />
          </div>

          <div className="col-span-12 space-y-12 md:col-span-10 md:col-start-3 md:space-y-20">
            {EXPERIENCE.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                data-timeline="item"
                className="relative grid grid-cols-12 gap-4 pl-6 md:gap-8 md:pl-0"
              >
                {/* Dot */}
                <span
                  data-timeline="dot"
                  className="absolute -left-[3px] top-1.5 h-2 w-2 rounded-full bg-accent ring-4 ring-ink md:left-[-12px]"
                  aria-hidden="true"
                />

                {/* Date — slides in */}
                <div
                  data-timeline="date"
                  className="col-span-12 font-mono text-[0.7rem] uppercase tracking-wider text-accent/80 md:col-span-3 md:text-right"
                >
                  {exp.period}
                </div>

                {/* Content — reveals */}
                <div data-timeline="content" className="col-span-12 md:col-span-9">
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-semibold tracking-tightest text-paper md:text-2xl">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-gray-soft">
                      {exp.company}
                    </span>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-gray-soft md:text-base">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
