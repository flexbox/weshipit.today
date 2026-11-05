import * as React from 'react';

interface ErrorTextProps {
  description?: string;
}

export const ErrorText = ({ description }: ErrorTextProps) => (
  <div className="mt-8">
    <p className="text-sm font-medium dark:text-white">
      Your progress didn’t load. Refresh the page to try again.
    </p>
    {description && (
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    )}
  </div>
);
