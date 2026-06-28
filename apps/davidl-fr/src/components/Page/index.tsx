import React from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Newsletter from '~/components/Newsletter/Newsletter';

import {
  PageContainer,
  InnerPageContainer,
  SectionHeading,
  SectionContainer,
  SectionImg,
  InnerSectionImg,
  ContentContainer,
  ContentGrid,
  PreviewContentGrid,
  Iframe,
} from './style';

export {
  SectionHeading,
  SectionContainer,
  ContentContainer,
  ContentGrid,
  PreviewContentGrid,
  SectionImg,
  InnerSectionImg,
  Iframe,
};

interface Props {
  children: React.ReactNode;
  withHeader?: boolean;
  withNewsletter?: boolean;
  withFooter?: boolean;
  footerTitle?: string;
  footerText?: string;
}

export default function Page({
  children,
  withHeader = false,
  withNewsletter = false,
  withFooter = false,
  footerTitle,
  footerText,
}: Props) {
  return (
    <PageContainer>
      {withHeader && <Header />}
      <InnerPageContainer role="main">
        {children}

        {withNewsletter && (
          <ContentContainer style={{ marginTop: '128px' }}>
            <Newsletter />
          </ContentContainer>
        )}
      </InnerPageContainer>
      {withFooter && <Footer title={footerTitle} text={footerText} />}
    </PageContainer>
  );
}
