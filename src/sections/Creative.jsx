import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { PERSON } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Clearly-marked editorial placeholder images — replace with your own photos.
const PLACEHOLDER_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/3754152/pexels-photo-3754152.jpeg?auto=compress&cs=tinysrgb&h=900',
    alt: 'Editorial fashion placeholder — elegant portrait in soft light. Replace with your own photo.',
    label: 'fig. 01',
  },
  {
    src: 'https://images.pexels.com/photos/38301484/pexels-photo-38301484.jpeg?auto=compress&cs=tinysrgb&h=900',
    alt: 'Editorial fashion placeholder — model silhouette with striking light. Replace with your own photo.',
    label: 'fig. 02',
  },
];

export default function Creative() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Heading reveal
      gsap.from('[data-creative="head"]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-creative="head"]', start: 'top 80%' },
      });

      // Image reveal — clip-path wipe + scale
      gsap.utils.toArray('[data-creative="img-wrap"]').forEach((wrap) => {
        const img = wrap.querySelector('[data-creative="img"]');
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: EASE.out,
            scrollTrigger: { trigger: wrap, start: 'top 85%', toggleActions: 'play none none reverse' },
          },
        );
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.4,
            ease: EASE.out,
            scrollTrigger: { trigger: wrap, start: 'top 85%', toggleActions: 'play none none reverse' },
          },
        );
      });

      // Parallax — image moves slower than scroll
      gsap.utils.toArray('[data-creative="img"]').forEach((img) => {
        gsap.to(img, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Caption reveal
      gsap.from('[data-creative="caption"]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-creative="caption"]', start: 'top 85%' },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="creative"
      ref={root}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
      aria-label="Modeling portfolio"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div data-creative="head" className="eyebrow">
              05 — Modeling
            </div>
            <h2
              data-creative="head"
              className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-7xl"
            >
              A different kind of frame.
            </h2>
          </div>
          <p data-creative="head" className="max-w-sm text-sm leading-relaxed text-gray-soft md:col-span-4">
            Modeling is a separate creative practice. View the portfolio for selected work, images,
            and collaborations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          {PLACEHOLDER_IMAGES.map((img, i) => (
            <figure
              key={img.src}
              className={`relative overflow-hidden border border-white/10 bg-white/[0.02] ${
                i === 0 ? 'md:col-span-7 aspect-[4/5]' : 'md:col-span-5 aspect-[4/5] md:mt-16'
              }`}
            >
              <div data-creative="img-wrap" className="absolute inset-0">
                <img
                  data-creative="img"
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ willChange: 'transform' }}
                />
              </div>
              <figcaption className="absolute left-4 top-4 z-10 font-mono text-[0.6rem] uppercase tracking-wider text-paper/70 mix-blend-difference">
                {img.label} — placeholder
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 max-w-xl space-y-4">
          <p data-creative="caption" className="text-base leading-relaxed text-gray-soft md:text-lg">
            A portfolio for presence, composition, and collaboration.
          </p>
          <a
            data-creative="caption"
            href={PERSON.modelingPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-wider text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Visit modeling portfolio <ArrowUpRight size={14} />
          </a>
          <p data-creative="caption" className="font-mono text-[0.65rem] uppercase tracking-wider text-accent/70">
            // images above are placeholders — replace with your own
          </p>
        </div>
      </div>
    </section>
  );
}
