import { render } from '@testing-library/react';

import AirtableToggleForm from './airtable-toggle-form';

describe('AirtableToggleForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AirtableToggleForm />);
    expect(baseElement).toBeTruthy();
  });
});
