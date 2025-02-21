/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA',
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        secondary: {
          light: '#A5B4FC',
          DEFAULT: '#6366F1',
          dark: '#4338CA',
        },
        accent: {
          light: '#C4B5FD',
          DEFAULT: '#8B5CF6',
          dark: '#5B21B6',
        },
        background: {
          light: '#F3F4F6',
          dark: '#1F2937',
        }
      },
    },
  },
  plugins: [],
}