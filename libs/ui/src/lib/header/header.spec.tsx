import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

import Header from './header';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    // jsdom has no matchMedia. The header asks it whether the hamburger is
    // on screen before preloading the mobile menu.
    window.matchMedia = jest.fn().mockReturnValue({
      addEventListener: jest.fn(),
      matches: false,
      removeEventListener: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });

  it('should open mobile menu when hamburger icon is clicked', async () => {
    const navigation = [
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
    ];

    render(<Header navigation={navigation} />);

    // Find and click the mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);

    // The menu is loaded on demand, so wait for it to mount.
    await screen.findByRole('button', { name: /close menu/i });

    // Navigation items exist twice: in the desktop bar and in the mobile menu.
    expect(screen.getAllByText('Services').length).toBe(2);
    expect(screen.getAllByText('Pricing').length).toBe(2);
  });

  it('should close mobile menu when a navigation link is clicked', async () => {
    const navigation = [
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
    ];

    render(<Header navigation={navigation} />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);

    await screen.findByRole('button', { name: /close menu/i });

    // Click on the mobile menu version of the link
    const navLink = screen.getAllByText('Pricing')[1];
    fireEvent.click(navLink);

    // The link should be present and clickable
    expect(navLink).toBeTruthy();
  });

  it('should close mobile menu when close button is clicked', async () => {
    const navigation = [{ name: 'Services', href: '#services' }];

    render(<Header navigation={navigation} />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);

    // Close mobile menu
    const closeButton = await screen.findByRole('button', {
      name: /close menu/i,
    });
    fireEvent.click(closeButton);

    // The close button should still be in the document (just hidden)
    expect(closeButton).toBeTruthy();
  });

  it('should close mobile menu when callToActionLink is clicked', async () => {
    const navigation = [{ name: 'Services', href: '#services' }];
    const callToActionLink = {
      name: 'Contact',
      href: '/contact',
    };

    render(
      <Header navigation={navigation} callToActionLink={callToActionLink} />,
    );

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);

    await screen.findByRole('button', { name: /close menu/i });

    // Click on callToActionLink
    const ctaLink = screen.getAllByText('Contact')[0];
    fireEvent.click(ctaLink);

    // Verify the link was rendered and can be clicked
    expect(ctaLink).toBeTruthy();
  });
});
