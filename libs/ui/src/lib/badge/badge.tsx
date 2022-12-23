import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva('badge', {
  variants: {
    intent: {
      primary: ['bg-indigo-400', 'text-indigo-100', 'rounded-3xl'],
      indigo: ['bg-indigo-400', 'text-indigo-100', 'rounded-3xl'],
      pink: ['bg-pink-400', 'text-pink-100', 'rounded-3xl'],
      cyan: ['bg-cyan-400', 'text-cyan-100', 'rounded-3xl'],
      yellow: ['bg-yellow-400', 'text-yellow-100', 'rounded-3xl'],
      green: ['bg-green-400', 'text-green-100', 'rounded-3xl'],
      lime: ['bg-lime-400', 'text-lime-100', 'rounded-3xl'],
    },
    size: {
      sm: ['text-sm', 'py-1', 'px-2'],
      md: ['text-base', 'py-2', 'px-4'],
    },
  },
  compoundVariants: [{ intent: 'primary', size: 'md' }],
  defaultVariants: {
    intent: 'primary',
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
