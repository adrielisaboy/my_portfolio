/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        paper: '#f4f4f2',
        'gray-soft': '#9a9a9f',
        accent: '#25e3e8',
        'accent-deep': '#0fb5ba',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        wider: '0.22em',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
