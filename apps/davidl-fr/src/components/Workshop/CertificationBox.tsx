import Link from 'next/link';
import React from 'react';
import { H2, P } from '~/components/Typography';
import { allWorkshops, countChallenges } from '~/pages/api/workshop';

interface CertificationBoxProps {
  workshopsDone: number;
}

export const CertificationBox = ({ workshopsDone }: CertificationBoxProps) => {
  const numberChallenges = countChallenges(allWorkshops);

  const workshopsDoneValue = (workshopsDone * 100) / numberChallenges;
  const workshopsDoneInPercent = workshopsDoneValue.toFixed(2);
  const workshopsDoneWithPercent = workshopsDoneInPercent + '%';

  return (
    <div>
      <H2>
        Certification{' '}
        <span className="text-sm font-medium tabular-nums text-gray-600 dark:text-gray-400">
          {workshopsDoneInPercent}%
        </span>
      </H2>

      <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-800">
        <div
          className="h-4 rounded bg-blue-500 dark:bg-green-500"
          style={{ width: workshopsDoneWithPercent }}
        ></div>
      </div>
      {workshopsDoneValue > 80 ? (
        <>
          <P className="mt-2">
            🎉 Hooray! You’ve completed{' '}
            <strong>the React Native Bootcamp</strong>.
          </P>
          <Link href="/workshop/challenges/certification">
            Add your certification to LinkedIn
          </Link>
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          Complete more than 80% of the challenges to unlock your certification.
        </p>
      )}
    </div>
  );
};
