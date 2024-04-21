import Card from './card';
import Image from 'next/image';

export interface WorkflowCardProps {
  children: React.ReactNode;
  step: number;
  title: string;
}

export function WorkflowCard({ step, title, children }: WorkflowCardProps) {
  return (
    <Card size="xs" className="flex">
      <div>
        <Image
          src="https://images.prismic.io/weshipit/ZiO9tPPdc1huKpyW_CleanShot2024-04-20at15.05.14%402x.png?auto=compress%2Cformat&rect=1%2C0%2C2090%2C1608&w=800&h=800&fit=max"
          alt="Step 1"
          width={500}
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
