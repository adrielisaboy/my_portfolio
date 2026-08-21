import { useRef } from 'react';
import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, BriefcaseBusiness, FileText, ScrollText } from 'lucide-react';
import { FILES } from '../data/content.js';
import { prefersReducedMotion, EASE } from '../animations/gsap.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Files() {
  const root = useRef(null);
  const [selectedFile, setSelectedFile] = useState(0);
  const fileIcons = [FileText, ScrollText, BriefcaseBusiness];
  const activeFile = FILES[selectedFile];

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from('[data-files="item"]', {
      opacity: 0,
      y: 32,
      duration: 0.7,
      ease: EASE.out,
      stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: 'top 78%' },
    });
  }, { scope: root });

  return (
    <section
      id="files"
      ref={root}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
      aria-label="Professional files"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow">07 — Files</div>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tightest text-paper sm:text-5xl lg:text-6xl">
            A closer look.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.5fr)] md:items-center md:gap-16">
          <div className="mx-auto grid w-full max-w-[22rem] grid-cols-3 gap-px border border-white/10 bg-white/10">
            {FILES.map((file, index) => {
              const Icon = fileIcons[index] || FileText;
              const isSelected = selectedFile === index;
              return (
                <button
                  key={file.title}
                  type="button"
                  data-files="item"
                  onClick={() => setSelectedFile(index)}
                  aria-label={`Show ${file.title}`}
                  aria-pressed={isSelected}
                  className={`group flex aspect-square items-center justify-center bg-ink transition-colors duration-300 ${isSelected ? 'bg-white/[0.08] text-accent' : 'text-gray-soft hover:bg-white/[0.04] hover:text-paper'}`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </button>
              );
            })}
          </div>

          <div data-files="detail" className="border-y border-white/10 py-8 md:py-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-accent/80">
                  File {String(selectedFile + 1).padStart(2, '0')} / {String(FILES.length).padStart(2, '0')}
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tightest text-paper sm:text-4xl">
                  {activeFile.title}
                </h3>
              </div>
              <FileText size={24} className="shrink-0 text-gray-soft" strokeWidth={1.5} />
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-soft md:text-lg">
              {activeFile.description}
            </p>
            <a
              href={activeFile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-paper px-4 py-3 font-mono text-[0.65rem] uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-accent"
            >
              Open document <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
