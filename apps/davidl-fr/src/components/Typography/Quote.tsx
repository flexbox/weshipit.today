import React from 'react';
import { Blockquote } from '~/components/Typography';

export default function Quote(props) {
  return (
    <Blockquote>
      {props.title}
      <cite>{props.cite}</cite>
    </Blockquote>
  );
}
