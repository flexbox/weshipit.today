import styled from 'styled-components';
import defaultTheme from '~/components/Theme';

export const PostFigure = styled.figure`
  text-align: center;
  margin-bottom: ${defaultTheme.space[6]};
`;
export const PostFigureCaption = styled.figcaption`
  color: ${(props) => props.theme.text.quarternary};
  font-size: ${defaultTheme.fontSizes[0]};
`;
