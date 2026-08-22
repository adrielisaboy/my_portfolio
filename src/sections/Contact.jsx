import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mail, Github, Linkedin } from 'lucide-react';
import { PERSON } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const root = useRef(null);
  const arrow = useRef(null);
  const cta = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Heading + links reveal
      gsap.from('[data-contact="head"]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      gsap.from('[data-contact="link"]', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-contact="links"]', start: 'top 85%' },
      });

      // Continuous subtle floating arrow
      gsap.to(arrow.current, {
        y: -8,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root },
  );

  // Hover the big CTA — arrow travels + accent sweep
  const onCtaEnter = () => {
    if (prefersReducedMotion() || !cta.current) return;
    gsap.to(cta.current, { color: '#25e3e8', duration: 0.4, ease: EASE.out });
    gsap.to(arrow.current, { x: 10, y: -10, duration: 0.5, ease: EASE.out });
  };
  const onCtaLeave = () => {
    if (prefersReducedMotion() || !cta.current) return;
    gsap.to(cta.current, { color: '#f4f4f2', duration: 0.4, ease: EASE.out });
    gsap.to(arrow.current, { x: 0, y: 0, duration: 0.5, ease: EASE.out });
  };

  const links = [
    { label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}`, icon: Mail },
    { label: 'GitHub', value: PERSON.socials.github, href: PERSON.socials.github, icon: Github },
    { label: 'LinkedIn', value: PERSON.socials.linkedin, href: PERSON.socials.linkedin, icon: Linkedin },
  ];

  return (
    <section
      id="contact"
      ref={root}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-[1600px]">
        <div data-contact="head" className="eyebrow">
          08 — Contact
        </div>

        <a
          ref={cta}
          href={`mailto:${PERSON.email}`}
          onMouseEnter={onCtaEnter}
          onMouseLeave={onCtaLeave}
          onFocus={onCtaEnter}
          onBlur={onCtaLeave}
          className="group mt-8 block"
        >
          <h2
            data-contact="head"
            className="grid grid-cols-12 items-start font-display text-[12vw] font-bold leading-[0.9] tracking-tightest text-paper sm:text-[9vw] lg:text-[8vw]"
          >
            <span className="col-span-5 block">
              Let&apos;s
              <br />
              build
            </span>
            <span className="relative col-span-7 block text-accent">
              something.
              <span
                ref={arrow}
                className="absolute right-0 top-0 inline-flex text-accent"
                style={{ willChange: 'transform' }}
                aria-hidden="true"
              >
                <ArrowUpRight size={48} strokeWidth={2.5} />
              </span>
            </span>
          </h2>
        </a>

        <div
          data-contact="links"
          className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3"
        >
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                data-contact="link"
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="text-gray-soft transition-colors duration-300 group-hover:text-accent"
                  />
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
                    {link.label}
                  </span>
                </span>
                <span className="font-display text-sm font-medium tracking-tight text-paper">
                  {link.value}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
