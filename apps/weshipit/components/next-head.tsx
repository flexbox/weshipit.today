import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const defaultSeoTitle = 'React Native Development Agency';
  const defaultSeoDescription =
    'Software development is a service, not a product. We offer a subscription-based service for React Native developers. One flat fee. Pause or cancel whenever.';

  // Generate the full canonical URL based on current path
  const router = useRouter();
  const baseUrl = 'https://weshipit.today';
  const path = router.asPath;
  const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;

  return (
    <>
      <meta charSet="utf-8" />
      <DefaultSeo
        title={
          `${seoTitle} — weshipit.today` ||
          'React Native Development Agency - weshipit.today'
        }
        description={seoDescription || defaultSeoDescription}
        canonical={canonicalUrl}
        twitter={{
          handle: '@flexbox_',
          site: '@flexbox_',
          cardType: 'summary_large_image',
          // we don't use these, to avoid duplication because Twitter will read the og:title, og:image and og:description
          // twitter:title,
          // twitter:image
          // twitter:description
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

        <meta
          name="title"
          property="og:title"
          content={seoTitle || defaultSeoTitle}
        />
        <meta
          name="description"
          property="og:description"
          content={seoDescription || defaultSeoDescription}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta
          name="image" // this is for LinkedIn preview https://github.com/garmeeh/next-seo/issues/1311
          property="og:image"
          content={
            ogImageTitle?.startsWith('/api/') ||
            ogImageTitle?.startsWith('http')
              ? ogImageTitle
              : `/api/og?title=${encodeURI(ogImageTitle || '')}`
          }
        />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="Hire React Native Developers as a Service"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="weshipit.today" />
        <meta name="author" content="David Leuliette" />
      </Head>
    </>
  );
}

export default NextHead;
