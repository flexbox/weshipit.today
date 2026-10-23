import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Interactive Anatomy figures shown on a glossary term page, keyed by term
 * slug. Each one is its own chunk, so other terms never load it.
 */
const FIGURES: Record<string, ComponentType> = {
  expo: dynamic(() =>
    import('./expo-anatomy/expo-figure').then((mod) => mod.ExpoAnatomyFigure),
  ),
  hermes: dynamic(() =>
    import('./hermes-anatomy/hermes-figure').then(
      (mod) => mod.HermesAnatomyFigure,
    ),
  ),
  metro: dynamic(() =>
    import('./metro-anatomy/metro-figure').then(
      (mod) => mod.MetroAnatomyFigure,
    ),
  ),
};

export function GlossaryFigure({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Figure = FIGURES[slug];
  return Figure ? (
    <div className={className}>
      <Figure />
    </div>
  ) : null;
}
