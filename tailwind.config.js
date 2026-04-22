/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./i18n.json"],
  darkMode: 'class',
  theme: {
      extend: {
          fontFamily: {
              sans: ['Nunito', 'sans-serif'],
          },
          colors: {
              'game-bg': '#FFF5E6',
              'game-card': 'rgba(255, 255, 255, 0.9)',
              'game-border': 'rgba(251, 146, 60, 0.2)',
              'cat-orange': '#f97316',
              'cat-light': '#fdba74',
              'cat-dark': '#c2410c',
              'cat-text': '#431407',
          },
          boxShadow: {
              'cat-glow': '0 0 15px rgba(249, 115, 22, 0.3)',
              'glass': '0 8px 32px 0 rgba(249, 115, 22, 0.1)',
          }
      }
  },
  plugins: [],
}