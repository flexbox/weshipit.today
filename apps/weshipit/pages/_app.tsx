import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <Head>
        <title>React Native Experts — weshipit.today</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </PrismicProvider>
  );
}

export default CustomApp;
