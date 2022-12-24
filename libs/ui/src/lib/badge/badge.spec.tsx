import { render } from '@testing-library/react';

import { Badge } from './badge';

describe('Badge', () => {
  it('should render successfully', () => {
    const { baseElement, getAllByText } = render(<Badge>Analytics</Badge>);
    expect(baseElement).toBeTruthy();
    getAllByText('Analytics');
  });
});
