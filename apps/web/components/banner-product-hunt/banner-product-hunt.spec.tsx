import { render } from '@testing-library/react';

import BannerProductHunt from './banner-product-hunt';

describe('BannerProductHunt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BannerProductHunt />);
    expect(baseElement).toBeTruthy();
  });
});
