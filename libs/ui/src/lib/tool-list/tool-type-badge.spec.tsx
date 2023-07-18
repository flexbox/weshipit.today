import { render } from '@testing-library/react';

import ToolTypeBadge from './tool-type-badge';

describe('ToolTypeBadge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToolTypeBadge />);
    expect(baseElement).toBeTruthy();
  });
});
