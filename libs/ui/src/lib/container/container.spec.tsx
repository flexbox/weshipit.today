import { render } from '@testing-library/react';

import { Container } from './container';

describe('Container', () => {
  it('renders the default width', () => {
    const { getByText } = render(<Container>Content</Container>);
    expect(getByText('Content').className).toContain('max-w-6xl');
  });

  it('renders the requested width and element', () => {
    const { getByText } = render(
      <Container as="main" size="sm">
        Content
      </Container>,
    );
    const element = getByText('Content');
    expect(element.tagName).toBe('MAIN');
    expect(element.className).toContain('max-w-3xl');
  });
});
