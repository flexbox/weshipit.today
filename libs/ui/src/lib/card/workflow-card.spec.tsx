import { render } from '@testing-library/react';

import WorkflowCard from './workflow-card';

describe('WorkflowCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkflowCard />);
    expect(baseElement).toBeTruthy();
  });
});
