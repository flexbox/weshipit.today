import { PageSeo, resolvePageSeo } from '../utils/seo/metadata';

/**
 * LinkedIn only reads the share image from a tag that carries both `name`
 * and `property`. The Metadata API cannot write that tag, so the page
 * renders it and React moves it into `<head>`.
 */
export function LinkedInOgImage({ seo }: { seo: PageSeo }) {
  return (
    <meta
      name="image"
      property="og:image"
      content={resolvePageSeo(seo).ogImageUrl}
    />
  );
}
