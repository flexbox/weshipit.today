import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

export interface HyperlinkProps {
  href: string;
  noIcon?: boolean;
  className?: string;
  children: ReactNode;
  isExternal?: boolean;
  noSpanStyle?: boolean;
}

export function Hyperlink({
  children,
  isExternal = false,
  noIcon = false,
  noSpanStyle = false,
  ...rest
}: HyperlinkProps) {
  if (isExternal) {
    return (
      <a target="_blank" rel="noopener noreferrer nofollow" {...rest}>
        {noSpanStyle ? (
          <span>
            {children}
            {noIcon ? null : (
              <ArrowTopRightOnSquareIcon className="ml-1 size-4 text-gray-400" />
            )}
          </span>
        ) : (
          <span className="flex items-center">
            {children}
            {noIcon ? null : (
              <ArrowTopRightOnSquareIcon className="ml-1 size-4 text-gray-400" />
            )}
          </span>
        )}
      </a>
    );
  }

  return <a {...rest}>{children}</a>;
}

export default Hyperlink;
