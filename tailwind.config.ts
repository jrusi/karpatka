import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        frost: '#F6F9FC',
        paper: '#EAF1F8',
        powder: '#DCEAF6',
        'line-blue': '#7FA7CB',
        'deep-blue': '#2F4F73',
        'deep-blue-2': '#203A56',
        'accent-blue': '#2F80C4',
        'red-deep': '#B93830',
        purple: '#8B5FBF',
        red: '#E0473E',
        ink: '#1F2E3D',
        'ink-soft': '#57728A',
        ice: '#8FC7EE',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        draw: {
          to: { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        draw: 'draw 2.6s ease forwards .2s',
      },
    },
  },
  plugins: [],
}
