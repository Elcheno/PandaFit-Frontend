/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#57AD57',
        'green-dark': '#2C5A2E',
        'green-light': '#6ABB6B',
        'black-primary': '#27272A',
        'black-secondary': '#3F3F46'
      },
      keyframes: {
        opacityIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        opacityIn: 'opacityIn 0.2s ease-in-out'
      }
    }
  },
  plugins: []
};
