import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
      {items.map((item, index) => {
        const xOffset = item.animationDirection === 'right' ? 20 : -20;
        return (
          <motion.div
            key={index}
            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl"
            initial={{ opacity: 0, x: xOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: item.delay || (index % 2) * 0.2,
            }}
            viewport={{ once: true }}
          >
            <div className="h-8 w-8 text-blue-600 mb-2">{item.icon}</div>
            <h3 className="mt-0 text-xl font-bold">{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FeatureGrid;
