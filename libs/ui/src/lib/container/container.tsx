import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const containerVariants = cva(['mx-auto', 'px-6'], {
  defaultVariants: {
    size: 'xl',
  },
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-5xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
    },
  },
});

export interface ContainerProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

/**
 * Centred, padded column. Pick the width with `size`:
 * sm = 3xl (FAQ, prose), md = 4xl, lg = 5xl, xl = 6xl (default), 2xl = 7xl.
 */
export function Container({
  as: Element = 'div',
  className,
  size,
  ...props
}: ContainerProps) {
  return (
    <Element
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

export default Container;
