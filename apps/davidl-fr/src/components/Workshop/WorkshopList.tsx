import React, { ReactElement } from 'react';

import { ButtonDownloadFile } from '~/components/Workshop/ButtonDownloadFile';
import { ButtonPreviewSlide } from '~/components/Workshop/ButtonPreviewSlide';
import { allWorkshops } from '~/pages/api/workshop';
import Link from 'next/link';
import { Workshop } from '~/types/workshop';

import Markdown from '~/components/MarkdownRenderer';
import { ButtonVideoLink } from '~/components/Workshop/ButtonVideoLink';
import { ListChallengeStatus } from '~/components/Workshop/ChallengeStatus';

interface WorkshopsWithLinkProps {
  workshop: Workshop;
}

const WorkshopsWithLink = ({ workshop }: WorkshopsWithLinkProps) => {
  const { id, title, description, urlPreview, urlPdf, urlVideo, challenges } =
    workshop;

  return (
    <div className="mb-24">
      <h2 id={id}>{title}</h2>
      <Markdown>{description}</Markdown>

      <div className="flex">
        {urlPreview && (
          <ButtonPreviewSlide title="View Slides" url={urlPreview} />
        )}
        {urlPdf && <ButtonDownloadFile title="Download Slides" url={urlPdf} />}
        {urlVideo && <ButtonVideoLink title="Video 🇫🇷" url={urlVideo} />}
      </div>

      <div className="mt-4">
        {challenges.map((challenge, index) => (
          <Link
            href={challenge.linkHref}
            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 visited:text-purple-600 hover:bg-gray-200 dark:text-white dark:visited:text-yellow-800 dark:hover:bg-gray-800"
            key={`challenge-${index}`}
          >
            {/* <div className="size-3">
            <ListChallengeStatus linkHref={challenge.linkHref} />
          </div> */}
            <span>{challenge.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export function WorkshopList() {
  return allWorkshops.map((workshop, index) => {
    return <WorkshopsWithLink workshop={workshop} key={`workshop-${index}`} />;
  });
}
