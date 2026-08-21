import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, ArrowUpRight } from 'lucide-react';
import { CERTIFICATES } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Certificates() {
  const root = useRef(null);
  const stages = useRef([]);

  useGSAP(() => {
    const items = stages.current.filter(Boolean);
    if (!items.length || prefersReducedMotion()) return;

    gsap.set(items.slice(1), { opacity: 0, scale: 0.65 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-certificates="pin"]',
        start: 'top top',
        end: `+=${Math.max(items.length - 1, 1) * 180}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        snap: { snapTo: 1 / Math.max(items.length - 1, 1), duration: 0.35, ease: EASE.out },
      },
    });

    items.forEach((item, index) => {
      if (index === 0) return;
      timeline.to(items[index - 1], { scale: 1.75, opacity: 0, duration: 1, ease: 'power2.in' });
      timeline.to(item, { scale: 1, opacity: 1, duration: 1, ease: EASE.out });
    });
  }, { scope: root });

  return (
    <section id="certificates" ref={root} className="relative border-t border-white/10" aria-label="Certificates and accolades">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12 md:pt-36">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">06 — Certificates &amp; Accolades</div>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl">
              Proof of the work.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-gray-soft">
            Scroll through each certificate as it zooms forward and gives way to the next.
          </p>
        </div>
      </div>

      <div data-certificates="pin" className="relative h-screen min-h-[42rem] overflow-hidden bg-ink">
        {CERTIFICATES.map((certificate, index) => (
          <div
            key={`${certificate.title}-${certificate.year}`}
            ref={(element) => { stages.current[index] = element; }}
            className="absolute inset-0 grid grid-cols-12 items-center gap-8 px-6 md:px-12"
            style={{ zIndex: CERTIFICATES.length - index }}
          >
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-wider text-accent/80">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-accent/40" />
                <span>{certificate.year}</span>
              </div>
              <h3 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl">
                {certificate.title}
              </h3>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
                {certificate.issuer}
              </p>
              <p className="mt-8 max-w-md text-base leading-relaxed text-gray-soft md:text-lg">
                {certificate.description}
              </p>
              <a
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-paper px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-accent"
              >
                View certificate <ArrowUpRight size={15} />
              </a>
            </div>

            <a
              href={certificate.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${certificate.title}`}
              className="group col-span-12 flex justify-center md:col-span-6"
            >
              <div className="relative aspect-square w-[min(76vw,34rem)] overflow-hidden rounded-full border border-accent/40 bg-white/[0.04] p-3 transition-colors duration-500 group-hover:border-accent md:w-[min(42vw,34rem)]">
                <div className="h-full w-full overflow-hidden rounded-full border border-white/15">
                  <img src={certificate.image} alt="" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-ink/80 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-paper backdrop-blur-sm">
                  <Award size={14} className="text-accent" /> View document
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
