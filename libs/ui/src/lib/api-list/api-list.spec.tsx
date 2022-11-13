import { render } from '@testing-library/react';

import { ApiList } from './api-list';
import { apiListFixture } from './api-list.fixture';

describe('ApiList', () => {
  it('should not crash with an empty array', () => {
    const { baseElement } = render(<ApiList apis={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a list of items', () => {
    const { baseElement } = render(<ApiList apis={apiListFixture} />);
    expect(baseElement).toBeTruthy();
  });
});
