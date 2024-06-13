/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { screens: {
      'custom-md-lg': '1024px',
      'custom-lg': '1400px',
    },},
  },
  plugins: [],
}