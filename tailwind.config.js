/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#57AD57',
        'black-primary': '#000000'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

