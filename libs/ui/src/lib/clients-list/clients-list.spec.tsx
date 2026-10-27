import { render } from '@testing-library/react';
import { clientsListFixture } from './clients-list.fixture';
import { ClientsList } from './clients-list';

describe('ClientsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ClientsList
        clients={clientsListFixture}
        hrefOnboarding="https://cal.com/davidl/weshipit-onboarding"
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
