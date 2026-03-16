/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        apple: {
          gray: '#f5f5f7',
          text: '#1d1d1f',
          secondary: '#86868b',
          blue: '#0071e3',
          blueHover: '#0077ed',
        },
      },
    },
  },
  plugins: [],
};
