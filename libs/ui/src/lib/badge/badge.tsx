import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badge = cva('badge', {
  variants: {
    variant: {
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
