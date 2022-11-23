import { cva, type VariantProps } from 'class-variance-authority';

const button = cva('badge', {
  variants: {
    intent: {
      primary: [
        'bg-indigo-600',
        'hover:bg-indigo-700',
        'text-white',
        'md:text-lg',
        'md:px-6',
        'shadow-md',
        'font-medium',
        'text-base',
        'py-3',
        'rounded-md',
        'justify-between',
        'items-center',
        'flex',
      ],
      indigo: [
        'bg-white',
        'text-black',
        'hover:bg-gray-100',
        'flex',
        'items-center',
        'justify-between',
        'rounded-md',
        'py-3',
        'md:text-lg',
        'md:px-6',
        'shadow-md',
        'font-medium',
        'text-base',
      ],
    },
  },
  compoundVariants: [{ intent: 'primary' }],
  defaultVariants: {
    intent: 'primary',
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof button> {
  variant?: 'primary' | 'secondary';
  accessoryLeft?: React.ReactNode;
  children?: React.ReactNode;
  // style?: string;
  // href: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  children,
  accessoryLeft,
  ...props
}) => (
  <a
    href="google.com"
    target="_blank"
    className={button({ intent, className })}
  >
    {accessoryLeft && <div className="flex">{accessoryLeft}</div>}
    {children}
  </a>
);

export default Button;
