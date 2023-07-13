import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardGradient = cva('card', {
  variants: {
    variant: {
      'blue-light': [
        'shadow-none transition-shadow hover:shadow-xl delay-100 ease-in-out',
        'bg-gradient-to-tr from-[#0E95EE] to-[#27C9F5]',
        'dark:bg-gradient-to-tr dark:from-[#07384B] dark:to-[#1dc8a6]',
        'rounded-xl',
        'ring-1 ring-inset dark:ring-white/20',
      ],
      pink: [
        'shadow-none transition-shadow hover:shadow-xl delay-100 ease-in-out',
        'bg-gradient-to-tr from-[#e98bd4] via-[#a48deb] to-[#5bbdf4]',
        'dark:from-[#803C71] dark:via-[#74376D] dark:to-[#215E86]',
        'rounded-xl',
        'ring-1 ring-inset dark:ring-white/20',
      ],
      purple: [
        'shadow-none transition-shadow hover:shadow-xl delay-100 ease-in-out',
        'bg-gradient-to-tr from-blue-100 to-gray-50',
        'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-black',
        'rounded-xl',
        'ring-1 ring-inset dark:ring-white/20',
      ],
    },
  },
  defaultVariants: {
    variant: 'blue-light',
  },
});

export interface CardGradientProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardGradient> {}

export const CardGradient: React.FC<CardGradientProps> = ({
  className,
  variant,
  ...props
}) => <div className={cardGradient({ variant, className })} {...props} />;

export default CardGradient;
