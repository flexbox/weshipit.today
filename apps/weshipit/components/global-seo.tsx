import { DefaultSeo } from 'next-seo';

interface GlobalSeoProps {
  data: {
    seo_description?: string;
    seo_title?: string;
  };
}

export default function GlobalSeo({ data }: GlobalSeoProps) {
  const seoTitle = data.seo_title;
  const seoDescription = data.seo_title;
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
    </>
  );
}
