import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { PERSON, NAV_ITEMS } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';
import { useReducedMotion } from '../hooks/useMediaQuery.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Navigation() {
  const nav = useRef(null);
  const indicator = useRef(null);
  const menuBtn = useRef(null);
  const overlay = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [lightMode, setLightMode] = useState(() => localStorage.getItem('theme') === 'light');
  const reduced = useReducedMotion();

  useGSAP(() => {
    document.documentElement.dataset.theme = lightMode ? 'light' : 'dark';
    localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  }, { dependencies: [lightMode], scope: nav });

  // Scroll-aware styling + active section tracking via ScrollTrigger
  useGSAP(
    () => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      // Track which section is in view
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(item.id),
        });
      });

      return () => window.removeEventListener('scroll', onScroll);
    },
    { scope: nav },
  );

  // Animate the active indicator underline to the active link
  useGSAP(
    () => {
      if (!indicator.current) return;
      const target = nav.current?.querySelector(`[data-nav="${active}"]`);
      if (!target) return;
      const navRect = nav.current.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      gsap.to(indicator.current, {
        x: r.left - navRect.left,
        width: r.width,
        duration: reduced ? 0 : 0.4,
        ease: EASE.out,
      });
    },
    { dependencies: [active, reduced], scope: nav },
  );

  // Fullscreen mobile menu open/close
  useGSAP(
    () => {
      if (!overlay.current) return;
      if (menuOpen) {
        document.body.classList.add('no-scroll');
        const links = overlay.current.querySelectorAll('[data-menu-link]');
        if (reduced) {
          gsap.set(overlay.current, { autoAlpha: 1 });
          gsap.set(links, { autoAlpha: 1, y: 0 });
          return;
        }
        const tl = gsap.timeline();
        tl.set(overlay.current, { autoAlpha: 1 });
        tl.fromTo(
          overlay.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: EASE.inOut },
        );
        tl.fromTo(
          links,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: EASE.out, stagger: 0.06 },
          '-=0.25',
        );
      } else {
        document.body.classList.remove('no-scroll');
        if (reduced) {
          gsap.set(overlay.current, { autoAlpha: 0 });
          return;
        }
        gsap.to(overlay.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.5,
          ease: EASE.inOut,
          onComplete: () => gsap.set(overlay.current, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [menuOpen, reduced], scope: nav },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={nav}
      className="fixed inset-x-0 top-0 z-50"
      aria-label="Primary navigation"
    >
      <div
        className={`border-b transition-colors duration-500 ${
          scrolled
            ? 'border-white/10 bg-ink/80 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <a href="#home" className="font-display text-lg font-semibold tracking-tightest text-paper" aria-label="adriel.dev — home">
            {PERSON.brand}
          </a>

          {/* Desktop links */}
          <ul className="relative hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  data-nav={item.id}
                  href={item.href}
                  className={`font-mono text-[0.72rem] uppercase tracking-wider transition-colors duration-300 ${
                    active === item.id ? 'text-paper' : 'text-gray-soft hover:text-paper'
                  }`}
                  aria-current={active === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <span
              ref={indicator}
              className="pointer-events-none absolute -bottom-2 left-0 h-px bg-accent"
              style={{ width: 0 }}
              aria-hidden="true"
            />
          </ul>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setLightMode((mode) => !mode)}
              className="text-paper transition-colors hover:text-accent"
              aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {lightMode ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-paper md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        ref={overlay}
        id="mobile-menu"
        className="absolute inset-0 top-full h-[100vh] w-full origin-top bg-ink md:hidden"
        style={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, visibility: 'hidden' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-6">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id} data-menu-link>
              <a
                href={item.href}
                onClick={closeMenu}
                className="group flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tightest text-paper xs:text-6xl"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="link-underline">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
