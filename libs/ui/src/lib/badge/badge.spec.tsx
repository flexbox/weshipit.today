import { render } from '@testing-library/react';

import { Badge } from './badge';

describe('Badge', () => {
  it('should render successfully', () => {
    const { baseElement, getAllByText } = render(<Badge>Primary</Badge>);
    expect(baseElement).toBeTruthy();
    getAllByText('Primary');
  });
});
