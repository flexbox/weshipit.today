import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  /**
   * BCP 47 tag (e.g. `fr-FR`). Formats the running value with
   * `Intl.NumberFormat`, so a grouped number keeps its thousands separator
   * while it counts instead of ticking up as a bare integer. Omit it to render
   * the raw number.
   */
  locale?: string;
}

// Fast off the mark, settling into the final value. A linear ramp reads like a
// spreadsheet recalculating.
const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 3);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// useLayoutEffect warns during SSR, where there is no layout to read anyway.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function CountUp({ end, duration = 2, suffix, locale }: CountUpProps) {
  // Start at the real value, so the server-rendered HTML carries the number.
  // A component that ships `0` to crawlers, readers without JS and every
  // pre-hydration paint is worse than one that never animates.
  const [count, setCount] = useState(end);
  const [isInView, setIsInView] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  // Drop to the start of the ramp before the browser paints, so the figure is
  // never shown and then visibly taken away.
  useIsomorphicLayoutEffect(() => {
    if (!prefersReducedMotion()) {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Land on the final number without the ramp when the OS asks for less
    // motion - the figure is the point, the animation is decoration.
    if (prefersReducedMotion()) {
      setCount(end);
      return;
    }

    // null, not 0: a falsy check re-latches the origin on every frame whenever
    // the first timestamp really is 0, and the count then never advances.
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.round(easeOut(progress) * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    // tabular-nums keeps every frame the same width; proportional digits make
    // the surrounding layout shimmer for the whole count.
    <span ref={countRef} className="tabular-nums">
      {locale ? new Intl.NumberFormat(locale).format(count) : count}
      {suffix && suffix}
    </span>
  );
}

export default CountUp;
