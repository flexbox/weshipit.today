import { cva, type VariantProps } from 'class-variance-authority';

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
  compoundVariants: [{ variant: 'filled', size: 'md' }],
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof button> {
  accessoryLeft?: React.ReactNode;
  children?: React.ReactNode;
  href: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  children,
  accessoryLeft,
  href,
  size,
}) => (
  <a
    href={href}
    className={button({ variant, size, className })}
    target="_blank"
    rel="noreferrer"
  >
    {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
    {children}
  </a>
);

export default Button;
