import React from 'react';
import { ContentContainer } from '~/components/Page';

interface ProseProps {
  children: React.ReactNode;
  style?: string;
  withContentContainer?: boolean;
}

export const ProseContainer = ({
  children,
  style = '',
  withContentContainer = false,
}: ProseProps) => {
  const className = `prose prose-a:text-blue-500 dark:prose-invert dark:prose-a:text-orange-500 ${style}`;

  if (withContentContainer) {
    return (
      <ContentContainer className={className}>{children}</ContentContainer>
    );
  }

  return <div className={className}>{children}</div>;
};
