import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Inter } from '@next/font/google';

import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <Head>
        <title>React Native Experts — weshipit.today</title>
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </PrismicProvider>
  );
}

export default CustomApp;
