import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

export interface NextHeadProps {
  seoTitle: string;
  ogImageTitle?: string;
  seoDescription: string;
}

export function NextHead({
  ogImageTitle = 'React Native Development Agency',
  seoDescription,
  seoTitle,
}: NextHeadProps) {
  return (
    <>
      <meta charSet="utf-8" />
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
          cardType: 'summary_large_image',
          handle: '@flexbox_',
          site: '@flexbox_',
        }}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://weshipit.today',
          title: `${seoTitle} — weshipit.today`,
          description:
            seoDescription ||
            'Our mission to make people’s lives easier is driven by a disciplined and measured approach to automation, minimalist design, and mentoring.',
          images: [
            {
              url: `/api/og?title=${encodeURI(ogImageTitle)}`,
              width: 1200,
              height: 630,
              alt: seoTitle || 'React Native Development Agency',
            },
          ],
          siteName: 'weshipit.today',
        }}
        additionalLinkTags={[
          {
            href: '/favicon.ico',
            rel: 'icon',
          },
          {
            href: '/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '180x180',
          },
          {
            href: '/favicon-32x32.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            href: '/favicon-16x16.png',
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
          },
        ]}
      />
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f3f4f6" />

        <meta name="msapplication-TileColor" content="#f3f4f6" />
        <meta name="theme-color" content="#f3f4f6" />
      </Head>
    </>
  );
}

export default NextHead;
