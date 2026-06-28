import React from 'react';
import * as Styled from './style';
import Icon from '~/components/Icon';

export default function TwitterButton(props) {
  const { children } = props;
  return (
    <Styled.TwitterButton {...props}>
      <Icon glyph="twitter" size={24} />
      {children}
    </Styled.TwitterButton>
  );
}
