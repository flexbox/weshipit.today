import React from 'react';
import { NextChallengeLink } from '~/components/Workshop/NextChallengeLink';
import { findNextChallenge } from '~/utils/findNextChallenge';

interface Props {
  routerPath: string;
}

export const ElaborationCompleted = ({ routerPath }: Props) => {
  const nextHref = findNextChallenge(routerPath);

  return (
    <div className="flex flex-row items-center justify-between">
      <p className="py-4 font-medium">Challenge completed 🎉</p>
      <div className="shrink">
        <NextChallengeLink href={nextHref} />
      </div>
    </div>
  );
};
