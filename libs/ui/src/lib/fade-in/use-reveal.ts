'use client';

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * - `static`: rendered as is. The server sends this, so the content is in the
 *   first paint and readable without JavaScript.
 * - `hidden`: waiting below the viewport.
 * - `shown`: entered the viewport, transitioning to its resting place.
 */
export type RevealPhase = 'static' | 'hidden' | 'shown';

const subscribe = () => () => undefined;

/** True for the render that hydrates server HTML, false for a client mount. */
function useIsHydrating() {
  return useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );
}

interface UseRevealOptions {
  /** Skip observing: a parent group drives the phase instead. */
  disabled?: boolean;
  /** IntersectionObserver `rootMargin`. */
  rootMargin?: string;
}

/**
 * Reveals an element the first time it scrolls into view.
 *
 * The element is never hidden in the server HTML. Hiding it there keeps it
 * invisible until every script has loaded and hydrated, which for a hero is
 * the whole Largest Contentful Paint. Only what sits below the viewport when
 * React takes over is hidden, then revealed on scroll.
 */
export function useReveal<T extends HTMLElement>({
  disabled = false,
  rootMargin = '0px',
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>('static');
  const isHydrating = useIsHydrating();
  // Only the first render tells the two apart: React renders again with
  // `false` right after hydrating.
  const wasServerRendered = useRef(isHydrating);

  useLayoutEffect(() => {
    const element = ref.current;
    if (disabled || !element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // The visitor already sees server-rendered content that is on screen (or
    // scrolled past): hiding it now would make it blink.
    const isBelowViewport =
      element.getBoundingClientRect().top >= window.innerHeight;
    if (wasServerRendered.current && !isBelowViewport) return;

    setPhase('hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase('shown');
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [disabled, rootMargin]);

  return { phase, ref };
}

/** Opacity and movement shared by every reveal; pair with one offset below. */
export const revealClassName =
  'data-[reveal=hidden]:opacity-0 data-[reveal=shown]:transition-[opacity,translate] data-[reveal=shown]:duration-500 data-[reveal=shown]:ease-out';

/**
 * Where the element comes from. `motion-safe` keeps the fade and drops the
 * movement for visitors who ask for reduced motion.
 */
export const revealOffsetClassName = {
  left: 'motion-safe:data-[reveal=hidden]:-translate-x-5',
  right: 'motion-safe:data-[reveal=hidden]:translate-x-5',
  up: 'motion-safe:data-[reveal=hidden]:translate-y-6',
} as const;
