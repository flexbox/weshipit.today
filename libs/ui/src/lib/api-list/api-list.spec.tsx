import { render } from '@testing-library/react';

import { ApiList } from './api-list';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiList apis={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
