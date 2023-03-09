import { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GitHub to LinkedIn</title>
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
