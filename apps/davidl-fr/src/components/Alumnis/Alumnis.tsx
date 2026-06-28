import React from 'react';
import Gravatar from 'react-gravatar';
import { useSWRAlumnis } from '~/components/Workshop/useSWRChallenge';

type AlumniProps = {
  email: string;
  fullName: string;
};

const SkeletonGravatar = () => (
  <svg
    className="size-20 text-gray-200 dark:text-gray-700"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const SkeletonAlumnis = () => (
  <div className="animate-pulse">
    <p className="m-auto my-8 flex w-full justify-center text-center uppercase text-gray-400">
      Create your first React Native application, just like 100+ hired grads
    </p>
    <div className="m-auto flex flex-col md:flex-row">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div
          key={`gravatar-${index}`}
          className="m-4 flex w-full flex-col items-center justify-center text-center "
        >
          <SkeletonGravatar />
          <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  </div>
);

export function Alumnis() {
  const { data, isLoading, error } = useSWRAlumnis();

  if (error)
    return (
      <div className="m-4">🥲 Sorry, we failed to load Alumnis data… </div>
    );
  if (isLoading) {
    return <SkeletonAlumnis />;
  }

  // @ts-ignore
  const alumnisLastFive = data.bootcampOnboarding.slice(55, 60);
  // @ts-ignore
  const alumnisNumber = data.bootcampOnboarding.length;

  return (
    <div>
      <p className="m-auto my-8 flex w-full justify-center text-center uppercase text-gray-400">
        Create your first React Native application, just like {alumnisNumber}{' '}
        hired grads
      </p>
      <div className="m-auto flex flex-col md:flex-row ">
        {alumnisLastFive.map((alumni: AlumniProps) => (
          <div
            key={alumni.email}
            className=" flex w-full flex-col items-center justify-center text-center md:mx-8 "
          >
            <Gravatar
              email={alumni.email}
              size={75}
              className=" mb-6 rounded-full"
            />
            <p className="mb-4 text-xs font-semibold">{alumni.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
