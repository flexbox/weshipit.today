import { cva, type VariantProps } from 'class-variance-authority';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

const card = cva(
  [
    'rounded-xl',
    'bg-white',
    'dark:bg-slate-800',
    'ring-4 ring-inset ring-transparent',
    'shadow-none transition-shadow duration-300 ease-in-out',
  ],
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      shadow: {
        light: [
          'shadow-md',
          'hover:shadow-slate-400',
          'dark:shadow-sm',
          'dark:shadow-slate-400',
        ],
      },
      size: {
        lg: ['p-8'],
        md: ['p-6'],
        sm: ['p-4'],
        xl: ['p-16'],
        xs: ['p-0'],
      },
      variant: {
        'gradient-blue': [
          'text-white',
          'bg-gradient-to-tr from-[#0E95EE] to-[#27C9F5]',
          'dark:bg-gradient-to-tr dark:from-teal-950 dark:to-emerald-600',
          'ring-white/20 dark:ring-emerald-200/20',
        ],
        'gradient-pink': [
          'text-white',
          'bg-gradient-to-tr from-purple-700 to-pink-200',
          'dark:from-[#803C71] dark:via-[#74376D] dark:to-[#215E86]',
          'ring-white/20',
        ],
        'gradient-purple': [
          'bg-gradient-to-tr from-slate-200 to-white',
          'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-slate-900',
          'dark:ring-white/20',
          'ring-blue-200/20',
        ],
        'gradient-purple-dark': [
          'bg-gradient-to-tr from-slate-200 to-slate-300',
          'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-slate-900',
          'dark:ring-white/10',
          'ring-blue-300/20',
        ],
        green: [
          '!bg-green-50',
          '!ring-green-600/20',
          'dark:!bg-green-400/10',
          'dark:!ring-green-400/20',
        ],
        link: ['cursor-pointer hover:shadow-lg'],
        red: [
          '!bg-red-50',
          '!ring-red-600/20',
          'dark:!bg-red-400/10',
          'dark:!ring-red-400/20',
        ],
      },
    },
  }
);

export function Card({
  className,
  shadow,
  size,
  variant,
  ...props
}: CardProps) {
  return (
    <div className={card({ className, shadow, size, variant })} {...props} />
  );
}

export default Card;
