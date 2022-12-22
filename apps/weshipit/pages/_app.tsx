import { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

import './styles.css';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </PrismicProvider>
  );
}

export default CustomApp;
