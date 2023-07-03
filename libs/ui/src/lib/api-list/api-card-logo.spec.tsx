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
        websiteUrl="https://nozbe.github.io/WatermelonDB/index.html"
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when logo.clearbit.com returns a 404', () => {
    const { baseElement } = render(
      <ApiCardLogo
        name="react-native-mmkv"
        websiteUrl=" https://github.com/mrousavy/react-native-mmkv"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
