import { render } from '@testing-library/react';

import BuyButton from './buy-button';

describe('BuyButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BuyButton href="https://gum.co/road-react-native">Go Buy</BuyButton>
    );
    expect(baseElement).toBeTruthy();
  });
});
