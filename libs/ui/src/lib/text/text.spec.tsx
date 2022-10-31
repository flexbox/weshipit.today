import { render } from '@testing-library/react';

import Text from './text';

describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Text variant="h1">i am a title</Text>);
    expect(baseElement).toBeTruthy();
  });
});
