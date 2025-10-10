import { render } from '@testing-library/react';

import CompanyLogo from './company-logo';

describe('CompanyLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CompanyLogo name="Expo" websiteUrl="https://expo.dev/" />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when api returns a 404', () => {
    const { baseElement } = render(
      <CompanyLogo
        name="Watermelon DB"
        websiteUrl="https://nozbe.github.io/WatermelonDB/index.html"
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when api returns a 404', () => {
    const { baseElement } = render(
      <CompanyLogo
        name="react-native-mmkv"
        websiteUrl=" https://github.com/mrousavy/react-native-mmkv"
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
