import { PERSON } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-12" aria-label="Footer">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="font-display text-lg font-semibold tracking-tightest text-paper">
            {PERSON.brand}
          </div>
          <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
            {PERSON.role}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8">
          <nav className="flex gap-5" aria-label="Footer navigation">
            <a href="#home" className="link-underline font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft hover:text-paper">
              Home
            </a>
            <a href="#projects" className="link-underline font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft hover:text-paper">
              Projects
            </a>
            <a href="#contact" className="link-underline font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft hover:text-paper">
              Contact
            </a>
          </nav>
          <div className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-soft">
            © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
