import { render } from '@testing-library/react';

import Section from './section';

describe('Section', () => {
  it('renders a divided section with its id by default', () => {
    const { container } = render(<Section id="prix">Content</Section>);
    const section = container.querySelector('section#prix');
    expect(section).toBeTruthy();
    expect(section?.className).toContain('border-t');
    expect(section?.className).toContain('py-24');
  });

  it('lets className override the spacing', () => {
    const { container } = render(<Section className="py-10" />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-10');
    expect(section?.className).not.toContain('py-24');
  });
});
