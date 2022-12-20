import { render } from '@testing-library/react';

import FooterBook from './footer-book';

describe('FooterBook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FooterBook />);
    expect(baseElement).toBeTruthy();
  });
});
