import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Inter } from '@next/font/google';

import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          property="og:image"
          content="https://my-og-img.vercel.app/api/og?title=React Native Experts — weshipit.today"
        />
        <title>React Native Experts — weshipit.today</title>
      </Head>
      <main className={inter.className}>
        <PrismicProvider client={client}>
          <Component {...pageProps} />
        </PrismicProvider>
      </main>
    </>
  );
}

export default CustomApp;
