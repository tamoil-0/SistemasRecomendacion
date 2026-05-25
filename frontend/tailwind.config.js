/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B4F8A',
        health: '#2E7D32',
        ink: '#1F2937',
      },
      boxShadow: {
        panel: '0 8px 24px rgba(31, 41, 55, 0.08)',
      },
    },
  },
  plugins: [],
}

