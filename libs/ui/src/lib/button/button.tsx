import { cva, type VariantProps } from 'class-variance-authority';
import Hyperlink from '../hyperlink/hyperlink';
import Link, { LinkProps } from 'next/link';

export const buttonVariants = cva('button', {
  variants: {
    variant: {
      filled: [
        'bg-indigo-600',
        'hover:bg-indigo-700',
        'dark:bg-indigo-900',
        'text-white',
        'rounded-md',
        'justify-between',
        'items-center',
        'flex',
      ],
      ghost: [
        'bg-white',
        'text-black',
        'hover:bg-gray-100',
        'flex',
        'items-center',
        'justify-between',
        'rounded-md',
      ],
    },
    size: {
      sm: ['shadow-sm', 'font-medium', 'text-sm', 'py-1', 'px-4'],
      md: [
        'md:text-lg',
        'md:px-6',
        'shadow-md',
        'font-medium',
        'text-base',
        'py-3',
      ],
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  accessoryLeft?: React.ReactNode;
  accessoryRight?: React.ReactNode;
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  isExternalLink?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  as: Element = 'button',
  className,
  variant,
  children,
  size,
  isExternalLink = false,
  ...rest
}) => {
  if (isExternalLink) {
    return (
      <Element
        className={buttonVariants({ variant, size, className })}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </Element>
    );
  }

  return (
    <Element className={buttonVariants({ variant, size, className })} {...rest}>
      {children}
    </Element>
  );
};

export default Button;
