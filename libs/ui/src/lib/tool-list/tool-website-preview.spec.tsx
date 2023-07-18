import { render } from '@testing-library/react';

import ToolWebsitePreview from './tool-website-preview';

describe('ToolWebsitePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ToolWebsitePreview url="http://google.com" />
    );
    expect(baseElement).toBeTruthy();
  });
});
