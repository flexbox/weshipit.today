import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Providers from '~/components/Providers/Providers';
import { Inter } from 'next/font/google';
import lightTheme from '~/components/Theme/light';
import darkTheme from '~/components/Theme/dark';
import Head from 'next/head';
import { UserProvider } from '~/lib/UserContext';

import 'tailwindcss/tailwind.css';
import '../stylesheets/task-list.css';

import { DefaultSeo } from 'next-seo';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <UserProvider>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_GB',
            url: 'https://davidl.fr',
            site_name: 'David Leuliette',
            images: [
              {
                url: 'https://davidl.fr/images/og-image.jpg',
                width: 2850,
                height: 1900,
                alt: 'David Leuliette — Freelance React Native Developer',
              },
            ],
          }}
          twitter={{
            handle: '@flexbox_',
            site: '@flexbox_',
            cardType: 'summary_large_image',
          }}
          additionalLinkTags={[
            {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: '/metadata/apple-touch-icon.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '32x32',
              href: '/metadata/favicon-32x32.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '16x16',
              href: '/metadata/favicon-16x16.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '192x192',
              href: '/metadata/android-chrome-192x192.png',
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '512x512',
              href: '/metadata/android-chrome-512x512.png',
            },
            { rel: 'manifest', href: '/metadata/site.webmanifest' },
            {
              rel: 'mask-icon',
              href: '/metadata/safari-pinned-tab.svg',
              color: lightTheme.bg.accent,
            },
          ]}
          additionalMetaTags={[
            {
              name: 'msapplication-TileColor',
              content: lightTheme.bg.accent,
            },
            {
              name: 'msapplication-TileImage',
              content: '/metadata/mstile-144x144.png',
            },
            {
              name: 'msapplication-config',
              content: '/metadata/browserconfig.xml',
            },
            {
              name: 'google-site-verification',
              content: 'DU4ZdQ7Hi6eaG1Kpy6J9wpZaWmdi6Q7IajNJwNppif4',
            },
          ]}
        />
        <Head>
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content={lightTheme.bg.accent}
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content={darkTheme.bg.accent}
          />
        </Head>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
        <Analytics />
        <SpeedInsights />
      </UserProvider>
    </Providers>
  );
}
