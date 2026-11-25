import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const surfaceVariants = cva('border', {
  defaultVariants: {
    padding: 'md',
    radius: 'xl',
    tone: 'default',
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
    tone: {
      default: ['border-border', 'bg-card'],
      /** Highlighted box: recommendation, guarantee, key takeaway. */
      accent: ['border-accent/30', 'bg-accent/5'],
      /** Warning or “don't” box. */
      destructive: ['border-destructive/30', 'bg-destructive/5'],
      /** Recessed box inside another surface. */
      muted: ['border-border', 'bg-secondary/50'],
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
 * Bordered panel on the theme tokens, the box every landing section is built
 * from. `tone` picks the fill: `default` (card), `accent`, `destructive`, `muted`. Unlike `<Card>` (slate palette, rounded-3xl), it follows the theme
 * tokens (`--card`, `--border`, `--accent`).
 */
export function Surface({
  as: Element = 'div',
  className,
  interactive,
  padding,
  radius,
  tone,
  ...props
}: SurfaceProps) {
  return (
    <Element
      className={cn(
        surfaceVariants({ interactive, padding, radius, tone }),
        className,
      )}
      {...props}
    />
  );
}

export default Surface;
