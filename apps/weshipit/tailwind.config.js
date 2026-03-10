const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { text } = require('stream/consumers');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      animation: {
        shine: 'shine 1s',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
};
