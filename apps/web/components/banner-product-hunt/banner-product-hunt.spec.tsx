import { render } from '@testing-library/react';

import BannerProductHunt from './banner-product-hunt';

// The `@weshipit/ui` barrel pulls in ToolCard, which imports the ESM-only
// `react-markdown`. Jest can't parse it untransformed, and this banner never
// renders markdown, so a passthrough stub is enough.
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => children,
}));

describe('BannerProductHunt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BannerProductHunt />);
    expect(baseElement).toBeTruthy();
  });
});
