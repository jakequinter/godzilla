/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: colors.neutral,
        // violet: {
        //   50: '#fbfaff',
        //   100: '#f5f2ff',
        //   200: '#ede9fe',
        //   300: '#e4defc',
        //   400: '#d7cff9',
        //   500: '#c4b8f3',
        //   600: '#aa99ec',
        //   700: '#6e56cf',
        //   800: '#644fc1',
        //   900: '#5746af',
        //   950: '#20134b',
        // },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
