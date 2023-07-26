import { render } from '@testing-library/react';

import { ToolTypeBadge } from './tool-type-badge';

describe('ToolTypeBadge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ToolTypeBadge type="Persistent storage" size="md" />
    );
    expect(baseElement).toBeTruthy();
  });
});
