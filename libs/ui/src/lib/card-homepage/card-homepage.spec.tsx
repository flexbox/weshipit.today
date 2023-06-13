import { render } from '@testing-library/react';

import CardHomepage from './card-homepage';

describe('CardHomepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardHomepage />);
    expect(baseElement).toBeTruthy();
  });
});
