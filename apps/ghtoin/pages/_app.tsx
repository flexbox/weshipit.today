import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>GitHub to LinkedIn</title>
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default CustomApp;
