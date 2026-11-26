import { render, screen } from '@testing-library/react';

import Footer from './footer';

let mockPathname = '/';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

describe('Footer', () => {
  beforeEach(() => {
    mockPathname = '/';
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });

  it('should highlight the link to the current page', () => {
    mockPathname = '/pricing';
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Pricing' }).className).toContain(
      'text-slate-900',
    );
    expect(screen.getByRole('link', { name: 'About' }).className).toContain(
      'text-slate-400',
    );
  });
});
