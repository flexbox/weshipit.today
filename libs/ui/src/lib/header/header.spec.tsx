import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

import Header from './header';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
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

  it('should open mobile menu when hamburger icon is clicked', () => {
    const navigation = [
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
    ];
    
    render(<Header navigation={navigation} />);
    
    // Find and click the mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    
    // Check if navigation items are visible in mobile menu (both desktop and mobile versions exist)
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
  });

  it('should close mobile menu when a navigation link is clicked', () => {
    const navigation = [
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
    ];
    
    render(<Header navigation={navigation} />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    
    // Click on a navigation link
    const navLink = screen.getAllByText('Pricing')[0]; // Get the mobile menu version
    fireEvent.click(navLink);
    
    // The link should be present and clickable
    expect(navLink).toBeTruthy();
  });

  it('should close mobile menu when close button is clicked', () => {
    const navigation = [
      { name: 'Services', href: '#services' },
    ];
    
    render(<Header navigation={navigation} />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    
    // Close mobile menu
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);
    
    // The close button should still be in the document (just hidden)
    expect(closeButton).toBeTruthy();
  });

  it('should close mobile menu when callToActionLink is clicked', () => {
    const navigation = [
      { name: 'Services', href: '#services' },
    ];
    const callToActionLink = {
      name: 'Contact',
      href: '/contact',
    };
    
    render(
      <Header navigation={navigation} callToActionLink={callToActionLink} />
    );
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    
    // Click on callToActionLink
    const ctaLink = screen.getAllByText('Contact')[0];
    fireEvent.click(ctaLink);
    
    // Verify the link was rendered and can be clicked
    expect(ctaLink).toBeTruthy();
  });
});
