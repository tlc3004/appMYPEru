/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'mype-rojo': '#B91C1C',
        'mype-verde': '#16A34A',
        'mype-azul': '#1E3A8A',
      },
    },
  },
  plugins: [],
}
