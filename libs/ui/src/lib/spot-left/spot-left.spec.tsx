import { render } from '@testing-library/react';

import SpotLeft from './spot-left';

describe('SpotLeft', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpotLeft spotsLeft={1} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render "Fully booked" message with red circle when no spots left', () => {
    const { getByText } = render(<SpotLeft spotsLeft={0} />);
    getByText(/Fully booked for/);
  });

  it('should render spots available with green circle when spots left', () => {
    const { getByText } = render(<SpotLeft spotsLeft={2} />);
    getByText(/2 spots left in/);
  });
});
