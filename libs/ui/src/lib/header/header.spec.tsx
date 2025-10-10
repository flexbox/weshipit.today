import { render, fireEvent } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });

  it('should navigate to about page logo section on right-click', () => {
    const { getByText } = render(<Header />);
    const logo = getByText(/weshipit/);

    // Mock window.location.href
    delete (window as any).location;
    (window as any).location = { href: '' };

    // Simulate right-click
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      button: 2,
    });

    const preventDefaultSpy = jest.spyOn(contextMenuEvent, 'preventDefault');
    fireEvent(logo, contextMenuEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(window.location.href).toBe('/about#logo');
  });
});
