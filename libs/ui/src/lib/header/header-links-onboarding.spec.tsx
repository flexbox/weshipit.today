import { render } from '@testing-library/react';

import HeaderLinksOnboarding from './header-links-onboarding';

describe('HeaderLinksOnboarding', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderLinksOnboarding />);
    expect(baseElement).toBeTruthy();
  });
});
