/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f8f8f8',
          100: '#f3f3f3',
          200: '#ededed',
          300: '#e8e8e8',
          400: '#e2e2e2',
          500: '#dbdbdb',
          600: '#c7c7c7',
          700: '#8f8f8f',
          800: '#858585',
          900: '#6f6f6f',
          950: '#171717',
        },
        violet: {
          50: '#fbfaff',
          100: '#f5f2ff',
          200: '#ede9fe',
          300: '#e4defc',
          400: '#d7cff9',
          500: '#c4b8f3',
          600: '#aa99ec',
          700: '#6e56cf',
          800: '#644fc1',
          900: '#5746af',
          950: '#20134b',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
