import React, { useState } from 'react';
import Frame from '~/components/Onboarding/Frame';
import { ContentContainer } from '~/components/Page';
import { InnerPageContainer } from '~/components/Page/style';
import { PrimaryButton } from '~/components/Button';
import { Rarr } from '~/components/Typography';

interface AirtableToggleProps {
  formLink: string; // should have embed in the URL
  formHeight: number;
  buttonText?: string;
}

export default function AirtableToggleForm({
  formLink,
  formHeight,
  buttonText = 'Start',
}: AirtableToggleProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function toggleNavigation() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <ContentContainer>
      <InnerPageContainer>
        {isFormOpen ? (
          <Frame src={formLink} width="100%" height={formHeight} />
        ) : (
          <PrimaryButton size="large" onClick={toggleNavigation}>
            <span style={{ marginRight: 24 }}>{buttonText}</span> <Rarr />
          </PrimaryButton>
        )}
      </InnerPageContainer>
    </ContentContainer>
  );
}
