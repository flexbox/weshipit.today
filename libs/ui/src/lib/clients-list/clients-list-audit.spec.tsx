import { render, screen } from '@testing-library/react';

import { ClientsListAudit } from './clients-list-audit';
import { clientsListFixture } from './clients-list.fixture';

describe('ClientsListAudit', () => {
  it('should render successfully with []', () => {
    const { baseElement } = render(<ClientsListAudit clients={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should only render audit clients', () => {
    render(<ClientsListAudit clients={clientsListFixture} />);
    expect(screen.getByAltText('Vercel logo')).toBeTruthy();
    expect(screen.queryByAltText('Prismic logo')).toBeNull();
  });
});
