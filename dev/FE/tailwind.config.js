/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    extend: {
      fontFamily: {
        Jeju: ['jejuGothic', 'sans'],
        Bungee: ['Bungee-Regular', 'sans'],
      },
      colors: {
        CustomOrange: '#FFAA50',
        // CustomOrange: '#FF8000',
        CustomNavy: '#323554',
        // CustomNavy: '#06092B',
        CustomGray: '#D9D9D9',
        CustomBg: '#F2F2F2',
        CustomLightNavy: '#323554',
        UserBg: '#E5E5E5',
      },
      boxShadow: {
        'inner-deep': 'inset 0 3px 3px rgba(0, 0, 0, 0.5)',
        'right-bottom': '8px 8px 15px rgba(0, 0, 0, 0.1)',
      },
    },
    plugins: [],
  },
  variants: {
    extend: {
      underline: ['hover'],
    },
  },
};
