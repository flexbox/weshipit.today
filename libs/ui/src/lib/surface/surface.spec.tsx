import { render } from '@testing-library/react';

import { Surface } from './surface';

describe('Surface', () => {
  it('renders the card tokens with default padding', () => {
    const { getByText } = render(<Surface>Content</Surface>);
    const element = getByText('Content');
    expect(element.className).toContain('bg-card');
    expect(element.className).toContain('rounded-xl');
    expect(element.className).toContain('p-6');
  });

  it('adds the hover border when interactive', () => {
    const { getByText } = render(
      <Surface as="li" interactive padding="none">
        Content
      </Surface>,
    );
    const element = getByText('Content');
    expect(element.tagName).toBe('LI');
    expect(element.className).toContain('hover:border-accent/50');
    expect(element.className).not.toContain('p-6');
  });
});
