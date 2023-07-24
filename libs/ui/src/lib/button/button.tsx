import { cva, type VariantProps } from 'class-variance-authority';
import Hyperlink from '../hyperlink/hyperlink';
import { rest } from 'lodash';

const button = cva('button', {
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
    VariantProps<typeof button> {
  accessoryLeft?: React.ReactNode;
  accessoryRight?: React.ReactNode;
  children?: React.ReactNode;
  as: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  as: Element = 'button',
  href,
  className,
  variant,
  children,
  accessoryLeft,
  accessoryRight,
  size,
  as,
  target,
  rel,
  ...restProps
}) => {
  return (
    <Element {...restProps} className={button({ variant, size, className })}>
      {children}
    </Element>
  );
};

export default Button;
