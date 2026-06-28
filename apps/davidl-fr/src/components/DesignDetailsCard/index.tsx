import * as React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { DesignDetailsPost } from '~/types/design';
import {
  Title,
  Container,
  CardContent,
  VideoPlayer,
  ImageContainer,
  Icon,
  DetailsCount,
  Arrow,
  Circle,
} from './style';

type Props = {
  post: DesignDetailsPost;
};

export default function DesignDetailsCard(props: Props) {
  const videoEl = React.useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isMounted, setIsMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const {
    post: { title, slug, details, tint },
  } = props;

  const src = `/images/mobile/${slug}.png`;

  const videosrc = details[1].media[0];

  const pause = () => {
    videoEl.current && videoEl.current.pause();
  };

  const play = () => {
    videoEl.current && videoEl.current.play();
  };

  React.useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 968);
  }, []);

  return (
    <Link href="/mobile/[slug]" as={`/mobile/${slug}`}>
      <Container ref={ref} onMouseEnter={play} onMouseLeave={pause}>
        <ImageContainer>
          <Icon alt={'Design Details'} src={src} />
        </ImageContainer>
        <CardContent>
          <Title>{title}</Title>
          <DetailsCount>{details.length} details</DetailsCount>
        </CardContent>
        <Circle color={tint} />
        <Arrow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
        </Arrow>
        {inView && isMounted && !isMobile && (
          <VideoPlayer
            playsInline
            muted
            ref={videoEl}
            loop
            autoPlay={false}
            preload="metadata"
            src={`${videosrc}#t=0.1`}
          />
        )}
      </Container>
    </Link>
  );
}
