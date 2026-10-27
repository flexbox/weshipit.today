import { fireEvent, render, screen } from '@testing-library/react';

import { AirtableToggleForm } from './airtable-toggle-form';

describe('AirtableToggleForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AirtableToggleForm
        buttonText="Add your tool"
        formHeight={533}
        formLink="https://airtable.com/embed/shrExampleFormId"
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should show the form when the button is clicked', () => {
    const { baseElement } = render(
      <AirtableToggleForm
        buttonText="Add your tool"
        formHeight={533}
        formLink="https://airtable.com/embed/shrExampleFormId"
      />,
    );
    expect(baseElement.querySelector('iframe')).toBeNull();

    fireEvent.click(screen.getByText('Add your tool'));

    expect(baseElement.querySelector('iframe')?.getAttribute('src')).toBe(
      'https://airtable.com/embed/shrExampleFormId',
    );
  });
});
