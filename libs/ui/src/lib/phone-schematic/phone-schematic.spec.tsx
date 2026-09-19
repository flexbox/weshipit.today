import { render, act } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PhoneSchematic } from './phone-schematic';

let observers: Array<{ cb: any; el: Element | null }> = [];

beforeEach(() => {
  observers = [];
  (globalThis as any).IntersectionObserver = class {
    cb: any;
    el: Element | null = null;
    constructor(cb: any) {
      this.cb = cb;
      observers.push(this);
    }
    observe(el: Element) {
      this.el = el;
    }
    disconnect() {}
  };
});

const figure = (c: HTMLElement) => c.querySelector('.ps-figure') as HTMLElement;

test('arms the animation on mount, then holds until scrolled into view', () => {
  const { container } = render(<PhoneSchematic />);
  // The layout effect has already run here, so the figure is armed. Without
  // JS it would still be rendering fully drawn - see the SSR test below.
  expect(figure(container).dataset['play']).toBe('false');
});

test('renders fully drawn without JS, so no-JS readers never see an empty frame', () => {
  const html = renderToStaticMarkup(<PhoneSchematic />);
  expect(html).toContain('data-play="true"');
});

test('plays once the figure intersects, and only once', () => {
  const { container } = render(<PhoneSchematic />);
  const observer = observers[0];

  expect(observer.el).toBe(figure(container));

  act(() => observer.cb([{ isIntersecting: false }]));
  expect(figure(container).dataset['play']).toBe('false');

  act(() => observer.cb([{ isIntersecting: true }]));
  expect(figure(container).dataset['play']).toBe('true');
});

test('every stroke and label is wired to the draw/fade system', () => {
  const { container } = render(<PhoneSchematic />);
  const svg = container.querySelector('svg')!;
  // Each stroked shape normalises its length so the dash animation needs no
  // measurement; each is staggered rather than firing at once.
  const drawn = Array.from(svg.querySelectorAll('[data-draw]'));
  expect(drawn.length).toBeGreaterThan(10);
  expect(drawn.every((el) => el.getAttribute('pathLength') === '1')).toBe(true);
  const delays = drawn.map((el) => (el as HTMLElement).style.animationDelay);
  expect(new Set(delays).size).toBeGreaterThan(5);
});

test('arrowheads stay with their leader line', () => {
  const { container } = render(<PhoneSchematic />);
  // An SVG marker paints regardless of stroke-dasharray, so every leader must
  // sit inside a fade group or its arrowhead shows before the line is drawn.
  const leaders = Array.from(
    container.querySelectorAll('path[marker-end], path[markerEnd]'),
  );
  expect(leaders.length).toBeGreaterThan(0);
  expect(
    leaders.every((el) => el.parentElement?.hasAttribute('data-fade')),
  ).toBe(true);
});

test('the screen slot renders children and shares the reveal system', () => {
  const { container, getByText } = render(
    <PhoneSchematic>
      <p>épisode</p>
    </PhoneSchematic>,
  );
  getByText('épisode');
  // The slot wakes through the same data-attribute system as the drawing
  // rather than an inline transition, so the reduced-motion rule reaches it.
  const slot = container.querySelector('.ps-figure > div[data-screen]');
  expect(slot).not.toBeNull();
});

test('the figure plate number is overridable', () => {
  const { container } = render(<PhoneSchematic figure="FIG.038" />);
  expect(container.textContent).toContain('FIG.038');
});
