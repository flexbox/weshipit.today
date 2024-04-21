import { render } from '@testing-library/react';

import LinkButton from './link-button';

describe('LinkButton', () => {
  it('should render successfully a nextjs Link', () => {
    const { baseElement } = render(
      <LinkButton href="/about">About</LinkButton>
    );
    expect(baseElement).toBeTruthy();
  });
});
