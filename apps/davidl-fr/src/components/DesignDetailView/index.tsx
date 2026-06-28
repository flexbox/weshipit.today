import React from 'react';
import Link from 'next/link';
import { getDateObject } from '~/lib/getDateObject';
import { ContentContainer, SectionHeading } from '~/components/Page';
import {
  H1,
  H2,
  Subheading,
  LargeSubheading,
  A,
  Rarr,
} from '~/components/Typography';
import { DesignDetailsPost } from '~/types/design';
import DesignDetailsGrid from '~/components/DesignDetailsGrid';
import DesignDetailMedia from '~/components/DesignDetailMedia';
import Markdown from '~/components/MarkdownRenderer';
import { HeadingContainer, Icon } from './style';
import { Share } from '~/components/Blog/Post/Share';
import { ProseContainer } from '~/components/Container/ProseContainer';

interface Props {
  post: DesignDetailsPost;
}

export default function DesignDetailView(props: Props) {
  const { post } = props;

  const { day, month, year } = getDateObject(post.createdAt);
  const datestring = `${day} ${month} ${year}`;
  const subheading = `${datestring} · ${post.details.length} details`;

  return (
    <>
      <ContentContainer style={{ marginTop: '96px' }}>
        <Icon src={`/images/mobile/${post.slug}.png`} alt={post.title} />

        <HeadingContainer>
          <H1>{post.title}</H1>
          <Subheading>{subheading}</Subheading>
        </HeadingContainer>

        <ProseContainer style="mt-16 mb-16">
          <Markdown>{post.description}</Markdown>

          {post.details.map((detail, i) => (
            <DesignDetailMedia detail={detail} key={`${detail.title}-${i}`} />
          ))}
        </ProseContainer>

        <Share slug={post.slug} title={post.title} />
      </ContentContainer>
    </>
  );
}
