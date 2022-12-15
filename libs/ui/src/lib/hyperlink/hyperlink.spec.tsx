import { fireEvent, render } from '@testing-library/react';

import { Hyperlink } from './hyperlink';

describe('Hyperlink', () => {
  it('should render successfully with external link', () => {
    const { baseElement, getByText } = render(
      <Hyperlink isExternal={true} href="https://fr.wikipedia.org/wiki/HTML5">
        HTML documentation
      </Hyperlink>
    );
    expect(baseElement).toBeTruthy();
    getByText('HTML documentation');
  });

  it('can press on link', () => {
    const { getByText } = render(
      <Hyperlink isExternal={true} href="https://fr.wikipedia.org/wiki/HTML5">
        HTML documentation
      </Hyperlink>
    );

    const target = getByText('HTML documentation');
    fireEvent.click(target);
  });
});
