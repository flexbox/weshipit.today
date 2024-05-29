import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const prose = cva(['prose dark:prose-invert'], {
  variants: {
    variant: {
      slate: [
        'prose-slate prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-700 dark:hover:prose-a:text-blue-800',
      ],
    },
    size: {
      sm: ['prose-sm'],
      base: ['prose-base'],
      lg: ['prose-lg'],
      xl: ['prose-xl'],
      '2xl': ['prose-2xl'],
    },
  },
  defaultVariants: {
    variant: 'slate',
    size: 'base',
  },
});

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof prose> {}

export const Prose: React.FC<ProseProps> = ({
  className,
  variant,
  size,
  ...props
}) => <div className={prose({ variant, size, className })} {...props} />;
