/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/index.html",
    "./static/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          '50': '#fdf2f2',
          '100': '#fde8e8',
          '200': '#fbd5d5',
          '300': '#f8b4b4',
          '400': '#f98080',
          '500': '#f05252',
          '600': '#e02424',
          '700': '#c81e1e',
          '800': '#9b1c1c',
          '900': '#771d1d',
          // '490': '#FF0000', // Custom shade
        },
      },
    },
  },
  plugins: [],
}

