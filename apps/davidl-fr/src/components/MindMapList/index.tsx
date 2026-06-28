import React from 'react';
import { H5, P, Rarr } from '~/components/Typography';
import { mindnodes } from '~/pages/api/data';
import { CardContent } from './style';
import { ContentGrid } from '~/components/Page';
import { Card, CardImg, ReadingTime } from './style';
import { NativeLink } from '~/components/Link/NativeLink';

export default function MindMapList() {
  return (
    <ContentGrid defaultColumns={3}>
      {mindnodes.map((item, index) => (
        <NativeLink
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <Card style={{ height: '100%' }}>
            <CardImg
              src={`/images/mindnodes/${item.img}`}
              alt={`Mind map from David Leuliette about ${item.title}`}
            />
            <CardContent>
              <H5 style={{ marginTop: 0 }}>{item.title}</H5>
              <P>{item.description}</P>
              <ReadingTime>
                View <Rarr />
              </ReadingTime>
            </CardContent>
          </Card>
        </NativeLink>
      ))}
    </ContentGrid>
  );
}
