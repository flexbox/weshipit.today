'use client';

import { ReactNode } from 'react';
import { cn } from '../utils/cn';
import {
  revealClassName,
  revealOffsetClassName,
  useReveal,
} from '../fade-in/use-reveal';
import { Text } from '../text/text';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  animationDirection?: 'left' | 'right';
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

function FeatureCard({ delay, item }: { delay: number; item: FeatureItem }) {
  const { phase, ref } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={phase}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'bg-slate-50 dark:bg-slate-800 p-6 rounded-xl',
        revealClassName,
        revealOffsetClassName[item.animationDirection ?? 'left'],
      )}
    >
      <div className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2">
        {item.icon}
      </div>
      <Text as="h3" variant="h5" className="mt-0">
        {item.title}
      </Text>
      <p className="text-slate-700 dark:text-slate-300">{item.description}</p>
    </div>
  );
}

export function FeatureGrid({
  items,
  columns = 2,
  className = '',
}: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`grid grid-cols-1 ${gridCols[columns]} gap-6 my-8 ${className}`}
    >
      {items.map((item, index) => (
        <FeatureCard
          key={index}
          item={item}
          delay={item.delay || (index % 2) * 0.2}
        />
      ))}
    </div>
  );
}

export default FeatureGrid;
