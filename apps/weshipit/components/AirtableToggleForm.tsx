import { Button } from '@weshipit/ui';
import React, { useState } from 'react';

interface AirtableToggleProps {
  formLink: string; // should have embed in the URL
  formHeight: number;
  buttonText?: string;
}

export default function AirtableToggleForm({
  formLink,
  formHeight,
  buttonText = 'Start',
}: AirtableToggleProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function toggleNavigation() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <>
      {isFormOpen ? (
        <iframe
          src={formLink}
          width="100%"
          height={formHeight}
          className="m-auto rounded-md"
          style={{ background: '#ffffff' }}
        />
      ) : (
        <Button onClick={toggleNavigation} size="xl" className="mb-16 mt-4">
          <span>{buttonText}</span> <span className="ml-2">→</span>
        </Button>
      )}
    </>
  );
}
