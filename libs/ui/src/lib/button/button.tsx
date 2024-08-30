import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'font-semibold',
    'transition',
    'active:scale-105',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      disabled: {
        true: ['!cursor-not-allowed', '!opacity-50'],
      },
      size: {
        lg: ['rounded-md', 'px-3', 'py-2', 'text-sm'],
        md: ['rounded-md', 'px-2.5', 'py-1.5', 'text-sm'],
        sm: ['rounded', 'px-2', 'py-1', 'text-sm'],
        xl: ['rounded-md', 'px-3.5', 'py-2.5', 'text-sm'],
        xs: ['rounded', 'px-2', 'py-1', 'text-xs'],
        xxl: ['rounded-md', 'px-8', 'py-3', 'text-2xl'],
      },
      variant: {
        ghost: [
          'text-gray-900',
          'dark:text-white',
          'hover:bg-gray-50',
          'dark:hover:bg-white/20',
        ],
        outline: [
          'shadow-sm',
          'bg-white',
          'text-gray-900',
          'ring-1',
          'ring-inset',
          'ring-gray-300',
          'dark:text-white',
          'dark:ring-0',
          'hover:bg-gray-50',
          'dark:bg-white/10',
          'dark:hover:bg-white/20',
        ],
        primary: [
          'shadow-sm',
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-500',
          'focus-visible:outline-blue-600',
          'dark:bg-blue-700',
          'dark:text-white',
          'dark:hover:bg-blue-800',
          'dark:focus-visible:outline-blue-700',
        ],
        secondary: [
          'shadow-sm',
          'bg-blue-50',
          'text-blue-600',
          'hover:bg-blue-100',
        ],
      },
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  rel?: string;
  href?: string;
  target?: string;
  as?: React.ElementType;
  isExternalLink?: boolean;
  children: React.ReactNode;
  withExternalLinkIcon?: boolean;
  accessoryLeft?: React.ReactNode;
  accessoryRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  accessoryLeft,
  accessoryRight,
  as: Element = 'button',
  children,
  className,
  isExternalLink = false,
  size,
  variant,
  withExternalLinkIcon = true,
  ...rest
}) => {
  if (isExternalLink) {
    return (
      <Element
        className={buttonVariants({ className, size, variant })}
        target="_blank"
        {...rest}
      >
        {children}

        {withExternalLinkIcon && (
          <ArrowTopRightOnSquareIcon
            className="-mr-0.5 ml-1 size-5 opacity-40"
            aria-hidden="true"
          />
        )}
      </Element>
    );
  }

  return (
    <Element className={buttonVariants({ className, size, variant })} {...rest}>
      {accessoryLeft && accessoryLeft}
      {children}
      {accessoryRight && accessoryRight}
    </Element>
  );
};

export default Button;
