import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const display = ['text-balance', 'font-display', 'font-bold'];

/**
 * `variant` sets the size and weight, `tone` sets the colour. Keep them apart:
 * pass `tone`, not a `text-*` colour class, so every page shares one palette.
 */
export const TextVariants = cva([], {
  defaultVariants: {
    tone: 'default',
    variant: 'p1',
  },
  variants: {
    tone: {
      default: ['text-neutral-950', 'dark:text-neutral-200'],
      /** Secondary copy: ledes, descriptions, captions. */
      muted: ['text-neutral-500', 'dark:text-neutral-400'],
      /** Theme accent (`--accent`), the colour of landing pages. */
      accent: ['text-accent'],
      /** Brand blue, the colour of primary buttons and agency pages. */
      primary: ['text-blue-600', 'dark:text-blue-400'],
    },
    variant: {
      h1: [
        ...display,
        'leading-[1.1]',
        'text-5xl',
        'tracking-[-0.03em]',
        'sm:text-6xl',
        'md:text-7xl',
        'lg:text-6xl',
        'xl:text-7xl',
      ],
      h2: [
        ...display,
        'leading-[1.1]',
        'text-3xl',
        'tracking-[-0.03em]',
        'sm:text-4xl',
        'md:text-5xl',
        'lg:text-4xl',
        'xl:text-5xl',
      ],
      h3: [
        ...display,
        'leading-tight',
        'text-2xl',
        'tracking-[-0.03em]',
        'sm:text-3xl',
        'md:text-4xl',
        'lg:text-3xl',
        'xl:text-4xl',
      ],
      h4: [
        ...display,
        'leading-tight',
        'text-xl',
        'tracking-[-0.03em]',
        'sm:text-2xl',
        'md:text-3xl',
        'lg:text-2xl',
        'xl:text-3xl',
      ],
      h5: [...display, 'text-xl'],
      h6: ['text-balance', 'font-display', 'text-lg', 'font-semibold'],
      s1: [
        'text-pretty',
        'text-xl',
        'sm:text-2xl',
        'md:text-3xl',
        'lg:text-2xl',
        'xl:text-3xl',
      ],
      s2: [
        'text-pretty',
        'text-lg',
        'sm:text-xl',
        'md:text-2xl',
        'lg:text-xl',
        'xl:text-2xl',
      ],
      /** Lede under a heading. */
      lead: ['text-pretty', 'text-lg', 'md:text-xl'],
      p1: [
        'text-pretty',
        'text-base',
        'sm:text-lg',
        'md:text-xl',
        'lg:text-lg',
        'xl:text-xl',
      ],
      p2: [
        'text-pretty',
        'text-sm',
        'font-medium',
        'sm:text-base',
        'md:text-lg',
        'lg:text-base',
        'xl:text-lg',
      ],
      c1: ['text-pretty', 'text-base'],
      c2: ['text-pretty', 'text-sm', 'font-medium'],
      small: ['text-pretty', 'text-sm'],
      caption: ['text-pretty', 'text-xs'],
      /** Short uppercase label above a heading or inside a card. */
      eyebrow: ['text-xs', 'font-semibold', 'uppercase', 'tracking-wide'],
      /** Keeps the surrounding font size, to set only the `tone`. */
      inherit: ['text-pretty'],
      quote: ['text-pretty', 'text-lg', 'font-bold'],
    },
  },
});

type TextVariantProps = VariantProps<typeof TextVariants>;

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, TextVariantProps {
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Element = 'p',
  children,
  className,
  tone,
  variant = 'p1',
  ...rest
}) => {
  const resolvedTone = tone ?? (variant === 'eyebrow' ? 'accent' : 'default');
  return (
    <Element
      className={cn(TextVariants({ tone: resolvedTone, variant }), className)}
      {...rest}
    >
      {children}
    </Element>
  );
};
