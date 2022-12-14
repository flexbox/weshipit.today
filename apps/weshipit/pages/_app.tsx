import { AppProps } from 'next/app';
import './styles.css';
import { Inter } from '@next/font/google';

import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <PrismicProvider client={client}>
        <Component {...pageProps} />
      </PrismicProvider>
    </main>
  );
}

export default CustomApp;
