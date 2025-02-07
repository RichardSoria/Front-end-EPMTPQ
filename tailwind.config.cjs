/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-blue':'#21327e',
        'custom-grey':'#cdcdcd',
        'custom-red':'#e5252b',
        'custom-light-blue':'#1076bc',
        'custom-yellow':'#e4c54c'
      }
    },
  },
  plugins: [],
}

