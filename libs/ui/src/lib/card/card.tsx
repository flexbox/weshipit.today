import { cva, type VariantProps } from 'class-variance-authority';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

const card = cva(
  [
    'rounded-3xl',
    'bg-white dark:bg-slate-800',
    'ring-1',
    'ring-gray-200 dark:ring-gray-700',
    'text-gray-900 dark:text-gray-100',
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
        pricing: [
          'bg-white dark:bg-gray-900',
          'ring-gray-200 dark:ring-gray-800',
          'text-gray-900 dark:text-white',
          'p-8 xl:p-10',
          '[&_p]:text-gray-600 [&_p]:dark:text-gray-300',
          '[&_h3]:text-gray-900 [&_h3]:dark:text-white',
          '[&_li]:text-gray-600 [&_li]:dark:text-gray-300',
          '[&_svg]:text-blue-600 [&_svg]:dark:text-blue-400',
          '[&_.price]:text-gray-900 [&_.price]:dark:text-white',
          '[&_a]:bg-blue-600 [&_a]:text-white [&_a]:hover:bg-blue-500',
          '[&_a]:dark:bg-blue-500 [&_a]:dark:text-white [&_a]:dark:hover:bg-blue-400',
          'isolate',
        ],
        'pricing-featured': [
          '!bg-gray-900 dark:!bg-white',
          '!ring-gray-800 dark:!ring-gray-200',
          '!text-white dark:!text-gray-900',
          'p-8 xl:p-10',
          '[&_p]:!text-gray-300 [&_p]:dark:!text-gray-600',
          '[&_h3]:!text-white [&_h3]:dark:!text-gray-900',
          '[&_li]:!text-gray-300 [&_li]:dark:!text-gray-600',
          '[&_svg]:!text-white [&_svg]:dark:!text-blue-600',
          '[&_.price]:!text-white [&_.price]:dark:!text-gray-900',
          '[&_a]:!bg-white/10 [&_a]:!text-white [&_a]:hover:!bg-white/20',
          '[&_a]:dark:!bg-gray-900 [&_a]:dark:!text-white [&_a]:dark:hover:!bg-gray-800',
          'isolate',
        ],
        featured: [
          '!bg-gray-900 dark:!bg-white',
          '!ring-gray-800 dark:!ring-gray-200',
          '!text-white dark:!text-gray-900',
          '[&_svg]:!text-white [&_svg]:dark:!text-blue-600',
          '[&_.price]:!text-white [&_.price]:dark:!text-gray-900',
        ],
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
          'text-gray-900 dark:text-gray-100',
        ],
        'gradient-purple-dark': [
          'bg-gradient-to-tr from-slate-200 to-slate-300',
          'dark:bg-gradient-to-bl dark:from-blue-900 dark:to-slate-900',
          'dark:ring-white/10',
          'ring-blue-300/20',
          'text-gray-900 dark:text-gray-100',
        ],
        green: [
          '!bg-green-50 dark:!bg-green-900/20',
          '!ring-green-600/20 dark:!ring-green-400/30',
          'text-gray-900 dark:text-gray-100',
        ],
        link: [
          'cursor-pointer hover:shadow-lg',
          'text-gray-900 dark:text-gray-100',
        ],
        red: [
          '!bg-red-50 dark:!bg-red-900/20',
          '!ring-red-600/20 dark:!ring-red-400/30',
          'text-gray-900 dark:text-gray-100',
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
