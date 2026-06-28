import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: 148px 1fr;
  grid-gap: ${defaultTheme.space[6]};

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${defaultTheme.space[3]};
  grid-auto-rows: auto;
  width: 100%;
  margin-top: ${defaultTheme.space[5]};
  align-items: center;
  text-align: center;

  @media (max-width: ${defaultTheme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    grid-template-columns: repeat(1, 1fr);
  }

  button {
    width: 100%;
  }
`;

export const AnimatedText = styled.div`
  min-height: 140px;
  max-width: 670px;
`;
