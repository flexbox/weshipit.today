import { render } from '@testing-library/react';

import SpotLeft from './spot-left';

describe('SpotLeft', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpotLeft spotsLeft={1} />);
    expect(baseElement).toBeTruthy();
  });
});
