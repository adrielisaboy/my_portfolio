import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SKILL_GROUPS } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Skills() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Section header reveal
      gsap.from('[data-skills="head"]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      // Each category column
      gsap.from('[data-skills="col"]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-skills="grid"]', start: 'top 80%' },
      });

      // Items reveal within columns
      gsap.from('[data-skills="item"]', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.05,
        scrollTrigger: { trigger: '[data-skills="grid"]', start: 'top 70%' },
      });
    },
    { scope: root },
  );

  // Hover interaction — restrained scale + accent shift + desc fade
  const onEnter = (e) => {
    if (prefersReducedMotion()) return;
    const item = e.currentTarget;
    gsap.to(item, { x: 6, duration: 0.4, ease: EASE.out });
    gsap.to(item.querySelector('[data-skills-desc]'), { autoAlpha: 1, x: 0, duration: 0.35, ease: EASE.out });
  };
  const onLeave = (e) => {
    if (prefersReducedMotion()) return;
    const item = e.currentTarget;
    gsap.to(item, { x: 0, duration: 0.4, ease: EASE.out });
    gsap.to(item.querySelector('[data-skills-desc]'), { autoAlpha: 0, x: -6, duration: 0.3, ease: EASE.out });
  };

  return (
    <section
      id="skills"
      ref={root}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
      aria-label="Skills"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-skills="head" className="eyebrow">
              02 — Skills
            </div>
            <h2
              data-skills="head"
              className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl"
            >
              Tools of the craft.
            </h2>
          </div>
          <p data-skills="head" className="max-w-xs text-sm leading-relaxed text-gray-soft">
            A snapshot of the stack I use day to day — and the principles I bring to every build.
          </p>
        </div>

        <div
          data-skills="grid"
          className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3"
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              data-skills="col"
              className="bg-ink p-6 md:p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-semibold tracking-tightest text-paper">
                  {group.title}
                </h3>
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-accent/70">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="space-y-1">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    data-skills="item"
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    onFocus={onEnter}
                    onBlur={onLeave}
                    tabIndex={0}
                    className="group cursor-default border-b border-white/5 py-3 outline-none last:border-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-lg font-medium tracking-tight text-paper transition-colors duration-300 group-focus:text-accent group-hover:text-accent">
                        {skill.name}
                      </span>
                      <span
                        data-skills-desc
                        className="hidden text-right font-mono text-[0.6rem] uppercase tracking-wider text-gray-soft opacity-0 sm:block"
                      >
                        {skill.desc}
                      </span>
                    </div>
                    {/* Mobile: always show description */}
                    <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-gray-soft sm:hidden">
                      {skill.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
