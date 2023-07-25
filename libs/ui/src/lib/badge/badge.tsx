import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva('badge', {
  variants: {
    variant: {
      blue: [
        'bg-blue-400',
        'text-blue-700',
        'dark:bg-blue-800',
        'dark:text-blue-200',
      ],
      cyan: [
        'bg-cyan-400',
        'text-cyan-700',
        'dark:bg-cyan-800',
        'dark:text-cyan-200',
      ],
      green: [
        'bg-green-400',
        'text-green-700',
        'dark:bg-green-800',
        'dark:text-green-200',
      ],
      indigo: [
        'bg-indigo-300',
        'text-indigo-700',
        'dark:bg-indigo-800',
        'dark:text-indigo-200',
      ],
      lime: [
        'bg-lime-400',
        'text-lime-700',
        'dark:bg-lime-800',
        'dark:text-lime-200',
      ],
      pink: [
        'bg-pink-400',
        'text-pink-900',
        'dark:bg-pink-800',
        'dark:text-pink-200',
      ],
      yellow: [
        'bg-yellow-400',
        'text-yellow-700',
        'dark:bg-yellow-800',
        'dark:text-yellow-200',
      ],
      orange: [
        'bg-orange-400',
        'text-orange-700',
        'dark:bg-orange-800',
        'dark:text-orange-200',
      ],
      'gray-lighter': [
        'bg-slate-100',
        'text-slate-700',
        'dark:bg-slate-800',
        'dark:text-slate-200',
      ],
      'gray-light': [
        'bg-slate-300',
        'text-slate-700',
        'dark:bg-slate-800',
        'dark:text-slate-200',
      ],
      gray: [
        'bg-slate-500',
        'text-slate-200',
        'dark:bg-slate-800',
        'dark:text-slate-200',
      ],
      'gray-dark': [
        'bg-slate-700',
        'text-slate-200',
        'dark:bg-slate-900',
        'dark:text-slate-200',
      ],
      'gray-darker': [
        'bg-slate-900',
        'text-slate-200',
        'dark:bg-slate-900',
        'dark:text-slate-200',
      ],
    },
    size: {
      sm: ['text-sm', 'py-1', 'px-2', 'rounded-3xl'],
      md: ['text-base', 'py-2', 'px-4', 'rounded-3xl', 'font-semibold'],
    },
  },
  defaultVariants: {
    variant: 'indigo',
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  ...props
}) => <div className={badge({ variant, size, className })} {...props} />;
