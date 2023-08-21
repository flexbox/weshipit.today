import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { PrismicProvider } from '@prismicio/react';
import { ApolloProvider } from '@apollo/client';
import { client as prismicClient } from './api/prismic';
import { client as apolloClient } from './api/apollo-client';

import './styles.css';

const inter = Inter({ subsets: ['latin'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={prismicClient}>
      <ApolloProvider client={apolloClient}>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </PrismicProvider>
  );
}

export default CustomApp;
