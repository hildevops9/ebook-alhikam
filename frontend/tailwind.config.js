/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#f9edd8',
          200: '#f2d9b0',
          300: '#e8bf80',
          400: '#db9f4e',
          500: '#cc852f',
          600: '#b36a24',
          700: '#8f511f',
          800: '#6b3a1f',
          900: '#4a2814',
        },
        ink: {
          50: '#f2f0eb',
          100: '#ddd9cc',
          200: '#b8b09c',
          300: '#8e846a',
          400: '#6b6149',
          500: '#4a4232',
          600: '#352f23',
          700: '#251f18',
          800: '#18130e',
          900: '#0e0c09',
        }
      },
      fontFamily: {
        arabic: ['Scheherazade New', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'geometric': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cc852f' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
