import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import React, { ReactElement, useEffect } from 'react';
import { ProseContainer } from '~/components/Container/ProseContainer';
import Layout from '~/components/Workshop/Layout';
import { CHALLENGE_SOURCE_RAW } from '~/pages/api/workshop';
import { Challenge } from '~/types/workshop';
import { getGitHubSlug } from '~/utils/getGitHubSlug';
import 'prism-themes/themes/prism-synthwave84.css';
import remarkGfm from 'remark-gfm';

interface WorkshopPageProps {
  challenge: Challenge;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export default function WorkshopPage({
  source,
}: WorkshopPageProps): ReactElement {
  const router = useRouter();
  const routerQueryId = router.query.id;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Layout isChallenge={true} routerQueryId={routerQueryId as string}>
      <ProseContainer>
        {source ? (
          <MDXRemote {...source} />
        ) : (
          <p>Fetching content from GitHub...</p>
        )}
      </ProseContainer>
    </Layout>
  );
}

// make sure the build is happy
export async function getStaticPaths() {
  let paths: any = [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const githubSlug = getGitHubSlug(params.id);

  let rawContentUrl = `${CHALLENGE_SOURCE_RAW}/${githubSlug}.md`;
  const rawContent = await fetch(rawContentUrl);
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
    revalidate: 1000, // In seconds
  };
}
