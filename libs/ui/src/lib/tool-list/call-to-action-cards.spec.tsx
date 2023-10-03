import { render } from '@testing-library/react';

import CallToActionCards from './call-to-action-cards';

describe('CallToActionCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CallToActionCards />);
    expect(baseElement).toBeTruthy();
  });
});
