import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva([''], {
  variants: {
    variant: {
      blue: [
        'bg-blue-50',
        'text-blue-700',
        'ring-blue-700/10',
        'dark:bg-blue-400/10',
        'dark:text-blue-400',
        'dark:ring-blue-400/30',
      ],
      cyan: [
        'bg-cyan-50',
        'text-cyan-700',
        'ring-cyan-700/10',
        'dark:bg-cyan-400/10',
        'dark:text-cyan-400',
        'dark:ring-cyan-400/20',
      ],
      green: [
        'bg-green-50',
        'text-green-700',
        'ring-green-700/10',
        'dark:bg-green-400/10',
        'dark:text-green-400',
        'dark:ring-green-400/20',
      ],
      indigo: [
        'bg-indigo-50',
        'text-indigo-700',
        'ring-indigo-700/10',
        'dark:bg-indigo-400/10',
        'dark:text-indigo-400',
        'dark:ring-indigo-400/30',
      ],
      lime: [
        'bg-lime-50',
        'text-lime-700',
        'ring-lime-700/10',
        'dark:bg-lime-400/10',
        'dark:text-lime-400',
        'dark:ring-lime-400/20',
      ],
      pink: [
        'bg-pink-50',
        'text-pink-700',
        'ring-pink-700/10',
        'dark:bg-pink-400/10',
        'dark:text-pink-400',
        'dark:ring-pink-400/20',
      ],
      yellow: [
        'bg-yellow-50',
        'text-yellow-800',
        'ring-yellow-600/20',
        'dark:bg-yellow-400/10',
        'dark:text-yellow-500',
        'dark:ring-yellow-400/20',
      ],
      orange: [
        'bg-orange-50',
        'text-orange-800',
        'ring-orange-600/20',
        'dark:bg-orange-400/10',
        'dark:text-orange-500',
        'dark:ring-orange-400/20',
      ],
      red: [
        'bg-red-50',
        'text-red-800',
        'ring-red-600/20',
        'dark:bg-red-400/10',
        'dark:text-red-500',
        'dark:ring-red-400/20',
      ],
      'gray-lighter': [
        'bg-slate-50',
        'text-slate-600',
        'ring-slate-500/10',
        'dark:bg-slate-200/10',
        'dark:text-slate-400',
        'dark:ring-slate-200/20',
      ],
      'gray-light': [
        'bg-slate-100',
        'text-slate-700',
        'ring-slate-600/10',
        'dark:bg-slate-300/10',
        'dark:text-slate-400',
        'dark:ring-slate-300/20',
      ],
      gray: [
        'bg-slate-200',
        'text-slate-700',
        'ring-slate-800/10',
        'dark:bg-slate-400/10',
        'dark:text-slate-400',
        'dark:ring-slate-400/10',
      ],
      'gray-dark': [
        'bg-slate-400/50',
        'text-slate-800',
        'ring-slate-900/10',
        'dark:bg-slate-600/10',
        'dark:text-slate-400',
        'dark:ring-slate-600/10',
      ],
      'gray-darker': [
        'bg-slate-600/50',
        'text-slate-800',
        'ring-slate-900/10',
        'dark:bg-slate-900/10',
        'dark:text-slate-500',
        'dark:ring-slate-900/10',
      ],
    },
    size: {
      sm: [
        'inline-flex',
        'items-center',
        'rounded-full',
        'px-2',
        'py-1',
        'text-xs',
        'font-medium',
        'ring-1',
        'ring-inset',
      ],
      md: [
        'inline-flex',
        'items-center',
        'rounded-full',
        'px-4',
        'py-2',
        'text-sm',
        'font-medium',
        'ring-1',
        'ring-inset',
      ],
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
