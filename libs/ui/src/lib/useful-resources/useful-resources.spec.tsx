import { render } from '@testing-library/react';

import UsefulResources from './useful-resources';

describe('UsefulResources', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsefulResources />);
    expect(baseElement).toBeTruthy();
  });
});
