import { render } from '@testing-library/react';

import TypeFilter from './type-filter';

describe('TypeFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TypeFilter numberOfTools={12} />);
    expect(baseElement).toBeTruthy();
  });
});
