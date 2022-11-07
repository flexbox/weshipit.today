/* eslint-disable-next-line */

import { NativeLink } from '@weshipit/ui';

export interface LinkProps {
  variant?: 'primary' | 'secondary';
  accessoryLeft?: React.ReactNode;
  children?: React.ReactNode;
  style?: string;
  href: string;
}

export function Link({
  variant,
  accessoryLeft,
  children,
  style,
  href,
}: LinkProps) {
  let variantStyle;
  if (variant === 'secondary') {
    variantStyle = 'bg-white text-black hover:bg-gray-100';
  } else {
    variantStyle = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  }
  return (
    <NativeLink href={href}>
      {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
      {children}
    </NativeLink>
  );
}

export default Link;
