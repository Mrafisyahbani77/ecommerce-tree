/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#16a34a',
        secondary: '#fafafa',
        success: '#22c55e',
        warning: '#fde047',
        bird: '#06b6d4',
      },
    },
    screens: {
      sm: '576px',
      md: '860px',
      lg: '1240px',
    },
  },
  plugins: [],
};
