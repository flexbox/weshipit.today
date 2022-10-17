import { render } from '@testing-library/react';
import { clientsListFixture } from 'libs/ui/src/lib/clients-list/clients-list.fixture.spec';
import { ClientsList } from './clients-list';

describe('ClientsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientsList clients={clientsListFixture} />
    );
    expect(baseElement).toBeTruthy();
  });
});
