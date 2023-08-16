import { render } from '@testing-library/react';

import FadeIn from './fade-in';

describe('FadeIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FadeIn />);
    expect(baseElement).toBeTruthy();
  });
});
