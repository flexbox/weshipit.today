import { render } from '@testing-library/react';

import CardChecklist from './card-checklist';

describe('CardChecklist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardChecklist />);
    expect(baseElement).toBeTruthy();
  });
});
