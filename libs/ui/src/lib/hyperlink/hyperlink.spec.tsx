import { render } from '@testing-library/react';

import Hyperlink from './hyperlink';

describe('Hyperlink', () => {
  it('should render successfully with external link', () => {
    const { baseElement, getByText } = render(
      <Hyperlink
        isExternal
        href="https://fr.wikipedia.org/wiki/HTML5"
        text="Html documentation"
      />
    );
    expect(baseElement).toBeTruthy();
    getByText('Html documentation');
  });
});
