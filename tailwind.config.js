/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      ibmsans: ['IBM Plex Sans', 'sans-serif'],
      worksans: ['Work Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

