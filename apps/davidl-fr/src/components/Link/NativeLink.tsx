import React, { HTMLAttributes } from 'react';

interface Props
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  href: string;
}

export const NativeLink = (props: Props) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
);
