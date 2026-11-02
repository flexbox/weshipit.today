import { render, screen } from '@testing-library/react';

import WorkflowCard, { WorkflowCardImage } from './workflow-card';

const image: WorkflowCardImage = {
  url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=429&h=335&fit=crop',
  width: 429,
  height: 335,
};

describe('WorkflowCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <WorkflowCard step={1} title="Discovery call" image={image}>
        <p>We start with a 30-minute call.</p>
      </WorkflowCard>,
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByText('Discovery call')).toBeTruthy();
  });
});
