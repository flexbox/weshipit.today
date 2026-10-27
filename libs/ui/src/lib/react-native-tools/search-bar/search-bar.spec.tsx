import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar from './search-bar';

describe('SearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SearchBar searchTerm="" handleChange={jest.fn()} />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should call handleChange when typing', () => {
    const handleChange = jest.fn();
    render(<SearchBar searchTerm="" handleChange={handleChange} />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'expo' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
