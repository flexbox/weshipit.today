import React, { ReactElement, useEffect } from 'react';
import Layout from '~/components/Workshop/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-synthwave84.css';
import { MDXProps } from '~/types/mdx';
import remarkGfm from 'remark-gfm';

const HACKATHON_SOURCE_RAW =
  'https://raw.githubusercontent.com/flexbox/react-native-bootcamp/main/hackathon/README.md';

export default function HackathonPage({ source }: MDXProps): ReactElement {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout isChallenge={true}>
      {source ? (
        <MDXRemote {...source} />
      ) : (
        <p>Fetching content from GitHub...</p>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const rawContent = await fetch(HACKATHON_SOURCE_RAW);
  const mdxContent = await rawContent.text();
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  if (!mdxSource) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      source: mdxSource,
    },
  };
}
