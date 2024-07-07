/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container : {
      center : true,
      padding : '16px'
    },
    extend: {
      colors : {
        primary : "#16a34a",
      }
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1340px',
    },
  },
  plugins: [],
}