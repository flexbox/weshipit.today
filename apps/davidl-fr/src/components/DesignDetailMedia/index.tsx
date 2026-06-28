import React from 'react';
import { useInView } from 'react-intersection-observer';
import { DesignDetail } from '~/types/design';
import Markdown from '~/components/MarkdownRenderer';
import { DetailContainer, MediaContainer, Video } from './style';

type Props = {
  detail: DesignDetail;
};

export default function DesignDetailMedia(props: Props) {
  const { detail } = props;
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <DetailContainer ref={ref} data-cy="detail-media-container">
      <h3>{detail.title}</h3>
      <Markdown>{detail.description}</Markdown>

      {inView && (
        <MediaContainer>
          {detail.media.map((src) => (
            <Video
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
              key={src}
              landscape={detail.orientation === 'landscape'}
            >
              <source src={`${src}#t=0.1`} />
            </Video>
          ))}
        </MediaContainer>
      )}
    </DetailContainer>
  );
}
