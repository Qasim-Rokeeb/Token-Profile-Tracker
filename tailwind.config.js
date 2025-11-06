/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3396FF',
        dark: '#1a1b1f',
        'dark-lighter': '#2d2e32',
      }
    },
  },
  plugins: [],
}