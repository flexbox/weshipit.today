import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const text = cva('badge', {
  variants: {
    // size: {
    //   sm: ['text-sm', 'py-1', 'px-2', 'rounded-3xl'],
    //   md: ['text-base', 'py-2', 'px-4', 'rounded-3xl'],
    //   lg: ['text-lg', 'py-2', 'px-4', 'rounded-3xl'],
    //   xl: ['text-xl', 'py-2', 'px-4', 'rounded-3xl'],
    //   xxl: ['text-2xl', 'py-2', 'px-4', 'rounded-3xl'],
    // },
    variant: {
      span: ['span'],
      p: ['p'],
      h1: ['h1'],
      h2: ['h2'],
      h3: ['h3'],
      h4: ['h4'],
      h5: ['h5'],
      h6: ['h6'],
      div: ['div'],
    },
    textStyle: {
      h1: [
        'text-4xl font-extrabold tracking-tight dark:text-slate-200 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl',
      ],
      h2: [
        'text-3xl font-bold tracking-tight dark:text-slate-200 sm:text-4xl  md:text-5xl lg:text-4xl xl:text-5xl ',
      ],
      h3: [
        'text-2xl font-bold tracking-tight dark:text-slate-200 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl ',
      ],
      s1: [
        'text-xl dark:text-slate-200 sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl',
      ],
      s2: [
        'text-lg dark:text-slate-200 sm:text-xl md:text-2xl lg:text-xl xl:text-2xl',
      ],
      p1: [
        'text-base dark:text-slate-200 sm:text-lg md:text-xl lg:text-lg xl:text-xl',
      ],
      p2: [
        'text-sm font-medium dark:text-slate-200 sm:text-base md:text-lg lg:text-base xl:text-lg ',
      ],
    },
  },
  compoundVariants: [{ variant: 'h2', textStyle: 'h2' }],
  defaultVariants: {
    variant: 'p',
    textStyle: 'p1',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof text> {}

export const Text: React.FC<TextProps> = ({
  className,
  variant,
  textStyle,
  ...props
}) => {
  if (variant === 'span') {
    return (
      <span className={text({ className, textStyle })} {...props}>
        {props.children}
      </span>
    );
  }
  if (variant === 'p') {
    return (
      <p className={text({ className, textStyle })} {...props}>
        {props.children}
      </p>
    );
  }
  if (variant === 'h1') {
    return (
      <h1 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h1>
    );
  }
  if (variant === 'h2') {
    return (
      <h2 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h2>
    );
  }
  if (variant === 'h3') {
    return (
      <h3 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h3>
    );
  }
  if (variant === 'h4') {
    return (
      <h4 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h4>
    );
  }
  if (variant === 'h5') {
    return (
      <h5 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h5>
    );
  }
  if (variant === 'h6') {
    return (
      <h6 className={text({ className, textStyle })} {...props}>
        {props.children}
      </h6>
    );
  }
  return (
    <div className={text({ className, textStyle })} {...props}>
      {props.children}
    </div>
  );
};
