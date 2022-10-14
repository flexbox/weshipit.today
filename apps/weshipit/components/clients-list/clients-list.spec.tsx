import { render } from '@testing-library/react';

import ClientsList from './clients-list';

describe('ClientsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientsList />);
    expect(baseElement).toBeTruthy();
  });
});
