/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090D', // deep background
          900: '#0B0E14', // main canvas
          850: '#111622', // elevated card
          800: '#171F2E', // interactive surface
          750: '#1E283B', // border subtle
          700: '#2A364F', // border prominent
          600: '#425272', // muted elements
          400: '#8A99B5', // secondary text
          200: '#CBD5E1', // primary text muted
          50: '#F8FAFC',  // high contrast white text
        },
        macro: {
          energy: '#F59E0B',   // Gold/Amber
          protein: '#06B6D4',  // Cyan/Electric Blue
          carbs: '#10B981',    // Emerald/Mint
          fat: '#8B5CF6',      // Amethyst/Violet
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
