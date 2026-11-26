import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * The site's two typefaces, defined once so the Pages Router (`_app`) and
 * the App Router root layouts load the same files.
 */
const inter = Inter({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['700'],
});

/** Goes on the element that wraps every page. */
export const fontClassName = `${inter.className} ${spaceGrotesk.variable} antialiased`;
