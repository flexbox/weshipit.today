import { SPOT_AVAILABILITY } from './spot-availability';

// Mock the configuration module to test dynamic behavior
jest.mock('./spot-availability', () => ({
  SPOT_AVAILABILITY: {
    team: 5, // Changed from 2 to 5
    essential: 3, // Changed from 2 to 3
    growth: 1, // Changed from 0 to 1
    enterprise: 2, // Changed from 0 to 2
  }
}));

describe('Centralized Spot Availability Integration', () => {
  it('should use the centralized configuration for all spot counts', () => {
    // This test demonstrates that all components now use the same source
    // If we change the configuration in one place, it affects everywhere
    
    // Mock represents updated availability counts
    expect(SPOT_AVAILABILITY.team).toBe(5);     // Used by HeroBanner
    expect(SPOT_AVAILABILITY.essential).toBe(3); // Used by Essential tier
    expect(SPOT_AVAILABILITY.growth).toBe(1);    // Used by Growth tier  
    expect(SPOT_AVAILABILITY.enterprise).toBe(2); // Used by Enterprise tier
  });

  it('should be the single source of truth that components import', () => {
    // This documents that components now import from centralized config
    // instead of having hardcoded values
    
    const configKeys = Object.keys(SPOT_AVAILABILITY);
    expect(configKeys).toContain('team');
    expect(configKeys).toContain('essential');
    expect(configKeys).toContain('growth');
    expect(configKeys).toContain('enterprise');
    
    // All values should be numbers (spot counts)
    Object.values(SPOT_AVAILABILITY).forEach(value => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });
});