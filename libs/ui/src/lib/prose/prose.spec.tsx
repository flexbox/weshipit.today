import { render } from '@testing-library/react';

import { Prose } from './prose';

describe('Prose', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Prose />);
    expect(baseElement).toBeTruthy();
  });
});
