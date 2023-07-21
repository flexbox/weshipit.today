import { render } from '@testing-library/react';

import CardBootcamp from './card-bootcamp';

describe('CardBootcamp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardBootcamp />);
    expect(baseElement).toBeTruthy();
  });
});
