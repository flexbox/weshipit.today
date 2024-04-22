import Card from './card';
import Image from 'next/image';

export interface WorkflowCardProps {
  children: React.ReactNode;
  step: number;
  title: string;
  image: any;
}

export function WorkflowCard({
  step,
  title,
  children,
  image,
}: WorkflowCardProps) {
  const imageUrl = image.url || image[0]?.url;
  return (
    <Card size="xs" className="flex flex-col sm:flex-row">
      <div className="p-6 sm:p-0">
        <Image
          src={imageUrl}
          alt={`Step ${step}`}
          width={400}
          height={400}
          className="m-0 rounded-lg bg-slate-300 dark:bg-slate-700"
        />
      </div>
      <div className="px-6">
        <p className="mb-0 opacity-60">Step {step}</p>
        <h3 className="mt-0">{title}</h3>
        {children}
      </div>
    </Card>
  );
}

export default WorkflowCard;
