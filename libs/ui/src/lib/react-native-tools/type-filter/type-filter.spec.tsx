import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import TypeFilter from './type-filter';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('TypeFilter', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/react-native-tools');
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TypeFilter numberOfTools={12} />);
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText('Reset filter')).toBeNull();
  });

  it('should offer to reset the filter when a type is selected', () => {
    mockRouter.setCurrentUrl('/react-native-tools?type=Analytics');
    render(<TypeFilter numberOfTools={12} />);
    expect(screen.getByText('Reset filter')).toBeTruthy();
  });
});
