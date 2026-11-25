import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const surfaceVariants = cva(['border', 'border-border', 'bg-card'], {
  defaultVariants: {
    padding: 'md',
    radius: 'xl',
  },
  variants: {
    /** Accent border on hover, for surfaces that link somewhere. */
    interactive: {
      true: ['transition-colors', 'hover:border-accent/50'],
    },
    padding: {
      none: '',
      sm: 'p-5',
      md: 'p-6',
      lg: 'p-6 md:p-8',
      xl: 'p-6 md:p-10',
    },
    radius: {
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
    },
  },
});

export interface SurfaceProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof surfaceVariants> {
  as?: React.ElementType;
}

/**
 * Bordered panel on the `card` token, the box every landing section is built
 * from. Unlike `<Card>` (slate palette, rounded-3xl), it follows the theme
 * tokens (`--card`, `--border`, `--accent`).
 */
export function Surface({
  as: Element = 'div',
  className,
  interactive,
  padding,
  radius,
  ...props
}: SurfaceProps) {
  return (
    <Element
      className={cn(
        surfaceVariants({ interactive, padding, radius }),
        className,
      )}
      {...props}
    />
  );
}

export default Surface;
