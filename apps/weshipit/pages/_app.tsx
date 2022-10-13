import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <Head>
        <title>weshipit.today — React Native Experts</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </PrismicProvider>
  );
}

export default CustomApp;
