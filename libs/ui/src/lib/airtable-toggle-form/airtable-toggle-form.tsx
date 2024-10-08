import { useState } from 'react';
import { Button } from '../button/button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface AirtableToggleFormProps {
  formLink: string;
  formHeight: number;
  buttonText: string;
}

export function AirtableToggleForm({
  buttonText,
  formHeight,
  formLink,
}: AirtableToggleFormProps) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {!showForm && (
        <div className="flex w-full flex-col items-center">
          <Button
            size="xxl"
            variant={'primary'}
            onClick={toggleForm}
            accessoryRight={<ArrowRightIcon height={24} className="ml-2" />}
          >
            {buttonText}
          </Button>
        </div>
      )}
      {showForm && (
        <iframe
          src={formLink}
          width="100%"
          height={formHeight}
          className="rounded-md"
          style={{ background: '#ffffff' }}
        />
      )}
    </div>
  );
}
