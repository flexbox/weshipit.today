import { cva, type VariantProps } from 'class-variance-authority';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

const card = cva(
  [
    'rounded-xl',
    'bg-white',
    'dark:bg-slate-800',
    'ring-2 ring-inset ring-transparent',
    'shadow-none transition-shadow  duration-300 ease-in-out',
  ],
  {
    variants: {
      variant: {
        link: ['cursor-pointer hover:shadow-lg'],
        'gradient-blue': [
          'text-white',
          'bg-gradient-to-tr from-[#0E95EE] to-[#27C9F5]',
          'dark:bg-gradient-to-tr dark:from-[#07384B] dark:to-[#1dc8a6]',
          'ring-white/20',
          'cursor-pointer hover:shadow-lg',
        ],
        'gradient-pink': [
          'text-white',
          'bg-gradient-to-tr from-[#e98bd4] via-[#a48deb] to-[#5bbdf4]',
          'dark:from-[#803C71] dark:via-[#74376D] dark:to-[#215E86]',
          'ring-white/20',
          'cursor-pointer hover:shadow-lg',
        ],
        'gradient-purple': [
          'bg-gradient-to-tr from-slate-200 to-white',
          'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-slate-900',
          'dark:ring-white/20',
          'ring-blue-200/20',
          'cursor-pointer hover:shadow-lg',
        ],
        'gradient-purple-dark': [
          'bg-gradient-to-tr from-slate-200 to-slate-300',
          'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-slate-900',
          'dark:ring-white/10',
          'ring-blue-300/20',
        ],
        red: [
          '!bg-red-50',
          '!ring-red-600/20',
          'dark:!bg-red-400/10',
          'dark:!ring-red-400/20',
        ],
        green: [
          '!bg-green-50',
          '!ring-green-600/20',
          'dark:!bg-green-400/10',
          'dark:!ring-green-400/20',
        ],
      },
      size: {
        sm: ['p-4'],
        md: ['p-6'],
        lg: ['p-8'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export function Card({ className, variant, size, ...props }: CardProps) {
  return <div className={card({ variant, size, className })} {...props} />;
}

export default Card;
