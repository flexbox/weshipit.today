import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { H1, Rarr, Subheading, LargeSubheading } from '~/components/Typography';
import { PrimaryButton } from '~/components/Button';
import Avatar from '~/components/Avatar';

import { AnimatedText, AvatarGrid, HeroGrid } from './style';

const Typewriter = dynamic(() => import('./Typewriter'), { ssr: false });

export default function Hero() {
  return (
    <>
      <AvatarGrid>
        <div className="flex items-center">
          <Avatar />
        </div>
        <div>
          <LargeSubheading>Hi, I’m David</LargeSubheading>
          <AnimatedText>
            <H1 style={{ textTransform: 'none' }}>
              <Typewriter />
            </H1>
          </AnimatedText>
          <LargeSubheading>
            I’m a french <strong>freelance designer and developer</strong>.
            <br />I help companies to ship quality software for happy customers.
            <br />I am offering monthly engagement options to fit your project.
          </LargeSubheading>

          <HeroGrid>
            <Link href="/onboarding" as="/onboarding">
              <PrimaryButton>Schedule a call</PrimaryButton>
            </Link>
            <Subheading style={{ marginTop: 0 }}>
              <Link href="/onboarding" as="/onboarding">
                Speak to a Specialist
                <Rarr />
              </Link>
            </Subheading>
          </HeroGrid>
        </div>
      </AvatarGrid>
    </>
  );
}
