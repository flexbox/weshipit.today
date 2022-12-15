import { render } from '@testing-library/react';

import ApiCardLogo from './api-card-logo';

describe('ApiCardLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ApiCardLogo name="Expo" websiteUrl="https://expo.dev/" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when logo.clearbit.com returns a 404', () => {
    const { baseElement } = render(
      <ApiCardLogo
        name="Watermelon DB"
        websiteUrl="https://nozbe.github.io/WatermelonDB/"
        logoUrl="https://v5.airtableusercontent.com/v1/13/13/1671120000000/vRTGxEByML_Z-VbFjjrwaA/fVyVB9JatbddUC5KtiV3cHhYwEOFHwXJvmZyKm7-0oJ2kNJbn7VK2fX_mwjx7QaWhl_KI2cIif7J69QRP9WH1lVBGXLIgwDXSo_RZhbEr58/-ITIbiRQVICg6QdqcM3j2OHXAFqMaLrtzT5YpQte3ug"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
