import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva('badge', {
  variants: {
    intent: {
      indigo: ['bg-indigo-400', 'text-indigo-100'],
      pink: ['bg-pink-400', 'text-pink-100'],
      cyan: ['bg-cyan-400', 'text-cyan-100'],
      yellow: ['bg-yellow-400', 'text-yellow-100'],
      green: ['bg-green-400', 'text-green-100'],
      lime: ['bg-lime-400', 'text-lime-100'],
    },
    size: {
      sm: ['text-sm', 'py-1', 'px-2', 'rounded-3xl'],
      md: ['text-base', 'py-2', 'px-4', 'rounded-3xl'],
    },
  },
  compoundVariants: [{ intent: 'indigo', size: 'md' }],
  defaultVariants: {
    intent: 'indigo',
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {}

export const Badge: React.FC<BadgeProps> = ({
  className,
  intent,
  size,
  ...props
}) => <div className={badge({ intent, size, className })} {...props} />;
