import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Projects — "Selected Work".
 * - Header reveal + list of project rows with staggered scroll reveals
 * - A pinned showcase: as the user scrolls, the project visual stays
 *   pinned while the project info slides horizontally through each project.
 *   Pinning is disabled on small screens (and reduced-motion) for UX.
 */
export default function Projects() {
  const root = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Header reveal
      gsap.from('[data-projects="head"]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-projects="head"]', start: 'top 80%' },
      });

      // Pinned showcase — desktop only
      if (isDesktop) {
        const stages = gsap.utils.toArray('[data-showcase="stage"]');
        if (stages.length) {
          const track = root.current.querySelector('[data-showcase="track"]');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '[data-showcase="pin"]',
              start: 'top top',
              end: `+=${(stages.length - 1) * 180}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          stages.forEach((stage, i) => {
            if (i === 0) return; // first is visible by default
            tl.to(track, { x: `-${i * 100}vw`, duration: 1, ease: 'none' });
          });
        }
      }

      // Project list reveal (below the pinned showcase)
      gsap.utils.toArray('[data-row]').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: EASE.out,
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      // Index number horizontal drift on scroll
      gsap.utils.toArray('[data-row-index]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: 40 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 40%', scrub: true },
          },
        );
      });

      // Cleanup
      return () => ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && root.current?.contains(st.trigger)) st.kill();
      });
    },
    { scope: root, dependencies: [isDesktop] },
  );

  return (
    <section
      id="projects"
      ref={root}
      className="relative border-t border-white/10"
      aria-label="Selected projects"
    >
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12 md:pt-36">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-projects="head" className="eyebrow">
              03 — Selected Work
            </div>
            <h2
              data-projects="head"
              className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl"
            >
              Selected projects.
            </h2>
          </div>
          <p data-projects="head" className="max-w-xs text-sm leading-relaxed text-gray-soft">
            A mix of apps, tools, and experiments. Scroll to see a pinned showcase, then the full
            list below.
          </p>
        </div>
      </div>

      {/* Pinned showcase — desktop. On mobile, falls back to a stacked list. */}
      {isDesktop ? (
        <div data-showcase="pin" className="relative h-screen w-full overflow-hidden bg-ink">
          <div data-showcase="track" className="flex h-full w-max">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                data-showcase="stage"
                className="relative grid h-full w-screen flex-shrink-0 grid-cols-12 items-center gap-8 px-12"
              >
              {/* Pinned visual */}
              <div className="relative col-span-6 aspect-[4/3] overflow-hidden border border-white/10">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
                        {p.tag} — visual
                      </span>
                      <span className="font-display text-6xl font-bold tracking-tightest text-white/5">
                        {p.index}
                      </span>
                    </div>
                    <div className="font-display text-4xl font-semibold tracking-tightest text-paper/80">
                      {p.name}
                    </div>
                  </div>
                )}
              </div>

              {/* Changing info */}
              <div className="col-span-6 space-y-6">
                <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-wider text-accent/80">
                  <span>{p.index}</span>
                  <span className="h-px w-8 bg-accent/40" />
                  <span>{p.tag}</span>
                </div>
                <h3 className="font-display text-5xl font-semibold leading-tight tracking-tightest text-paper">
                  {p.name}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-gray-soft">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-white/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-gray-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-paper px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-accent"
                  >
                    Live demo <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Mobile fallback — stacked cards
        <div className="space-y-8 px-6 md:px-12">
          {PROJECTS.map((p) => (
            <article key={p.name} className="border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-3 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-wider text-accent/80">
                <span>{p.index}</span>
                <span className="h-px w-6 bg-accent/40" />
                <span>{p.tag}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tightest text-paper">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-soft">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="border border-white/15 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-gray-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-paper"
                >
                  <Github size={12} /> GitHub
                </a>
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-paper px-3 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-ink"
                >
                  Live <ArrowUpRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Full list — always rendered so links are crawlable/accessible.
          On desktop this appears after the pinned showcase. */}
      <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-36">
        <div className="mb-10 eyebrow">All projects</div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {PROJECTS.map((p) => (
            <div
              key={`row-${p.name}`}
              data-row
              className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors duration-300 hover:bg-white/[0.02] md:py-8"
            >
              <div
                data-row-index
                className="col-span-2 font-mono text-sm text-accent/70 md:col-span-1"
              >
                {p.index}
              </div>
              <div className="col-span-7 md:col-span-4">
                <h3 className="font-display text-xl font-semibold tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent md:text-2xl">
                  {p.name}
                </h3>
              </div>
              <div className="col-span-12 hidden text-sm text-gray-soft md:col-span-4 md:block">
                {p.tag} — {p.tech.slice(0, 3).join(', ')}
              </div>
              <div className="col-span-3 flex justify-end gap-3 md:col-span-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on GitHub`}
                  className="text-gray-soft transition-colors duration-300 hover:text-paper"
                >
                  <Github size={18} />
                </a>
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} live demo`}
                  className="text-gray-soft transition-colors duration-300 hover:text-accent"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
