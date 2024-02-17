import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

export interface HyperlinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

export function Hyperlink({
  children,
  isExternal = false,
  ...rest
}: HyperlinkProps) {
  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer" {...rest}>
        <span className="flex items-center">
          {children}
          <ArrowTopRightOnSquareIcon className="ml-1 size-4 text-gray-400" />
        </span>
      </a>
    );
  }

  return <a {...rest}>{children}</a>;
}

export default Hyperlink;
