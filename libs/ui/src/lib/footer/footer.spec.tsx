import { render } from '@testing-library/react';

import Footer from './footer';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toBeTruthy();
  });
});
