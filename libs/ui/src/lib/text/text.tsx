import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

export const TextVariants = cva([''], {
  variants: {
    variant: {
      h1: [
        'text-neutral-950',
        'text-4xl',
        'font-extrabold',
        'tracking-tight',
        'dark:text-neutral-200',
        'sm:text-5xl',
        'md:text-6xl',
        'lg:text-5xl',
        'xl:text-6xl',
      ],
      h2: [
        'text-neutral-950',
        'text-3xl',
        'font-bold',
        'tracking-tight',
        'dark:text-neutral-200',
        'sm:text-4xl',
        'md:text-5xl',
        'lg:text-4xl',
        'xl:text-5xl',
      ],
      h3: [
        'text-neutral-950',
        'text-2xl',
        'font-bold',
        'tracking-tight',
        'dark:text-neutral-200',
        'sm:text-3xl',
        'md:text-4xl',
        'lg:text-3xl',
        'xl:text-4xl',
      ],
      s1: [
        'text-neutral-950',
        'text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl dark:text-neutral-200',
      ],
      s2: [
        'text-neutral-950',
        'text-lg',
        'dark:text-neutral-200',
        'sm:text-xl',
        'md:text-2xl',
        'lg:text-xl',
        'xl:text-2xl',
      ],
      p1: [
        'text-neutral-950',
        'text-base',
        'dark:text-neutral-200',
        'sm:text-lg',
        'md:text-xl',
        'lg:text-lg',
        'xl:text-xl',
      ],
      p2: [
        'text-neutral-950',
        'text-sm',
        'font-medium',
        'dark:text-neutral-200',
        'sm:text-base',
        'md:text-lg',
        'lg:text-base',
        'xl:text-lg',
      ],
      c1: ['text-neutral-950', 'text-base', 'dark:text-neutral-200'],
      c2: [
        'text-neutral-950',
        'text-sm',
        'font-medium',
        'dark:text-neutral-200 ',
      ],
    },
  },
  defaultVariants: {
    variant: 'p1',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof TextVariants> {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 's1'
    | 's2'
    | 'p1'
    | 'p2'
    | 'c1'
    | 'c2'
    | undefined;
}

export const Text: React.FC<TextProps> = ({
  as: Element = 'p',
  className,
  variant = 'p1',
  children,
  ...rest
}) => {
  return (
    <Element className={TextVariants({ variant, className })} {...rest}>
      {children}
    </Element>
  );
};
