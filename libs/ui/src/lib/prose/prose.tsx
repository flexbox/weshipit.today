import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const prose = cva(['prose dark:prose-invert'], {
  defaultVariants: {
    size: 'base',
    variant: 'slate',
  },
  variants: {
    size: {
      '2xl': ['prose-2xl'],
      base: ['prose-base'],
      lg: ['prose-lg'],
      sm: ['prose-sm'],
      xl: ['prose-xl'],
    },
    variant: {
      slate: [
        'prose-slate prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-a:text-blue-700 dark:hover:prose-a:text-blue-800',
      ],
    },
  },
});

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof prose> {}

export const Prose: React.FC<ProseProps> = ({
  className,
  size,
  variant,
  ...props
}) => <div className={prose({ className, size, variant })} {...props} />;
