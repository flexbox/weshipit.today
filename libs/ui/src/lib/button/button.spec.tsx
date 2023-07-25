import { render } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('should render successfully a button', () => {
    const mockFun = jest.fn();
    const { baseElement } = render(<Button onClick={mockFun}>Go</Button>);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully an a href', () => {
    const { baseElement } = render(
      <Button href="https://www.google.com/" as="a">
        Go
      </Button>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully an a href with target _blank', () => {
    const { baseElement } = render(
      <Button href="https://www.google.com/" as="a" isExternalLink={true}>
        Go
      </Button>
    );
    expect(baseElement).toBeTruthy();
  });
});
