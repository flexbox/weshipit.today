import { render } from '@testing-library/react';

import Pricing from './pricing';

describe('Pricing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Pricing ctaLink="https://cal.com/davidl/weshipit-onboarding" />,
    );
    expect(baseElement).toBeTruthy();
  });
});
