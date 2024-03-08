import { render } from '@testing-library/react';

import { HeroText } from './hero-text';

describe('HeroText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeroText title={'Hello'} />);
    expect(baseElement).toBeTruthy();
  });
});
