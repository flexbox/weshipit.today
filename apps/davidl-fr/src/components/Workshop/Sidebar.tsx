import React from 'react';
import { allWorkshops } from '~/pages/api/workshop';
import { Challenge, Workshop } from '~/types/workshop';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '~/types/user';
import { useFormatWorkshopDone } from '~/components/Workshop/useFormatWorkshopDone';

interface WorkshopsWithLinkProps {
  workshop: Workshop;
}

function useIsActive(linkHref: string) {
  const router = useRouter();
  const linkHrefLastItem = linkHref.split('/').pop();

  if (router.query.id === linkHrefLastItem) {
    return true;
  }
  return false;
}

function SectionItem({ challenge }: { challenge: Challenge }) {
  const { linkHref, title, status } = challenge;
  const isActive = useIsActive(linkHref);

  return (
    <Link
      href={linkHref}
      className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
        isActive
          ? 'bg-gray-50 text-blue-600 dark:bg-gray-800 dark:text-white'
          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
      } ${status === 'done' && 'line-through'}`}
    >
      {title}
    </Link>
  );
}

function SidebarSection({ workshop }: WorkshopsWithLinkProps) {
  return (
    <div className="mb-6">
      <div className="text-xs font-semibold leading-6 text-gray-400">
        {workshop.title}
      </div>
      <ul className="-mx-2 space-y-1">
        {workshop.challenges.map((challenge, index) => (
          <li key={`challenge-${index}`}>
            <SectionItem challenge={challenge} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarContainer({ user }: User) {
  const { data: allWorkshopsStatus, error } = useFormatWorkshopDone(
    allWorkshops,
    user?.email,
  );

  if (error)
    return (
      <>
        {allWorkshops.map((workshop, index) => {
          return (
            <SidebarSection workshop={workshop} key={`workshop-${index}`} />
          );
        })}
      </>
    );

  return (
    <>
      {allWorkshopsStatus.map((workshop, index) => {
        return <SidebarSection workshop={workshop} key={`workshop-${index}`} />;
      })}
    </>
  );
}

export function Sidebar({ user }: User) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pt-20 dark:bg-neutral-900">
        <SidebarContainer user={user} />
      </div>
    </div>
  );
}
