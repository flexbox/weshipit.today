import Card from './card';
import Image from 'next/image';
import { PrismicNextImage } from '@prismicio/next';
import { ImageFieldImage } from '@prismicio/client';

export interface WorkflowCardProps {
  children: React.ReactNode;
  step: number;
  title: string;
  image: ImageFieldImage;
}

export function WorkflowCard({
  step,
  title,
  children,
  image,
}: WorkflowCardProps) {
  return (
    <Card size="xs" className="flex flex-col sm:flex-row">
      <div className="flex items-center justify-center md:w-5/12">
        <PrismicNextImage
          field={image}
          width={330}
          height={250}
          className="m-0 rounded-lg bg-slate-300 dark:bg-slate-700"
        />
      </div>
      <div className="px-6 md:w-7/12">
        <p className="mb-0 opacity-60">Step {step}</p>
        <h3 className="mt-0">{title}</h3>
        {children}
      </div>
    </Card>
  );
}

export default WorkflowCard;
