import * as React from 'react';
import Link from 'next/link';
import { H4, P } from '~/components/Typography';
import { Card, PreviewImage, Content } from './style';
import { truncate } from 'lodash';

interface BlogListItem {
  post: {
    uid: string;
    data: {
      seo_title: string;
      seo_description: string;
      image: {
        url: string;
      };
    };
  };
}

export default function BlogListItem({ post }: BlogListItem) {
  const title = post.data.seo_title;
  const description = truncate(post.data.seo_description, {
    length: 128,
  });
  const slug = post.uid;
  const imageUrl = post.data.image.url;

  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <Card>
        {imageUrl && <PreviewImage loading="lazy" src={imageUrl} alt={slug} />}
        <Content>
          <H4 style={{ marginTop: 0 }}>{title}</H4>
          <P>{description}</P>
        </Content>
      </Card>
    </Link>
  );
}
