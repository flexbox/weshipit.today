import React from 'react';
import GlobalStyles from '~/components/GlobalStyles';
import Page, { ContentContainer, SectionHeading } from '~/components/Page';
import BlogSeo from '~/components/SEO/BlogSeo';
import Figure from '~/components/Blog/Post/Figure';
import { H1 } from '~/components/Typography';
import { Share } from '~/components/Blog/Post/Share';
import Author from '~/components/Blog/Post/Author';
import { format } from 'date-fns';
import RichText from '~/components/Blog/Post/RichText';
import { ProseContainer } from '~/components/Container/ProseContainer';
import { BookCallToAction } from '~/components/Blog/BookCallToAction/BookCallToAction';
import { getPostBySlug, getPosts } from '../api/blogpost';
import { formatStaticPaths } from '~/utils/format-static-paths';
import { post } from '~/types/blog';

interface PostProps {
  data: {
    post: post;
  };
}

export default function Post({ data }: PostProps) {
  const { post } = data;

  const seoTitle = post.data.seo_title;
  const title = post.data.title[0].text;
  const slug = post.uid;
  const imageUrl = post.data.image.url;
  const imageAlt = post.data.image.alt || '';
  const imageCopyright = post.data.image.copyright || '';
  const body = post.data.body_content;
  const lastUpdate = format(
    new Date(post.last_publication_date),
    'dd MMMM yyyy',
  );

  return (
    <Page withHeader withNewsletter>
      <GlobalStyles.MarkdownStyles />
      <BlogSeo data={post.data} slug={post.uid} title={title} />

      <ContentContainer>
        <SectionHeading
          $mt="0"
          style={{ alignItems: 'center', textAlign: 'center' }}
        >
          <H1>{title}</H1>
          <p className="mt-4 text-gray-400">{lastUpdate}</p>
        </SectionHeading>
      </ContentContainer>

      <Figure
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        imageCopyright={imageCopyright}
      />
      <ContentContainer>
        <BookCallToAction />
        <ProseContainer style="mb-20">
          <RichText render={body} />
        </ProseContainer>
        <div className="mb-20">
          <Share slug={slug} title={seoTitle} />
        </div>
        <Author />
      </ContentContainer>
    </Page>
  );
}

export async function getStaticPaths() {
  const data = await getPosts();
  const paths = formatStaticPaths(data.posts);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getPostBySlug(context.params.slug);

  return {
    props: {
      data,
    },
  };
}
