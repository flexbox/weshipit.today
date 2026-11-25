'use client';

import { ReactNode } from 'react';
import { cn } from '../utils/cn';
import {
  revealClassName,
  revealOffsetClassName,
  useReveal,
} from '../fade-in/use-reveal';
import { CountUp } from '../count-up/count-up';

interface StatItem {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

interface StatisticsGridProps {
  items: StatItem[];
  className?: string;
}

function StatCard({ delay, item }: { delay: number; item: StatItem }) {
  const { phase, ref } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={phase}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center',
        revealClassName,
        revealOffsetClassName.up,
      )}
    >
      <div className="h-12 w-12 mx-auto text-blue-600 mb-4">{item.icon}</div>
      <div className="text-3xl font-bold mb-2">
        <CountUp end={item.value} suffix={item.suffix} />
      </div>
      <p>{item.label}</p>
    </div>
  );
}

export function StatisticsGrid({ items, className = '' }: StatisticsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 my-8 ${className}`}>
      {items.map((item, index) => (
        <StatCard key={index} item={item} delay={item.delay || index * 0.2} />
      ))}
    </div>
  );
}

export default StatisticsGrid;
