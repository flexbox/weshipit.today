import React from 'react';
import Link from 'next/link';

import { SectionHeading } from '~/components/Page';
import { H3, Rarr, LargeSubheading, Subheading } from '~/components/Typography';
import { FooterContainer } from './style';
import { Button } from '../Button';

interface FooterProps {
  title?: string;
  text?: string;
}

export default function Footer({
  title = "Let's create something together today",
  text = 'Turn your ideas into incredible products.',
}: FooterProps) {
  return (
    <FooterContainer>
      <SectionHeading $mt="0">
        <div style={{ textAlign: 'center', width: '100%' }}>
          <H3>{title}</H3>
          <LargeSubheading style={{ maxWidth: '100%' }}>{text}</LargeSubheading>
          <Subheading style={{ maxWidth: '100%' }}>
            <Link href="/onboarding" passHref legacyBehavior>
              <Button
                size="large"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 32,
                }}
              >
                Start the conversation <Rarr />
              </Button>
            </Link>
          </Subheading>
        </div>
      </SectionHeading>
    </FooterContainer>
  );
}
