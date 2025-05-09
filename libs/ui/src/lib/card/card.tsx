import { cva, type VariantProps } from 'class-variance-authority';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

const card = cva(
  [
    'overflow-hidden',
    'rounded-3xl',
    'bg-white dark:bg-slate-900',
    'ring-1',
    'ring-slate-200 dark:ring-slate-800',
    'text-slate-900 dark:text-white',
    'transition-shadow',
    'duration-300',
    'ease-in-out',
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
          'dark:shadow-md',
          'dark:shadow-slate-400',
        ],
      },
      size: {
        sm: ['p-4 !rounded-2xl'],
        md: ['p-6'],
        lg: ['p-8'],
        xl: ['p-16'],
      },
      variant: {
        featured: [
          '!bg-slate-900 dark:!bg-white',
          '!ring-slate-800 dark:!ring-slate-700',
          '!text-white dark:!text-slate-900',
        ],
        'gradient-blue': [
          'text-white',
          'bg-gradient-to-tr from-[#0E95EE] to-[#27C9F5]',
          'dark:bg-gradient-to-tr dark:from-sky-900/50 dark:to-sky-800/50',
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
          'text-slate-900 dark:text-slate-100',
        ],
        green: [
          '!bg-green-50 dark:!bg-green-900/20',
          '!ring-green-600/20 dark:!ring-green-400/30',
          'text-slate-900 dark:text-slate-100',
        ],
        link: [
          'cursor-pointer hover:shadow-lg',
          'text-slate-900 dark:text-slate-100',
        ],
        red: [
          '!bg-red-50 dark:!bg-red-900/20',
          '!ring-red-600/20 dark:!ring-red-400/30',
          'text-slate-900 dark:text-slate-100',
        ],
      },
    },
  },
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
