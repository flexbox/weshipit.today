import { render } from '@testing-library/react';

import Bento from './bento';

describe('Bento', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bento />);
    expect(baseElement).toBeTruthy();
  });
});
