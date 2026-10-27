import { render, screen } from '@testing-library/react';

import { FadeIn } from './fade-in';

// jsdom has no IntersectionObserver, which framer-motion's whileInView needs.
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

describe('FadeIn', () => {
  it('should render its children', () => {
    const { baseElement } = render(<FadeIn>Hello</FadeIn>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
