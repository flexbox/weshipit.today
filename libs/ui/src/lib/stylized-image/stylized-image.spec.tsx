import { render } from '@testing-library/react';

import StylizedImage from './stylized-image';

describe('StylizedImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StylizedImage />);
    expect(baseElement).toBeTruthy();
  });
});
