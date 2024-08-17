/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelifySans: ['Pixelify Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-bg': "url('./src/assets/pokemon-bg.png')",
        'card-bg': "url('./src/assets/card-bg.jpeg')",
      },
    },
  },
  plugins: [],
}

