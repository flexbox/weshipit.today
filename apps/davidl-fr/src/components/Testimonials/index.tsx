import React, { useState } from 'react';
import { P, Subheading, TextLight } from '~/components/Typography';
import {
  Bubble,
  BubbleFooter,
  BuddleContainer,
  Container,
  PeopleImg,
} from './style';

import { testimonials } from '~/pages/api/data';

export default function Testimonials({
  start,
  end,
  isRandom,
}: {
  start?: number;
  end?: number;
  isRandom?: boolean;
}) {
  // TODO Add random
  const [testimonialRandom, setTestimonialRandom] = useState(3);

  if (isRandom === true) {
    return (
      <BuddleContainer>
        <Bubble>
          <P style={{ marginBottom: 0 }}>
            {testimonials[testimonialRandom].text}
          </P>
        </Bubble>
        <BubbleFooter>
          <PeopleImg
            src={`/images/testimonials/${testimonials[testimonialRandom].img}`}
            alt={testimonials[testimonialRandom].name}
          />
          <Subheading style={{ marginTop: 0 }}>
            {testimonials[testimonialRandom].name} <br />{' '}
            <TextLight>{testimonials[testimonialRandom].job}</TextLight>
          </Subheading>
        </BubbleFooter>
      </BuddleContainer>
    );
  }

  return (
    <Container start={start}>
      {testimonials.slice(start, end).map((t, index) => (
        <BuddleContainer key={index}>
          <Bubble>
            <P style={{ marginBottom: 0 }}>{t.text}</P>
          </Bubble>
          <BubbleFooter>
            <PeopleImg src={`/images/testimonials/${t.img}`} alt={t.name} />
            <Subheading style={{ marginTop: 0 }}>
              {t.name} <br /> <TextLight>{t.job}</TextLight>
            </Subheading>
          </BubbleFooter>
        </BuddleContainer>
      ))}
    </Container>
  );
}
