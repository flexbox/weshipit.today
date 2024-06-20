import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

export interface HyperlinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
  noIcon?: boolean;
}

export function Hyperlink({
  children,
  isExternal = false,
  noIcon = false,
  ...rest
}: HyperlinkProps) {
  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer nofollow" {...rest}>
        <span className="flex items-center">
          {children}
          {noIcon ? null : (
            <ArrowTopRightOnSquareIcon className="ml-1 size-4 text-gray-400" />
          )}
        </span>
      </a>
    );
  }

  return <a {...rest}>{children}</a>;
}

export default Hyperlink;
