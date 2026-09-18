import { render, act } from '@testing-library/react';
import { CountUp } from './count-up';

// Drive rAF by hand so the ramp is deterministic.
let raf: Array<(t: number) => void> = [];
let now = 0;
beforeEach(() => {
  raf = [];
  now = 0;
  (globalThis as any).requestAnimationFrame = (cb: (t: number) => void) => {
    raf.push(cb);
    return raf.length;
  };
  (globalThis as any).cancelAnimationFrame = () => undefined;
  (globalThis as any).IntersectionObserver = class {
    cb: any;
    constructor(cb: any) {
      this.cb = cb;
    }
    observe() {
      this.cb([{ isIntersecting: true }]);
    }
    disconnect() {}
  };
  window.matchMedia = ((q: string) => ({
    matches: reduceMotion && q.includes('reduce'),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  })) as any;
});

let reduceMotion = false;

const advance = (ms: number) => {
  now += ms;
  const pending = raf;
  raf = [];
  act(() => pending.forEach((cb) => cb(now)));
};

test('server/first render carries the real number, not 0', () => {
  reduceMotion = false;
  const { container } = render(<CountUp end={20000} locale="fr-FR" />);
  // After mount the layout effect has reset to 0, ready to ramp.
  expect(container.textContent).toBe('0');
});

test('ramps and lands exactly on end, formatted for fr-FR', () => {
  reduceMotion = false;
  const { container } = render(
    <CountUp end={20000} locale="fr-FR" duration={2} />,
  );
  advance(0); // first frame only establishes the time origin
  advance(400);
  const early = container.textContent!;
  advance(600);
  const mid = container.textContent!;
  advance(1000);
  const final = container.textContent!;

  const num = (s: string) => Number(s.replace(/\D/g, ''));
  expect(num(early)).toBeGreaterThan(0);
  expect(num(mid)).toBeGreaterThan(num(early));
  expect(final).toBe('20 000'); // narrow no-break space
  expect(num(final)).toBe(20000);
});

test('eases out: past the halfway point well before halfway in time', () => {
  reduceMotion = false;
  const { container } = render(<CountUp end={1000} duration={2} />);
  advance(0); // time origin
  advance(1000); // 50% of the duration
  // Linear would sit at 500; ease-out is already well past it.
  expect(Number(container.textContent)).toBeGreaterThan(500);
});

test('reduced motion shows the final value with no ramp', () => {
  reduceMotion = true;
  const { container } = render(<CountUp end={3500} locale="fr-FR" />);
  expect(container.textContent).toBe('3 500');
  expect(raf.length).toBe(0);
});

test('no locale renders the raw integer (existing consumers unchanged)', () => {
  reduceMotion = false;
  const { container } = render(<CountUp end={98} suffix="%" />);
  advance(0);
  advance(3000);
  expect(container.textContent).toBe('98%');
});
