/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        blck: {
          50: '#2C2C2C',
          100: '#2B2B2B',
          200: '#202020',
          300: '#1E1E1E',
          400: '#1C1C1C',
          500: '#1A1A1A',
          600: '#191919',
          700: '#161616',
          800: '#121212',
          900: '#101010',
          950: '#111111',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

