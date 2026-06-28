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
            <Link href="/onboarding">
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */}
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
