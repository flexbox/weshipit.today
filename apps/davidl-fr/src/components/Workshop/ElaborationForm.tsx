import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';

interface Props {
  formEndpoint: string;
}

export const ElaborationForm = ({ formEndpoint }: Props) => {
  return (
    <div className="mt-8">
      <h2>🏅 Elaboration and Feedback</h2>
      <p>
        After the exercice, to{' '}
        <strong>remember what you’ve just learned</strong> and{' '}
        <strong>update your progression</strong>, then{' '}
        <NativeLink href={formEndpoint}>
          fill out the elaboration and feedback form
        </NativeLink>
        .
      </p>
    </div>
  );
};
