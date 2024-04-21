import { render } from '@testing-library/react';

import ClientsListHomepage from './clients-list-homepage';
import { clientsListFixture } from './clients-list.fixture';

describe('ClientsListHomepage', () => {
  it('should render successfully with []', () => {
    const { baseElement } = render(<ClientsListHomepage clients={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientsListHomepage clients={clientsListFixture} />
    );
    expect(baseElement).toBeTruthy();
  });
});
