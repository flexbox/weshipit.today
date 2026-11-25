'use client';

import {
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react';
import { cn } from '../utils/cn';
import {
  revealClassName,
  revealOffsetClassName,
  RevealPhase,
  useReveal,
} from './use-reveal';

/** Phase of the surrounding `FadeInStagger`, or null outside of one. */
const FadeInStaggerContext = createContext<RevealPhase | null>(null);

// Wait until the element is 200px into the viewport, so the fade is seen.
const rootMargin = '0px 0px -200px';

type DivProps = ComponentPropsWithoutRef<'div'>;

/**
 * Fades its content in and up the first time it scrolls into view. Content
 * that is on screen when the page loads is shown straight away.
 */
export function FadeIn({ className, ...props }: DivProps) {
  const groupPhase = useContext(FadeInStaggerContext);
  const isInStaggerGroup = groupPhase !== null;
  const { phase, ref } = useReveal<HTMLDivElement>({
    disabled: isInStaggerGroup,
    rootMargin,
  });

  return (
    <div
      ref={ref}
      data-reveal={isInStaggerGroup ? groupPhase : phase}
      data-fade-in-item={isInStaggerGroup ? '' : undefined}
      className={cn(revealClassName, revealOffsetClassName.up, className)}
      {...props}
    />
  );
}

interface FadeInStaggerProps extends DivProps {
  /** Shorter delay between two items. */
  faster?: boolean;
}

/** Reveals every `FadeIn` inside it one after the other. */
export function FadeInStagger({
  faster = false,
  ...props
}: FadeInStaggerProps) {
  const { phase, ref } = useReveal<HTMLDivElement>({ rootMargin });
  const stagger = faster ? 0.12 : 0.2;

  // Items can sit at any depth, so the delay follows their order in the DOM
  // rather than their position among the direct children.
  useLayoutEffect(() => {
    if (phase !== 'hidden') return;
    ref.current
      ?.querySelectorAll<HTMLElement>('[data-fade-in-item]')
      .forEach((item, index) => {
        item.style.transitionDelay = `${index * stagger}s`;
      });
  }, [phase, ref, stagger]);

  return (
    <FadeInStaggerContext.Provider value={phase}>
      <div ref={ref} {...props} />
    </FadeInStaggerContext.Provider>
  );
}
