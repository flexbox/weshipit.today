import Card from './card';

import { PrismicNextImage } from '@prismicio/next';
import { ImageFieldImage } from '@prismicio/client';
import { Prose } from '../prose/prose';

export interface WorkflowCardProps {
  step: number;
  title: string;
  image: ImageFieldImage;
  children: React.ReactNode;
}

export function WorkflowCard({
  children,
  image,
  step,
  title,
}: WorkflowCardProps) {
  return (
    <Card size="xs" className="flex flex-col p-4 sm:flex-row">
      <div className="flex items-center justify-center md:w-5/12">
        <PrismicNextImage
          field={image}
          width={429}
          height={335}
          className="m-0 rounded-lg bg-slate-300 dark:bg-slate-700"
          alt=""
          // https://github.com/prismicio/prismic-next/blob/main/messages/alt-must-be-an-empty-string.md
          // should be empty string
        />
      </div>
      <div className="px-6 md:w-7/12">
        <Prose size="xl">
          <p className="mb-0 opacity-60">Step {step}</p>
          <h3 className="mt-0">{title}</h3>
          {children}
        </Prose>
      </div>
    </Card>
  );
}

export default WorkflowCard;
