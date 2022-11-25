import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

interface NextHeadProps {
  ogTitle?: string;
  data: {
    seoDescription?: string;
    seoTitle?: string;
  };
}

export function NextHead({
  ogTitle = 'WeShipIt - React Native Development Agency',
  data,
}: NextHeadProps) {
  const seoTitle = data.seoTitle;
  const seoDescription = data.seoDescription;
  return (
    <>
      <DefaultSeo
        title={
          `${seoTitle} ` || 'weshipit.today - React Native Development Agency'
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
      />
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
          content={`https://weshiptit.today/api/og?title=${ogTitle}`}
        />
        <title>React Native Experts — weshipit.today</title>
      </Head>
    </>
  );
}

export default NextHead;
