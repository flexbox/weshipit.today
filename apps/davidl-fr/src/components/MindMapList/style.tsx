import styled from 'styled-components';
import defaultTheme from '~/components/Theme';
import { p, H6 } from '~/components/Typography';

export const Iframe = styled.iframe`
  width: 100%;
  min-height: 400px;
  border-radius: 4px;
  padding: ${defaultTheme.space[2]};
  background: ${(props) => props.theme.bg.secondary};
`;

export const Title = styled.p`
  ${p};
  font-size: 1.1rem;
  font-weight: 700;
  align-items: center;

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    svg {
      display: none;
    }
  }
`;

export const ListItem = styled.a`
  &:hover {
    ${Title} {
      color: ${(props) => props.theme.text.link};
    }
  }
`;

export const ReadingTime = styled(H6)`
  color: ${(props) => props.theme.text.link};
  margin-top: ${defaultTheme.space[5]};
  font-weight: ${defaultTheme.fontWeights.link};
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  position: relative;
  border-radius: 8px;
  background: ${(props) => props.theme.bg.secondary};
  transition: box-shadow ${(props) => props.theme.animations.default};
  height: 100%;

  &:hover {
    ${ReadingTime} {
      color: ${(props) => props.theme.text.link};
    }
  }

  p {
    margin-top: ${defaultTheme.space[2]};
  }
`;

export const CardImg = styled.img`
  min-height: 170px;
  background-color: ${(props) => props.theme.icon.tertiary};
`;

export const CardContent = styled.div`
  padding: ${defaultTheme.space[4]};
`;
