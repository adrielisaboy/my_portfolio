import portrait from '../portait.png';

export const PERSON = {
  brand: 'adriel.dev',
  role: 'Frontend Developer • Creative Builder',
  email: 'hello@adriel.dev',
  modelingPortfolio: 'MODELING_PORTFOLIO_URL',
  portrait,
  socials: {
    github: 'GITHUB_URL',
    linkedin: 'LINKEDIN_URL',
  },
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'certificates', label: 'Certificates', href: '#certificates' },
  { id: 'files', label: 'Files', href: '#files' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML', desc: 'Semantic, accessible markup' },
      { name: 'CSS', desc: 'Layout, motion, design systems' },
      { name: 'JavaScript', desc: 'ES modules, DOM, async' },
      { name: 'React', desc: 'Hooks, composition, state' },
      { name: 'TypeScript', desc: 'Types, inference, safety' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', desc: 'Version control workflows' },
      { name: 'GitHub', desc: 'PRs, issues, CI' },
      { name: 'REST APIs', desc: 'Integration & data fetching' },
    ],
  },
  {
    title: 'Other',
    items: [
      { name: 'Cybersecurity Fundamentals', desc: 'Secure frontend practices' },
      { name: 'UI/UX', desc: 'Layout, hierarchy, motion' },
      { name: 'Responsive Design', desc: '320px → 1440px+' },
    ],
  },
];

export const PROJECTS = [
  {
    index: '01',
    name: 'Weather Dashboard',
    description:
      'A real-time weather app with location search, 7-day forecast cards, and an animated conditions view. Fetches live data from a public REST API and renders it with a clean, responsive layout.',
    tech: ['React', 'JavaScript', 'REST API', 'CSS'],
    github: 'GITHUB_URL',
    demo: 'LIVE_DEMO_URL',
    tag: 'Web App',
  },
  {
    index: '02',
    name: 'TakeNote',
    description:
      'A lightweight, keyboard-friendly note app with local persistence, markdown-style formatting, and quick search. Built to be fast and distraction-free.',
    tech: ['React', 'TypeScript', 'LocalStorage'],
    github: 'GITHUB_URL',
    demo: 'LIVE_DEMO_URL',
    tag: 'Productivity',
  },
  {
    index: '03',
    name: 'Sklit',
    description:
      'An experimental landing experience with GSAP-driven scroll choreography, pinned sections, and a type-led hero. A study in motion as a design material.',
    tech: ['React', 'GSAP', 'ScrollTrigger', 'Vite'],
    github: 'GITHUB_URL',
    demo: 'LIVE_DEMO_URL',
    tag: 'Experiment',
  },
  {
    index: '04',
    name: 'Productivity App',
    description:
      'A task manager with drag-to-reorder, priority lanes, and a focus timer. Designed around a minimal interface that stays out of the way of deep work.',
    tech: ['React', 'TypeScript', 'CSS'],
    github: 'GITHUB_URL',
    demo: 'LIVE_DEMO_URL',
    tag: 'Web App',
  },
];

export const EXPERIENCE = [
  {
    period: '2020',
    role: 'Started with HTML & CSS',
    company: 'First steps',
    description:
      'Learnt the foundations of the web by building pages with HTML and CSS, discovering how structure, layout, and visual detail work together.',
  },
  {
    period: '2023',
    role: 'Rebuilt the fundamentals',
    company: 'HTML • CSS • JavaScript',
    description:
      'Returned to HTML and CSS with a stronger eye for responsive interfaces, then added JavaScript and ES6 to make those interfaces interactive.',
  },
  {
    period: '2024',
    role: 'Freelance frontend developer',
    company: 'Independent work',
    description:
      'Completed two freelance jobs, translating client needs into responsive, polished web experiences and gaining real-world delivery experience.',
  },
  {
    period: '2025',
    role: 'A deliberate break',
    company: 'Reset & recalibrate',
    description:
      'Took a big break from active building, creating space to reset, reflect, and return with a clearer direction for the work ahead.',
  },
  {
    period: '2026 — Present',
    role: 'Building the career',
    company: 'Codveda Technologies • HSL • VONKETA',
    description:
      'Back in action through personal projects, a Codveda internship, and collaborative work with teams at HSL and VONKETA. Building momentum, learning in public, and growing a career in frontend development.',
  },
];

export const CERTIFICATES = [
  {
    title: 'Certificate title',
    issuer: 'Issuing organization',
    year: '2026',
    href: '/files/certificate.pdf',
    image: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A record of a completed course, milestone, or achievement. Replace this text with the story behind the certificate.',
  },
  {
    title: 'Accolade or recognition',
    issuer: 'Organization or community',
    year: '2026',
    href: '/files/accolade.pdf',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Recognition for the work, consistency, and contribution behind the projects I build.',
  },
];

export const FILES = [
  { title: 'Curriculum vitae', description: 'A concise overview of my experience and skills.', href: '/files/cv.pdf' },
  { title: 'Mission statement', description: 'The principles and direction behind my work.', href: '/files/mission-statement.pdf' },
  { title: 'Portfolio document', description: 'Selected work, capabilities, and project context.', href: '/files/portfolio.pdf' },
];
