import React from 'react';
import Page from '~/components/Page';
import { PatternItem } from '~/components/Pattern/Item';
import GlobalSeo from '~/components/SEO/GlobalSeo';

import { getPatternByUid, getPatterns } from '../api/pattern';
import { formatStaticPaths } from '~/utils/format-static-paths';

export default function PatternUidPage({ data }) {
  const pattern = data.pattern;
  const title = pattern.data.body[0].text;
  const body = pattern.data.body[0].text;
  return (
    <Page withHeader withNewsletter>
      <GlobalSeo
        data={{
          seo_description: `Pattern for mobile app design - ${body}`,
          seo_title: `How to ${title} in React Native`,
          image: {
            alt: `${title} pattern`,
          },
        }}
      />
      <PatternItem pattern={pattern} />
    </Page>
  );
}

export async function getStaticPaths() {
  const data = await getPatterns();
  const paths = formatStaticPaths(data.patterns);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getPatternByUid(context.params.slug);

  return {
    props: {
      data,
    },
  };
}
