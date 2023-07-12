import { render } from '@testing-library/react';

import ToolCardLogo from './tool-card-logo';

describe('ToolCardLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ToolCardLogo name="Expo" websiteUrl="https://expo.dev/" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when logo.clearbit.com returns a 404', () => {
    const { baseElement } = render(
      <ToolCardLogo
        name="Watermelon DB"
        websiteUrl="https://nozbe.github.io/WatermelonDB/index.html"
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully when logo.clearbit.com returns a 404', () => {
    const { baseElement } = render(
      <ToolCardLogo
        name="react-native-mmkv"
        websiteUrl=" https://github.com/mrousavy/react-native-mmkv"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
