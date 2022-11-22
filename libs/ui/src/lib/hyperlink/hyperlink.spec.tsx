import { render } from '@testing-library/react';

import Hyperlink from './hyperlink';

describe('Hyperlink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hyperlink />);
    expect(baseElement).toBeTruthy();
  });
});
