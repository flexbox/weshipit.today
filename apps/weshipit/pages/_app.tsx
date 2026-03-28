import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';

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
      <DefaultSeo
        titleTemplate="%s — weshipit.today"
        defaultTitle="React Native Development Agency — weshipit.today"
        description="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Pause or cancel whenever."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://weshipit.today/',
          siteName: 'weshipit.today',
        }}
        twitter={{
          handle: '@flexbox_',
          site: '@flexbox_',
          cardType: 'summary_large_image',
        }}
      />
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
      <Analytics />
    </PrismicProvider>
  );
}

export default CustomApp;
