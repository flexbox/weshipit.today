import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva('badge', {
  variants: {
    variant: {
      blue: ['bg-blue-400', 'text-blue-700'],
      cyan: ['bg-cyan-400', 'text-cyan-700'],
      green: ['bg-green-400', 'text-green-700'],
      indigo: ['bg-indigo-400', 'text-indigo-700'],
      lime: ['bg-lime-400', 'text-lime-700'],
      pink: ['bg-pink-400', 'text-pink-900'],
      yellow: ['bg-yellow-400', 'text-yellow-700'],
      gray: ['bg-slate-400', 'text-slate-700'],
    },
    size: {
      sm: ['text-sm', 'py-1', 'px-2', 'rounded-3xl'],
      md: ['text-base', 'py-2', 'px-4', 'rounded-3xl', 'font-semibold'],
    },
  },
  compoundVariants: [{ variant: 'indigo', size: 'md' }],
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
