import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva([''], {
  defaultVariants: {
    size: 'md',
    variant: 'indigo',
  },
  variants: {
    size: {
      md: [
        'inline-flex',
        'items-center',
        'gap-2',
        'rounded-full',
        'px-4',
        'py-2',
        'text-sm',
        'font-medium',
        'outline-1',
        '-outline-offset-1',
      ],
      sm: [
        'inline-flex',
        'items-center',
        'gap-1.5',
        'rounded-full',
        'px-2',
        'py-1',
        'text-xs',
        'font-medium',
        'outline-1',
        '-outline-offset-1',
      ],
    },
    variant: {
      /** Theme accent, the pill above landing-page headings. */
      accent: ['bg-accent/10', 'text-accent', 'outline-accent/30'],
      /** Theme neutral, for quiet labels on `card` surfaces. */
      neutral: [
        'bg-secondary',
        'text-neutral-500',
        'outline-border',
        'dark:text-neutral-400',
      ],
      blue: [
        'bg-blue-50',
        'text-blue-700',
        'outline-blue-700/10',
        'dark:bg-blue-400/10',
        'dark:text-blue-400',
        'dark:outline-blue-400/30',
      ],
      cyan: [
        'bg-cyan-50',
        'text-cyan-700',
        'outline-cyan-700/10',
        'dark:bg-cyan-400/10',
        'dark:text-cyan-400',
        'dark:outline-cyan-400/20',
      ],
      gray: [
        'bg-slate-200',
        'text-slate-700',
        'outline-slate-800/10',
        'dark:bg-slate-400/10',
        'dark:text-slate-400',
        'dark:outline-slate-400/10',
      ],
      'gray-dark': [
        'bg-slate-400/50',
        'text-slate-800',
        'outline-slate-900/10',
        'dark:bg-slate-600/10',
        'dark:text-slate-400',
        'dark:outline-slate-600/10',
      ],
      'gray-darker': [
        'bg-slate-600/50',
        'text-slate-800',
        'outline-slate-900/10',
        'dark:bg-slate-900/10',
        'dark:text-slate-500',
        'dark:outline-slate-900/10',
      ],
      'gray-light': [
        'bg-slate-100',
        'text-slate-700',
        'outline-slate-600/10',
        'dark:bg-slate-300/10',
        'dark:text-slate-400',
        'dark:outline-slate-300/20',
      ],
      'gray-lighter': [
        'bg-slate-50',
        'text-slate-600',
        'outline-slate-500/10',
        'dark:bg-slate-200/10',
        'dark:text-slate-400',
        'dark:outline-slate-200/20',
      ],
      green: [
        'bg-green-50',
        'text-green-700',
        'outline-green-700/10',
        'dark:bg-green-400/10',
        'dark:text-green-400',
        'dark:outline-green-400/20',
      ],
      indigo: [
        'bg-indigo-50',
        'text-indigo-700',
        'outline-indigo-700/10',
        'dark:bg-indigo-400/10',
        'dark:text-indigo-400',
        'dark:outline-indigo-400/30',
      ],
      lime: [
        'bg-lime-50',
        'text-lime-700',
        'outline-lime-700/10',
        'dark:bg-lime-400/10',
        'dark:text-lime-400',
        'dark:outline-lime-400/20',
      ],
      orange: [
        'bg-orange-50',
        'text-orange-800',
        'outline-orange-600/20',
        'dark:bg-orange-400/10',
        'dark:text-orange-500',
        'dark:outline-orange-400/20',
      ],
      pink: [
        'bg-pink-50',
        'text-pink-700',
        'outline-pink-700/10',
        'dark:bg-pink-400/10',
        'dark:text-pink-400',
        'dark:outline-pink-400/20',
      ],
      red: [
        'bg-red-50',
        'text-red-800',
        'outline-red-600/20',
        'dark:bg-red-400/10',
        'dark:text-red-500',
        'dark:outline-red-400/20',
      ],
      yellow: [
        'bg-yellow-50',
        'text-yellow-800',
        'outline-yellow-600/20',
        'dark:bg-yellow-400/10',
        'dark:text-yellow-500',
        'dark:outline-yellow-400/20',
      ],
    },
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {}

export const Badge: React.FC<BadgeProps> = ({
  className,
  size,
  variant,
  ...props
}) => <div className={badge({ className, size, variant })} {...props} />;
