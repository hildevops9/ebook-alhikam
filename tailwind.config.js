/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f0', 100: '#f9edd8', 200: '#f2d9b0',
          300: '#e8bf80', 400: '#db9f4e', 500: '#cc852f',
          600: '#b36a24', 700: '#8f511f', 800: '#6b3a1f', 900: '#4a2814',
        },
        ink: {
          50: '#f2f0eb', 100: '#ddd9cc', 200: '#b8b09c',
          300: '#8e846a', 400: '#6b6149', 500: '#4a4232',
          600: '#352f23', 700: '#251f18', 800: '#18130e', 900: '#0e0c09',
        }
      },
      fontFamily: {
        arabic: ['Scheherazade New', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}