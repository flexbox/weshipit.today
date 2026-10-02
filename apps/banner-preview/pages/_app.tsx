import { AppProps } from 'next/app';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './styles.css';

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
  weight: ['700'],
  variable: '--font-space-grotesk',
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default CustomApp;
