import { render } from '@testing-library/react';

import CardGradient from './card-gradient';

describe('CardGradient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardGradient />);
    expect(baseElement).toBeTruthy();
  });
});
