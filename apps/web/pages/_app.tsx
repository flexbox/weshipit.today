import { AppProps } from 'next/app';
import { Inter, Space_Grotesk } from 'next/font/google';
import { PrismicProvider } from '@prismicio/react';
import { client } from './api/prismic';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { DefaultSeo } from 'next-seo';

import './styles.css';
import '../components/anatomy/kit/iso.css';
import '../components/expo-anatomy/expo-figure.css';
import '../components/hermes-anatomy/hermes-figure.css';
import '../components/metro-anatomy/metro-figure.css';

const inter = Inter({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['700'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider client={client}>
      <DefaultSeo
        titleTemplate="%s — weshipit.today"
        defaultTitle="React Native Development Agency — weshipit.today"
        description="Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Pause or cancel whenever."
        openGraph={{
          locale: 'en_US',
          siteName: 'weshipit.today',
          type: 'website',
          url: 'https://weshipit.today/',
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@flexbox_',
          site: '@flexbox_',
        }}
      />
      <div
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <Component {...pageProps} />
      </div>
      <Analytics />
      <SpeedInsights />
    </PrismicProvider>
  );
}

export default CustomApp;
