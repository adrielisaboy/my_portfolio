import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { PERSON } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const root = useRef(null);
  const arrow = useRef(null);
  const cta = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email);
    } catch {
      const input = document.createElement('textarea');
      input.value = PERSON.email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
  };

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
    { label: 'Email', href: `mailto:${PERSON.email}`, icon: Mail },
    { label: 'GitHub', href: PERSON.socials.github, icon: Github },
    { label: 'LinkedIn', href: PERSON.socials.linkedin, icon: Linkedin },
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
          className="group mt-8 block max-w-[1200px]"
        >
          <h2
            data-contact="head"
            className="font-display text-[12vw] font-bold leading-[0.95] tracking-tightest text-paper sm:text-[9vw] lg:text-[8vw]"
          >
            <span className="block whitespace-nowrap">Let&apos;s build</span>
            <span className="flex items-start gap-4">
              <span className="text-accent">something.</span>
              <span
                ref={arrow}
                className="mt-2 inline-flex shrink-0 text-accent"
                style={{ willChange: 'transform' }}
                aria-hidden="true"
              >
                <ArrowUpRight size={48} strokeWidth={2.5} />
              </span>
            </span>
          </h2>
        </a>

        <div data-contact="head" className="mt-8 flex flex-wrap items-center gap-4">
          <span className="font-mono text-sm tracking-wide text-gray-soft">{PERSON.email}</span>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-paper transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
          </button>
        </div>

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
