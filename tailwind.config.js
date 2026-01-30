/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a12',
          card: '#13131f',
          primary: '#00f0ff', // Cyan
          secondary: '#7000df', // Purple
          accent: '#ff003c', // Red/Pink
          success: '#39ff14', // Green
          warning: '#fdfd00', // Yellow
        }
      },
      fontFamily: {
        sans: ['"Microsoft JhengHei"', 'sans-serif'], // Better for TC
      },
      boxShadow: {
        'neon-blue': '0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-pink': '0 0 10px rgba(255, 0, 60, 0.7), 0 0 20px rgba(255, 0, 60, 0.5)',
        'neon-green': '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)',
      }
    },
  },
  plugins: [],
}
