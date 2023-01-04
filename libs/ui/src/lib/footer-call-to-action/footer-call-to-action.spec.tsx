import { render } from '@testing-library/react';

import FooterCallToAction from './footer-call-to-action';

describe('FooterCallToAction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FooterCallToAction />);
    expect(baseElement).toBeTruthy();
  });

  it('should be able to fill the input with an email', () => {
    const { getAllByPlaceholderText } = render(<FooterCallToAction />);

    const inputTarget = getAllByPlaceholderText('Enter your email');
    expect(inputTarget).toBeTruthy();
  });
});
