import React, { ReactElement } from 'react';
import { Card, PreviewImage } from '~/components/Blog/List/style';
import { NativeLink } from '~/components/Link/NativeLink';
import { H4 } from '~/components/Typography';

interface CardProps {
  id: string;
  url: string;
  thumbnailUrl?: string;
  videoName?: string;
}

export function ShowsCard({
  url,
  thumbnailUrl,
  videoName,
}: CardProps): ReactElement {
  return (
    <NativeLink href={url}>
      <Card>
        {thumbnailUrl && <PreviewImage loading="lazy" src={thumbnailUrl} />}
        {videoName && <H4 className="m-auto pr-8">{videoName}</H4>}
      </Card>
    </NativeLink>
  );
}
