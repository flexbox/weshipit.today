import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';
import { Analytics } from '@vercel/analytics/react';

import './styles.css';

const inter = Inter({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
      <Analytics />
    </PrismicProvider>
  );
}

export default CustomApp;
