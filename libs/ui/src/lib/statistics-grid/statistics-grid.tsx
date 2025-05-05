import { ReactNode } from 'react';
import { motion } from 'framer-motion';
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

export function StatisticsGrid({ items, className = '' }: StatisticsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 my-8 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item.delay || index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="h-12 w-12 mx-auto text-blue-600 mb-4">
            {item.icon}
          </div>
          <div className="text-3xl font-bold mb-2">
            <CountUp end={item.value} suffix={item.suffix} />
          </div>
          <p>{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default StatisticsGrid;
