import { render, screen } from '@testing-library/react';

import { ToolList } from './tool-list';
import { apiListFixture } from './tool-list.fixture';

// react-markdown is ESM-only and Jest runs CommonJS: render the raw text.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => children,
}));

describe('ToolList', () => {
  it('should not crash with an empty array', () => {
    const { baseElement } = render(<ToolList records={[]} />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('No tools found')).toBeTruthy();
  });

  it('should render a list of items', () => {
    const { baseElement } = render(<ToolList records={apiListFixture} />);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Segment')).toBeTruthy();
  });
});
