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
    'shadow-sm',
    'transition',
    'active:scale-105',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-500',
          'focus-visible:outline-blue-600',
          'dark:bg-blue-500',
          'dark:text-white',
          'dark:hover:bg-blue-800',
          'dark:focus-visible:outline-blue-500',
        ],
        secondary: [
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
        link: [
          'text-gray-900',
          'dark:text-white',
          'hover:bg-gray-50',
          'dark:hover:bg-white/20',
        ],
      },
      disabled: {
        true: ['!cursor-not-allowed', '!opacity-50'],
      },
      size: {
        xs: ['rounded', 'px-2', 'py-1', 'text-xs'],
        sm: ['rounded', 'px-2', 'py-1', 'text-sm'],
        md: ['rounded-md', 'px-2.5', 'py-1.5', 'text-sm'],
        lg: ['rounded-md', 'px-3', 'py-2', 'text-sm'],
        xl: ['rounded-md', 'px-3.5', 'py-2.5', 'text-sm'],
        xxl: ['rounded-md', 'px-8', 'py-3', 'text-2xl'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

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
  withExternalLinkIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  as: Element = 'button',
  className,
  variant,
  children,
  size,
  isExternalLink = false,
  withExternalLinkIcon = true,
  accessoryLeft,
  accessoryRight,
  ...rest
}) => {
  if (isExternalLink) {
    return (
      <Element
        className={buttonVariants({ variant, size, className })}
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
    <Element className={buttonVariants({ variant, size, className })} {...rest}>
      {accessoryLeft && accessoryLeft}
      {children}
      {accessoryRight && accessoryRight}
    </Element>
  );
};

export default Button;
