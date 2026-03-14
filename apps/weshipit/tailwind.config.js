const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

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
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      colors: {
        primary: 'hsl(var(--primary))',
        background: 'hsl(var(--background))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
};
