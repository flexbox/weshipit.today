import { render } from '@testing-library/react';
import { createRef } from 'react';

import { FieldError, Input, Label, LabelHint, Select, Textarea } from './field';

describe('Field', () => {
  it('links a label to its input', () => {
    const { getByLabelText } = render(
      <>
        <Label htmlFor="email">
          Email <LabelHint>(work)</LabelHint>
        </Label>
        <Input id="email" size="lg" />
      </>,
    );
    const input = getByLabelText(/Email/);
    expect(input.tagName).toBe('INPUT');
    expect(input.className).toContain('px-3.5');
  });

  it('forwards refs, as react-hook-form needs', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders textarea, select and error', () => {
    const { container, getByText } = render(
      <>
        <Textarea />
        <Select size="sm">
          <option>One</option>
        </Select>
        <FieldError>Required</FieldError>
      </>,
    );
    expect(container.querySelector('textarea')?.className).toContain('px-3');
    expect(container.querySelector('select')?.className).toContain('px-2');
    expect(getByText('Required').className).toContain('text-red-600');
  });
});
