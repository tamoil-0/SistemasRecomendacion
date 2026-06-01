/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22D3EE',
        health: '#22C55E',
        ink: '#E2E8F0',
        night: '#07111F',
        electric: '#2563EB',
      },
      boxShadow: {
        panel: '0 20px 60px rgba(2, 6, 23, 0.35)',
        glow: '0 0 36px rgba(34, 211, 238, 0.28)',
      },
    },
  },
  plugins: [],
}

