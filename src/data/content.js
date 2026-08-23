import portrait from '../portait.png';
import imgCraywave from '../assets/images/craywave.png';
import imgAdrielDev from '../assets/images/adriel-dev.png';
import imgAtmos from '../assets/images/atmos.png';
import imgVonketa from '../assets/images/vonketa.png';

export const PERSON = {
  brand: 'adriel.dev',
  role: 'Frontend Developer • Creative Builder',
  email: 'jeffadr46@gmail.com',
  modelingPortfolio: 'MODELING_PORTFOLIO_URL',
  portrait,
  socials: {
    github: 'https://github.com/adrielisaboy',
    linkedin: 'https://www.linkedin.com/in/jeffrey-oleabhie-b1529a405',
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
    name: 'CrayWave',
    description:
      'A modern music discovery and streaming experience built around effortless search, smooth playback, and personalized listening. Connects users to a wide range of tracks through external music APIs with a clean, intuitive interface.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express', 'Gemini API', 'YouTube API'],
    github: 'https://github.com/adrielisaboy/CrayWave',
    demo: 'https://cray-wave.vercel.app',
    tag: 'Web App',
    image: imgCraywave,
  },
  {
    index: '02',
    name: 'ADRiEL.DEV',
    description:
      'A premium, editorial-style personal portfolio showcasing frontend development, creative work, experience, skills, and projects — with advanced GSAP animations and ScrollTrigger interactions.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'ScrollTrigger'],
    github: 'https://github.com/adrielisaboy/my_portfolio',
    demo: 'https://jeffreyadrielo.vercel.app',
    tag: 'Portfolio',
    image: imgAdrielDev,
  },
  {
    index: '03',
    name: 'Atmos Weather',
    description:
      'A responsive weather dashboard for viewing weather information through a clean, visual interface with charts and data-focused weather displays.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Recharts', 'Lucide React'],
    github: 'https://github.com/adrielisaboy/atmos-weather',
    demo: 'https://atmosbyadriel.vercel.app',
    tag: 'Web App',
    image: imgAtmos,
  },
  {
    index: '04',
    name: 'Vonketa Interiors',
    description:
      'A modern interior-design website designed to showcase interior design services, projects, and a polished visual brand experience.',
    tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'Framer Motion', 'Radix UI', 'React Query'],
    github: 'https://github.com/adrielisaboy/vonketa-interiors',
    demo: 'https://vonketainteriors.vercel.app',
    tag: 'Business Website',
    image: imgVonketa,
  },
  {
    index: '05',
    name: 'Sklit',
    description:
      'A modern social publishing platform inspired by Substack, designed for writers and creators to publish posts, build an audience, and engage with a community around their ideas and content.',
    tech: ['React', 'TypeScript/JavaScript', 'Vite', 'CSS', 'REST APIs'],
    github: 'https://github.com/adrielisaboy/sklit',
    demo: 'https://sklit.vercel.app',
    tag: 'Social Platform / Web App',
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
      'Took a big break from active building, creating space to reset, reflect, and return with a clearer direction for the work ahead. Used the time to learn React, TypeScript, and Tailwind CSS — building a stronger foundation for modern frontend development.',
  },
  {
    period: '2026 — Present',
    role: 'Building the career',
    company: 'Codveda Technologies • HSL • VONKETA',
    description:
      'Back in action through personal projects, a Codveda internship, and collaborative work with teams at HSL and VONKETA. Building momentum, learning in public, and growing a career in frontend development. Presently learning Next.js, Java, Flutter, and cybersecurity fundamentals.',
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
