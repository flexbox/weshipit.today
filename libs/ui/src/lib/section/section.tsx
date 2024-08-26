import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// Define the variant styles using cva
const sectionVariants = cva(
  // Base styles
  'my-12 py-32',
  {
    variants: {
      variant: {
        light: 'bg-white dark:bg-slate-900',
        transparent: 'bg-transparent',
      },
    },
    // Optional: Default variant values
    defaultVariants: {
      variant: 'light',
    },
  }
);

interface SectionProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  variants?: {
    variant?: 'light' | 'transparent';
  };
}

export function Section({ children, variant, className }: SectionProps) {
  return (
    <section className={sectionVariants({ variant, className })}>
      {children}
    </section>
  );
}

export default Section;
