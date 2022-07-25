import { render } from '@testing-library/react';

import WeshipitUi from './weshipit-ui';

describe('WeshipitUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeshipitUi />);
    expect(baseElement).toBeTruthy();
  });
});
