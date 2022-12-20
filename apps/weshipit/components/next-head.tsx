import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

export interface NextHeadProps {
  seoTitle: string;
  seoDescription: string;
  ogImageTitle?: string;
}

export function NextHead({
  seoTitle,
  seoDescription,
  ogImageTitle = 'React Native Development Agency',
}: NextHeadProps) {
  return (
    <>
      <DefaultSeo
        title={
          `${seoTitle} — weshipit.today` ||
          'React Native Development Agency - weshipit.today'
        }
        description={
          seoDescription ||
          'Our mission to make people’s lives easier is driven by a disciplined and measured approach to automation, minimalist design, and mentoring.'
        }
        twitter={{
          handle: '@flexbox_',
          site: '@flexbox_',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
        ]}
      />
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f3f4f6" />

        <meta name="msapplication-TileColor" content="#f3f4f6" />
        <meta name="theme-color" content="#f3f4f6" />

        <meta property="og:logo" content="/android-chrome-256x256.png" />
        <meta
          property="og:image"
          content={`/api/og?title=${encodeURI(ogImageTitle)}`}
        />
      </Head>
    </>
  );
}

export default NextHead;
