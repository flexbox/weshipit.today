import { render } from '@testing-library/react';

import Util from './util';

describe('Util', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Util />);
    expect(baseElement).toBeTruthy();
  });
});
