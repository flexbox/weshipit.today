import { render } from '@testing-library/react';

import { ToolList } from './tool-list';
import { apiListFixture } from './tool-list.fixture';

describe('ToolList', () => {
  it('should not crash with an empty array', () => {
    const { baseElement } = render(<ToolList records={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a list of items', () => {
    const { baseElement } = render(<ToolList records={apiListFixture} />);
    expect(baseElement).toBeTruthy();
  });
});
