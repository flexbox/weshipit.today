import * as React from 'react';

interface ErrorTextProps {
  description?: string;
}

export const ErrorText = ({ description }: ErrorTextProps) => (
  <div className="mt-8">
    <p className="text-sm font-medium dark:text-white">
      😢 Sorry, we encountered an error with our stats server.
    </p>
    {description && <p className="text-sm text-gray-500">{description}</p>}
  </div>
);
