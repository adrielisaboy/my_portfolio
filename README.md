# ADRiEL.DEV — Advanced Animations Portfolio

A premium, editorial-style personal portfolio built for the **Codveda Technologies Front-End Development Internship — Level 3, Task 3 (Advanced Animations)**, which I now use as my official Portfolio Website

The project demonstrates advanced, production-quality animation work using **GSAP** and **GSAP ScrollTrigger** — genuinely implemented in the React source, not faked with CSS.

> Identity: **ADRiEL.DEV** — Frontend Developer · Creative Developer · Cybersecurity Enthusiast · Fashion Model.

---

## Stack

- **React 18** + **Vite 5**
- **JavaScript / JSX**
- **CSS** (Tailwind utility layer + a small custom design system)
- **GSAP 3** + **GSAP ScrollTrigger**
- **@gsap/react** (`useGSAP` hook for React-friendly setup + cleanup)
- **lucide-react** for icons

> No Framer Motion. No CSS-animation stand-ins for GSAP.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed URL (usually http://localhost:5173)
```

### Required npm packages

```bash
npm install gsap @gsap/react
```

(`react`, `react-dom`, `vite`, `tailwindcss`, and `lucide-react` are part of the starter template.)

---

## Project structure

```
src/
├── animations/
│   └── gsap.js            # Registers ScrollTrigger, shared eases, motion guards
├── components/
│   ├── Preloader.jsx      # GSAP 0→100 counter + exit timeline
│   ├── Navigation.jsx     # Scroll-aware nav, active indicator, fullscreen mobile menu
│   └── Footer.jsx
├── sections/
│   ├── Hero.jsx           # Entrance timeline + mouse parallax
│   ├── About.jsx          # ScrollTrigger text/visual reveal + parallax
│   ├── Skills.jsx         # Staggered reveal + hover interactions
│   ├── Projects.jsx       # Pinned ScrollTrigger showcase + list reveals
│   ├── Experience.jsx     # Scrubbed timeline-line reveal
│   ├── Creative.jsx       # Image clip-reveal + scroll parallax
│   └── Contact.jsx        # Final reveal + animated arrow + hover CTA
├── hooks/
│   └── useMediaQuery.js   # useReducedMotion + responsive breakpoint hook
├── data/
│   └── content.js         # Person, nav, skills, projects, experience data
├── App.tsx                # Composes sections + preloader → hero flow
├── main.tsx
└── index.css              # Design tokens, fonts, reduced-motion fallbacks
```

---

## How GSAP is used (every major animation)

GSAP imports are kept visible and explicit in each component. All animation setup uses `useGSAP()` from `@gsap/react`, which handles React's strict-mode re-runs and cleans up timelines/triggers on unmount.

### 1. Preloader (`components/Preloader.jsx`)
- A **GSAP timeline** sequence: brand slides up → loading bar scales in → a real GSAP tween animates a counter object from **0 → 100** (rendered into the DOM on `onUpdate`) → bar fills to 100% → brand wipes up → the whole panel wipes up via `yPercent: -100`.
- Reduced-motion: a short tween still updates the number, then fades out.

### 2. Navigation (`components/Navigation.jsx`)
- **ScrollTrigger** instances (one per section) track which section is in view and set the active link.
- A **GSAP tween** animates the active-link indicator (`x` + `width`) whenever the active section changes.
- The navbar background/border switch styling based on `window.scrollY`.
- **Mobile menu**: a **GSAP timeline** opens a fullscreen overlay with a `clipPath` wipe + staggered link entrance, and reverses it on close.

### 3. Hero (`sections/Hero.jsx`)
- A **GSAP timeline** drives the entrance: brand → eyebrow → headline lines (masked `yPercent` reveal) → copy → CTAs (staggered) → decoratives → scroll cue.
- **Mouse parallax**: a `mousemove` listener moves selected decorative elements with depth-based `x/y` transforms (GPU-friendly), tweened with GSAP for smoothness.
- The entrance only fires after the preloader completes (the `ready` prop).

### 4. About (`sections/About.jsx`)
- **ScrollTrigger** reveal: eyebrow → masked headline lines → copy paragraphs → tags, all staggered.
- The visual block uses a **clip-path wipe** (`inset()`) tied to ScrollTrigger.
- A **scrubbed** ScrollTrigger moves the visual inner content on `yPercent` for subtle parallax as the user scrolls past.

### 5. Skills (`sections/Skills.jsx`)
- **ScrollTrigger** staggers the header, then the three category columns, then the individual items.
- **Hover interactions** (GSAP `to`): items shift on `x`, and the supporting description fades/slides in. Also fires on keyboard focus.

### 6. Projects (`sections/Projects.jsx`) — heavy ScrollTrigger
- **Pinned showcase**: the project visual stays pinned while project info cross-fades through each project. Built with `ScrollTrigger.pin: true` + `scrub: 1` and a timeline that toggles `autoAlpha` between stages.
- **Disabled on mobile** (via `useMediaQuery`) — small screens get a clean stacked card list instead, so pinning never hurts UX.
- Below the showcase, each project row has a **scroll reveal** (`y` + `opacity`), and the index numbers have a **scrubbed horizontal drift** (`x` tied to scroll).

### 7. Experience (`sections/Experience.jsx`)
- A **scrubbed ScrollTrigger** progressively scales the vertical timeline line from 0 → 1 as the user scrolls (`scaleY` + `transformOrigin: top`).
- Each item's content, date, and dot have independent **ScrollTrigger reveals** (dates slide in on `x`, content on `y`, dots scale in).

### 8. Creative / Fashion (`sections/Creative.jsx`)
- **Image reveal**: each image wraps in a container that clip-path wipes open, while the inner image scales from 1.3 → 1 (a classic editorial reveal).
- **Parallax**: a scrubbed ScrollTrigger moves each image on `yPercent` so it drifts slower than the scroll.
- Images are clearly-marked editorial placeholders — replace with your own photos.

### 9. Contact (`sections/Contact.jsx`)
- **ScrollTrigger** reveals the heading and the contact links with a stagger.
- The arrow has a **continuous yoyo tween** (subtle floating).
- **Hovering the big CTA**: GSAP tweens the heading color to the accent and moves the arrow on `x/y` — a small, deliberate interaction.

---

## ScrollTrigger usage summary

| Section        | Trigger behavior                                                                 |
| -------------- | -------------------------------------------------------------------------------- |
| Hero           | Entrance timeline (fires on `ready`, not scroll)                                 |
| About          | Toggle reveal + scrubbed parallax on the visual                                  |
| Skills         | Staggered reveals on header, columns, and items                                  |
| Projects       | **Pinned** showcase with `scrub` + list row reveals + scrubbed index drift       |
| Experience     | **Scrubbed** timeline-line growth + per-item reveals                             |
| Creative       | Clip-path image reveals + scrubbed parallax                                      |
| Contact        | Toggle reveal of heading and links                                               |
| Navigation     | Per-section ScrollTriggers drive the active-link indicator                       |

Sensible `start`/`end` values are used (`top 70%`, `top 80%`, `top 85%`, `bottom top`) so the page never depends on extreme scroll distances.

---

## Responsive animation handling

- A `useMediaQuery` hook exposes `useReducedMotion()` and a generic breakpoint check.
- The **Projects pinned showcase** is only created on `min-width: 768px`; mobile renders a stacked card list so pinning never breaks small-screen UX.
- Hero/About typography uses `clamp`-style viewport units (`vw`) so the layout scales fluidly from 320px → 1440px+.
- The mobile navigation uses a GSAP-animated fullscreen overlay instead of a shrunk desktop nav.
- Section spacing and grids switch from single-column to multi-column at the `md` breakpoint.

---

## Accessibility & reduced-motion handling

- A global `prefers-reduced-motion` media query in `index.css` collapses all CSS transitions/animations to near-zero duration.
- A `prefersReducedMotion()` helper in `src/animations/gsap.js` gates every GSAP setup: when reduced motion is on, non-essential animations are **skipped entirely** and content stays visible (no hidden text, no off-screen elements).
- The `useReducedMotion` hook re-checks the setting live, so toggling the OS preference updates the app.
- Keyboard navigation: visible `:focus-visible` outlines (accent color), `aria-current` on the active nav link, `aria-expanded`/`aria-controls` on the mobile menu toggle, semantic landmarks (`header`, `main`, `section`, `footer`), and `aria-label`s on icon-only links.
- Images have descriptive `alt` text; decorative elements are `aria-hidden`.
- Color contrast: near-black background with paper-white text and a sparing electric-cyan accent kept at high-contrast ratios.

---

## Performance optimization

- Animations target **GPU-friendly properties** (`transform`, `opacity`, `clip-path`) — never `width`/`height`/`top`/`left` layout properties.
- `willChange: transform` is set on the few elements that animate continuously (preloader bar, parallax images, contact arrow).
- ScrollTrigger is used with `scrub` values and sensible start/end points to avoid excessive recalculations.
- `useGSAP` automatically cleans up timelines and ScrollTriggers when components unmount, preventing leaks.
- Images use `loading="lazy"`; no large local assets are bundled (editorial placeholders are remote).
- The Projects section kills only its own ScrollTriggers on cleanup, scoped to the section via `root.current.contains`.
- No continuous JS loops — the only repeating tween is the lightweight contact arrow float, and mouse parallax only tweens on actual mouse movement.

---

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

The build is a static SPA — the entire `dist/` folder can be hosted anywhere.

---

## Deployment

Because it's a static Vite SPA, deploy `dist/` to any static host:

- **Netlify**: drag-and-drop the `dist/` folder, or connect the repo with build command `npm run build` and publish directory `dist`.
- **Verccel**: import the repo; framework preset "Vite"; output directory `dist`.
- **GitHub Pages**: build, then publish the `dist/` folder (e.g. via the `actions/deploy-pages` action) — add a `base` path in `vite.config.ts` if served from a sub-path.

---

## Replacing placeholders

All placeholder links/images are centralized in `src/data/content.js`:

- `PERSON.socials.github` / `PERSON.socials.linkedin` — replace `GITHUB_URL` / `LINKEDIN_URL`.
- Each project's `github` and `demo` fields — replace `GITHUB_URL` / `LIVE_DEMO_URL`.
- `PERSON.email` — replace with your email.
- Creative section images (`src/sections/Creative.jsx`, `PLACEHOLDER_IMAGES`) — replace with your own photos.

---

## Codveda Task 3 — Requirements checklist

| Requirement | Status | Where |
| --- | --- | --- |
| Advanced animations | Done | Every section uses GSAP timelines + ScrollTrigger |
| GSAP (genuinely implemented) | Done | Explicit `import gsap from 'gsap'` + timelines in all sections/components |
| GSAP ScrollTrigger | Done | Registered in `animations/gsap.js`; used in Nav, About, Skills, Projects, Experience, Creative, Contact |
| `@gsap/react` (`useGSAP`) | Done | Used for setup + cleanup in every animated component |
| Timeline animations | Done | Preloader, Hero entrance, Navigation mobile menu |
| Stagger animations | Done | Hero lines/CTAs, About copy/tags, Skills columns/items, Contact links |
| Pinning | Done | Projects pinned showcase (`ScrollTrigger.pin: true`) — desktop only |
| Scrub-based animation | Done | About parallax, Experience timeline line, Projects index drift, Creative parallax |
| Interactive elements | Done | Skills hover, Contact CTA hover, Hero mouse parallax, animated nav indicator |
| Page entrance animation | Done | Preloader 0→100 + wipe, Hero entrance timeline |
| Navigation animation | Done | Scroll-aware styling, active indicator tween, fullscreen mobile menu timeline |
| Image reveal / parallax | Done | About visual clip-reveal, Creative image clip-reveal + scrubbed parallax |
| Accessibility | Done | Reduced-motion guards, focus states, ARIA, semantic landmarks, alt text |
| Performance optimization | Done | GPU properties, `willChange`, lazy images, `useGSAP` cleanup, scoped trigger killing |
| Responsive design | Done | Fluid type, breakpoint-based grids, mobile menu, pinning disabled on mobile |
| No Framer Motion | Done | Only GSAP is used for animation |
| No fake CSS animations | Done | All motion is GSAP-driven; CSS only handles hover color transitions |

---

Built as a Codveda Technologies Front-End Development Internship deliverable — Level 3, Task 3.
