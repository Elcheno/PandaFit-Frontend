/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#57AD57',
        'green-dark': '#2C5A2E',
        'green-light': '#9ED79F',
        'black-primary': '#27272A',
        'black-secondary': '#3F3F46'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
