import { render } from '@testing-library/react';

import CardConsultation from './card-consultation';

describe('CardConsultation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardConsultation gravatarSize={12} />);
    expect(baseElement).toBeTruthy();
  });
});
