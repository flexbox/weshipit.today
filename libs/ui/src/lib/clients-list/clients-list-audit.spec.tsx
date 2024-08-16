import { render } from '@testing-library/react';

import ClientListAudit from './clients-list-audit';

describe('ClientListAudit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientListAudit />);
    expect(baseElement).toBeTruthy();
  });
});
