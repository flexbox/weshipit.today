import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

export const FooterContainer = styled.div`
  margin-bottom: ${defaultTheme.space[9]};
  background: ${(props) => props.theme.bg.accent};
  border-radius: 8px;
  padding-left: ${defaultTheme.space[9]};
  padding-right: ${defaultTheme.space[9]};
  padding-top: ${defaultTheme.space[4]};
  padding-bottom: ${defaultTheme.space[4]};

  box-shadow: ${defaultTheme.shadows.default};
  transition: box-shadow ${defaultTheme.animations.default};

  margin-left: ${defaultTheme.space[4]};
  margin-right: ${defaultTheme.space[4]};

  h2,
  h3 {
    color: ${(props) => props.theme.text.onPrimary};
  }
  &:hover {
    transition: box-shadow ${defaultTheme.animations.hover};
    box-shadow: ${defaultTheme.shadows.hover};
  }

  @media (max-width: ${defaultTheme.breakpoints[4]}) {
    padding-left: ${defaultTheme.space[4]};
    padding-right: ${defaultTheme.space[4]};
  }
`;
