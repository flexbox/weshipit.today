import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  margin-top: ${defaultTheme.space[5]};
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: ${(props) => props.mx || 600}px;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.defaultColumns || 3}, 1fr);
  grid-gap: ${defaultTheme.space[3]};
  grid-auto-rows: auto;
  width: 100%;
  max-width: ${defaultTheme.breakpoints[0]};
  margin-top: ${defaultTheme.space[5]};

  a {
    overflow: hidden;
    border-radius: 8px;
    transition: box-shadow ${defaultTheme.animations.default};
  }

  a:hover {
    box-shadow: ${defaultTheme.shadows.largeHover};
    transition: box-shadow ${defaultTheme.animations.hover};
  }

  @media (max-width: ${defaultTheme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PreviewContentGrid = styled(ContentGrid)`
  a {
    overflow: hidden;
  }

  a:last-of-type {
    display: none;
  }

  @media (max-width: ${defaultTheme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    a:last-of-type {
      display: inline-block;
    }
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    grid-template-columns: repeat(1, 1fr);

    a:first-of-type {
      grid-column: 1;
    }
  }
`;

export const InnerPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex: 1 0 auto;
  width: 100%;
  padding-top: ${defaultTheme.space[7]};
  padding-bottom: ${defaultTheme.space[9]};

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    max-width: 100%;
    padding-left: ${defaultTheme.space[4]};
    padding-right: ${defaultTheme.space[4]};
  }
`;

interface SectionHeadingProps {
  $mt?: string;
}

export const SectionHeading = styled.div<SectionHeadingProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${(props) => props.$mt || defaultTheme.space[9]};
  padding-top: ${(props) => props.pt || defaultTheme.space[6]};
  padding-bottom: ${defaultTheme.space[6]};
  width: 100%;
  max-width: ${defaultTheme.breakpoints[3]};

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    max-width: 100%;
    margin-top: ${(props) => props.$mt || defaultTheme.space[8]};
  }
`;

export const SectionContainer = styled.div`
  background-color: ${(props) =>
    props.bgDark ? props.theme.bg.input : props.theme.bg.secondary};
  width: 100%;
  align-items: center;
  padding-top: ${defaultTheme.space[6]};
  padding-bottom: ${defaultTheme.space[6]};
  border-top: 1px solid ${(props) => props.theme.border.default};
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  & > div {
    margin: auto;
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    padding-left: ${defaultTheme.space[4]};
    padding-right: ${defaultTheme.space[4]};
    border-top: 0;
    border-bottom: 0;
    border-radius: 8px;
  }
`;

export const SectionImg = styled.img`
  border-radius: 8px;
  margin-bottom: ${defaultTheme.space[3]};
  background-color: ${(props) => props.theme.bg.inset};
  max-width: 100%;

  @media (min-width: ${defaultTheme.breakpoints[1]}) {
    min-height: 350px;
    max-width: 800px;
  }
`;

export const ContributionImg = styled.img`
  max-width: 100%;

  @media (min-width: ${defaultTheme.breakpoints[1]}) {
    min-width: 1280px;
    transform: translateX(-25%);
  }
`;

export const InnerSectionImg = styled.img`
  border-radius: 8px;
  margin-bottom: ${defaultTheme.space[3]};
  background-color: ${(props) => props.theme.bg.inset};
  max-width: 100%;
`;

export const Iframe = styled.iframe`
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : 'white')};
  border-radius: 8px;

  box-shadow: ${defaultTheme.shadows.default};
  transition: box-shadow ${defaultTheme.animations.default};

  animation: fadein 300ms;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    transition: box-shadow ${defaultTheme.animations.hover};
    box-shadow: ${defaultTheme.shadows.hover};
  }
`;
