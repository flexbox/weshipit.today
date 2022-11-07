import React from 'react';

interface Props {
  href: string;
  children?: React.ReactNode;
}

export const NativeLink = (props: Props) => {
  const { children } = props;
  return (
    <a className="text-gray-500 underline" {...props}>
      {children}
    </a>
  );
};
