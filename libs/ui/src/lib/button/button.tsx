import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('button', {
  variants: {
    intent: {
      primary: [
        'bg-indigo-600',
        'hover:bg-indigo-700',
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
      sm: ['md:text-lg', 'shadow-sm', 'font-medium', 'text-sm', 'py-1', 'px-4'],
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
  compoundVariants: [{ intent: 'primary', size: 'md' }],
  defaultVariants: {
    intent: 'primary',
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
  intent,
  children,
  accessoryLeft,
  href,
  size,
  ...rest
}) => (
  <a
    href={href}
    target="_blank"
    className={button({ intent, size, className })} rel="noreferrer"
  >
    {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
    {children}
  </a>
);

export default Button;
