import React from 'react';
import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

import {
  Airbnb,
  Aws,
  Algolia,
  Tesla,
  Instagram,
  Netflix,
  Contentful,
  Axa,
  RedBull,
  RgqlAcademy,
  LeWagon,
  HumanCoders,
  MSix,
} from './svg';

import { useRouter } from 'next/router';

export default function Companies() {
  const router = useRouter();

  return (
    <LogosContainer>
      {router.pathname.includes('/onboarding') ||
      router.pathname.includes('/start') ||
      router.pathname.includes('/coaching') ? (
        <div className="grid grid-cols-3 md:grid-cols-7">
          <Contentful />
          <RedBull />
          <Axa />
          <MSix />
          <HumanCoders />
          <LeWagon />
          <RgqlAcademy />
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6">
          <Netflix />
          <Aws />
          <Algolia />
          <Airbnb />
          <Instagram />
          <Tesla />
        </div>
      )}
    </LogosContainer>
  );
}

const sizemd = 150;
const sizesm = 110;

const LogosContainer = styled.div`
  display: flex;

  svg {
    width: ${sizemd}px;
    height: ${sizemd}px;
    filter: grayscale(100%);
    transition: all ${defaultTheme.animations.hover};
    opacity: 0.4;
    padding: 20px;

    &:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    svg {
      width: ${sizesm}px;
      height: ${sizesm}px;
      padding: 10px;
    }
  }
`;
