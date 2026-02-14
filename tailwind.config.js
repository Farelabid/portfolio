/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Unbounded', 'sans-serif'],
        'body': ['Instrument Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#0C0A09',
          surface: '#1C1917',
          raised: '#292524',
          accent: '#F97316',
          glow: '#FB923C',
          muted: '#A8A29E',
        }
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reveal': 'fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}