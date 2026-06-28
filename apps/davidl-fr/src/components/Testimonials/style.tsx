import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

export const Container = styled.div`
  margin: auto;
  margin-bottom: ${defaultTheme.space[8]};

  @media (min-width: ${defaultTheme.breakpoints[4]}) {
    & > div:nth-child(odd) {
      transform: ${(props) => (props.start === 0 ? 'translateX(40%)' : null)};
    }

    & > div:nth-child(even) {
      transform: ${(props) => (props.start === 0 ? 'translateX(-40%)' : null)};
    }
  }
`;

export const Bubble = styled.div`
  background-color: ${(props) => props.theme.bg.input};
  max-width: 400px;
  border-radius: 16px;
  padding: ${defaultTheme.space[4]};
  margin-bottom: ${defaultTheme.space[5]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: ${(props) => props.theme.bg.input};
    border-bottom: 0;
    border-right: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }

  color: ${(props) => props.theme.text.primary};
  p {
    color: ${(props) => props.theme.text.primary};
    margin-bottom: ${defaultTheme.space[4]};
  }
`;

export const PeopleImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-self: center;
  margin: auto;
`;

export const BubbleFooter = styled.footer`
  display: grid;
  grid-template-columns: 80px 1fr;
  padding-left: ${defaultTheme.space[2]};
`;

export const BuddleContainer = styled.div`
  margin-bottom: ${defaultTheme.space[5]};

  &:last-child {
    margin-bottom: 0;
  }
`;
