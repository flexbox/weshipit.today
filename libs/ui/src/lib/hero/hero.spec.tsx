import { render } from '@testing-library/react';
import { Hero } from './hero';

describe('Hero', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <Hero>
        <h1>Hello friend</h1>
      </Hero>
    );
    expect(baseElement).toBeTruthy();
    getByText('Hello friend');
  });
});
