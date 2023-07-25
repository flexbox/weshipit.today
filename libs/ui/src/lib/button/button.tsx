import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('button', {
  variants: {
    variant: {
      filled: [
        'bg-indigo-600',
        'hover:bg-indigo-700',
        'dark:bg-indigo-900',
        'text-white',
        'dark:text-indigo-200',
      ],
      ghost: ['bg-white', 'hover:bg-gray-100', 'text-slate-900'],
    },
    size: {
      sm: [
        'flex',
        'items-center',
        'justify-between',
        'shadow-sm',
        'rounded-md',
        'font-medium',
        'text-sm',
        'py-1',
        'px-4',
      ],
      md: [
        'flex',
        'items-center',
        'justify-between',
        'rounded-md',
        'shadow-md',
        'font-medium',
        'text-base',
        'py-3',
        'md:text-lg',
        'md:px-6',
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
        <span>
          <ArrowTopRightOnSquareIcon className="ml-4 h-4 w-4 text-gray-400" />
        </span>
      </Element>
    );
  }

  return (
    <Element className={buttonVariants({ variant, size, className })} {...rest}>
      {accessoryLeft && <span className="mr-2">{accessoryLeft}</span>}
      {children}
      {accessoryRight && <span className="ml-2">{accessoryRight}</span>}
    </Element>
  );
};

export default Button;
