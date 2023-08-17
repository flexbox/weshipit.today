import { render } from '@testing-library/react';

import TagList from './tag-list';

describe('TagList', () => {
  it('should render successfully when its an empty array', () => {
    const { baseElement } = render(<TagList tags={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TagList tags={['iOS', 'Android']} />);
    expect(baseElement).toBeTruthy();
  });
});
