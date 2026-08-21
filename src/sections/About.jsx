import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';
import { PERSON } from '../data/content.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Eyebrow + heading lines (masked reveal)
      tl.from('[data-about="eyebrow"]', { opacity: 0, y: 16, duration: 0.6 })
        .from(
          '[data-about="line"]',
          { yPercent: 110, duration: 0.9, stagger: 0.12, ease: EASE.out },
          '-=0.3',
        )
        .from('[data-about="copy"]', { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, '-=0.4')
        .from('[data-about="tag"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.05 }, '-=0.3');

      // Visual block — clip reveal + subtle horizontal drift
      gsap.fromTo(
        '[data-about="visual"]',
        { clipPath: 'inset(0% 0% 100% 0%)', x: -40 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          x: 0,
          duration: 1.1,
          ease: EASE.out,
          scrollTrigger: {
            trigger: '[data-about="visual"]',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Subtle parallax on the visual as the user scrolls past
      gsap.to('[data-about="visual-inner"]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-about="visual"]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36"
      aria-label="About"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <div data-about="eyebrow" className="eyebrow">
            01 — About
          </div>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl">
            <span className="line-mask">
              <span data-about="line" className="block">
                A frontend developer
              </span>
            </span>
            <span className="line-mask">
              <span data-about="line" className="block">
                who cares about the details.
              </span>
            </span>
          </h2>

          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-gray-soft md:text-lg">
            <p data-about="copy">
              I&apos;m a frontend developer focused on building useful, polished digital
              experiences. I work primarily with <span className="text-paper">HTML</span>,{' '}
              <span className="text-paper">CSS</span>, and{' '}
              <span className="text-paper">JavaScript</span>, and build interfaces with{' '}
              <span className="text-paper">React</span> and{' '}
              <span className="text-paper">TypeScript</span>.
            </p>
            <p data-about="copy">
              I connect frontends to <span className="text-paper">REST APIs</span>, care about
              responsive and accessible UI, and pay attention to motion as part of the design.
              Alongside frontend work, I keep learning{' '}
              <span className="text-paper">cybersecurity fundamentals</span> — secure-by-default
              thinking makes better interfaces.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'REST APIs', 'Cybersecurity'].map(
              (t) => (
                <span
                  key={t}
                  data-about="tag"
                  className="border border-white/12 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="md:col-span-5">
          <div
            data-about="visual"
            className="relative aspect-[4/5] overflow-hidden"
          >
            <div
              data-about="visual-inner"
              className="absolute inset-0"
            >
              <img
                src={PERSON.portrait}
                alt="Portrait"
                className="h-full w-full object-contain object-bottom grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
