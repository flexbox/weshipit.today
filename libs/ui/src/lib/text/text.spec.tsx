import { render } from '@testing-library/react';

import { Text } from './text';

describe('Text', () => {
  it('renders the default tone', () => {
    const { getByText } = render(<Text as="h1">i am a title</Text>);
    const element = getByText('i am a title');
    expect(element.tagName).toBe('H1');
    expect(element.className).toContain('text-neutral-950');
  });

  it('applies the muted tone without the default colour', () => {
    const { getByText } = render(
      <Text variant="small" tone="muted">
        muted
      </Text>,
    );
    const { className } = getByText('muted');
    expect(className).toContain('text-neutral-500');
    expect(className).not.toContain('text-neutral-950');
    expect(className).toContain('text-sm');
  });

  it('gives eyebrows the accent tone by default', () => {
    const { getByText } = render(<Text variant="eyebrow">Étape 1</Text>);
    const { className } = getByText('Étape 1');
    expect(className).toContain('uppercase');
    expect(className).toContain('text-accent');
  });

  it('lets className override the variant', () => {
    const { getByText } = render(
      <Text variant="h2" className="text-white">
        override
      </Text>,
    );
    const { className } = getByText('override');
    expect(className).toContain('text-white');
    expect(className).not.toContain('text-neutral-950');
  });
});
