import Card from './card';

import Image from 'next/image';
import { Prose } from '../prose/prose';

export interface WorkflowCardImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface WorkflowCardProps {
  step: number;
  title: string;
  image: WorkflowCardImage;
  children: React.ReactNode;
}

export function WorkflowCard({
  children,
  image,
  step,
  title,
}: WorkflowCardProps) {
  return (
    <Card size="sm" className="flex flex-col p-4 !rounded-3xl sm:flex-row">
      <div className="flex items-center justify-center md:w-5/12">
        <Image
          src={image.url}
          width={429}
          height={335}
          className="m-0 rounded-lg bg-slate-300 dark:bg-slate-700"
          // Decorative: the step title carries the meaning
          alt=""
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
