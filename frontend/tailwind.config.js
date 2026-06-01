/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0D0B1A',
          900: '#1A1035',
          800: '#25164A',
          700: '#3B1F8E',
          600: '#4A2AAE',
          500: '#6B4ED8',
          400: '#9A7BFF',
          300: '#B9A4FF',
          200: '#D5CBFF',
          100: '#EAE4FF',
          50: '#F5F2FF',
        },
        surface: {
          50: '#F8F9FC',
          100: '#F1F3F7',
          200: '#ECEEF2',
          300: '#E2E5EB',
          400: '#D1D5DB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        card: '0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.03)',
        elevated: '0 4px 20px rgba(0,0,0,0.05), 0 12px 40px rgba(0,0,0,0.04)',
        heavy: '0 12px 48px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
        glow: '0 0 40px rgba(74, 42, 174, 0.12)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
}
