import { render } from '@testing-library/react';

import AppBadge from './AppBadge';

describe('AppBadge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppBadge link={''} />);
    expect(baseElement).toBeTruthy();
  });
});
