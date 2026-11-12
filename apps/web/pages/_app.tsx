import { AppProps } from 'next/app';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { DefaultSeo } from 'next-seo';

import './styles.css';
import '../components/anatomy/kit/iso.css';
import '../components/anatomy/figure.css';
import '../components/glossary-code.css';
import '../components/anatomy/cng/cng-figure.css';
import '../components/anatomy/dev-menu/dev-menu-figure.css';
import '../components/anatomy/expo/expo-figure.css';
import '../components/anatomy/hermes/hermes-figure.css';
import '../components/anatomy/metro/metro-figure.css';

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
    <>
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
    </>
  );
}

export default CustomApp;
