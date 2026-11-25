import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

export const sectionVariants = cva('', {
  defaultVariants: {
    spacing: 'lg',
    variant: 'divided',
  },
  variants: {
    spacing: {
      md: 'py-16',
      lg: 'py-24',
      hero: 'pt-32 pb-20',
    },
    variant: {
      /** Hairline on top, the default rhythm of landing pages. */
      divided: 'border-t border-border',
      plain: '',
    },
  },
});

export interface SectionProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

/**
 * Vertical band of a page. Pair it with `<Container>` for the width:
 *
 * <Section id="prix">
 *   <Container size="md">…</Container>
 * </Section>
 */
export function Section({
  as: Element = 'section',
  className,
  spacing,
  variant,
  ...props
}: SectionProps) {
  return (
    <Element
      className={cn(sectionVariants({ spacing, variant }), className)}
      {...props}
    />
  );
}

export default Section;
