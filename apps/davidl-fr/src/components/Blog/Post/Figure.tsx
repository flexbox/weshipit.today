import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import { SectionImg } from '~/components/Page';

import { PostFigure, PostFigureCaption } from './style';

interface BlogPostFigureProps {
  imageUrl: string;
  imageAlt: string;
  imageCopyright: string;
}

export default function Figure({
  imageUrl,
  imageAlt,
  imageCopyright,
}: BlogPostFigureProps) {
  return (
    <PostFigure>
      <SectionImg src={imageUrl} alt={imageAlt} loading="lazy" />
      {imageCopyright && (
        <PostFigureCaption>
          Photo by{' '}
          <NativeLink href={`https://unsplash.com/${imageCopyright}`}>
            {imageCopyright}
          </NativeLink>
        </PostFigureCaption>
      )}
    </PostFigure>
  );
}
