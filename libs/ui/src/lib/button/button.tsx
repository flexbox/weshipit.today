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
    'hover:cursor-pointer',
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
        sm: ['rounded', 'px-2', 'py-1', 'text-sm'],
        md: ['rounded-md', 'px-2.5', 'py-1.5', 'text-sm'],
        lg: ['rounded-md', 'px-3', 'py-2', 'text-sm'],
        xl: ['rounded-md', 'px-3.5', 'py-2.5', 'text-sm'],
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
        spotify: [
          'shadow-sm',
          'bg-[#1db954]',
          'text-white',
          'hover:bg-[#1ed760]',
          'border-0',
        ],
        apple: [
          'shadow-sm',
          'bg-[#B150E2]',
          'text-white',
          'hover:bg-[#a13ed1]',
          'border-0',
        ],
      },
    },
  },
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
        {accessoryLeft && accessoryLeft}
        {children}
        {accessoryRight && accessoryRight}

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

export const SpotifyIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export const ApplePodcastIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);
