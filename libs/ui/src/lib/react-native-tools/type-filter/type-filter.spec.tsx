import { render, screen } from '@testing-library/react';

import TypeFilter from './type-filter';

// next-router-mock 0.9 only covers `next/router`.
let mockSearch = '';
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(mockSearch),
}));

describe('TypeFilter', () => {
  beforeEach(() => {
    mockSearch = '';
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TypeFilter numberOfTools={12} />);
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('Reset filter')).toBeNull();
  });

  it('should offer to reset the filter when a type is selected', () => {
    mockSearch = 'type=Analytics';
    render(<TypeFilter numberOfTools={12} />);
    expect(screen.getByText('Reset filter')).toBeTruthy();
  });
});
