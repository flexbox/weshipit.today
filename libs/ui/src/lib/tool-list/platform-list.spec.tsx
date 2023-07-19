import { render } from '@testing-library/react';

import PlatformList from './platform-list';

describe('PlatformList', () => {
  it('should render successfully when its an empty array', () => {
    const { baseElement } = render(<PlatformList platforms={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <PlatformList platforms={['iOS', 'Android']} />
    );
    expect(baseElement).toBeTruthy();
  });
});
