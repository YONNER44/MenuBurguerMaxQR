/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F5C014',
          dim: '#c99a00',
          dark: '#a37f00',
        },
        brand: {
          bg:     '#0d0d0d',
          card:   '#1a1a1a',
          border: '#2a2a2a',
          muted:  '#888888',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
