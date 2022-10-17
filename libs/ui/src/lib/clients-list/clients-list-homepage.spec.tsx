import { render } from '@testing-library/react';

import ClientsListHomepage from './clients-list-homepage';

describe('ClientsListHomepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientsListHomepage clients={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
