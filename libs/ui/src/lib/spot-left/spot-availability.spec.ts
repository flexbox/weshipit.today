import { SPOT_AVAILABILITY } from './spot-availability';

describe('SPOT_AVAILABILITY', () => {
  it('should have all required spot availability configurations', () => {
    expect(SPOT_AVAILABILITY).toHaveProperty('team');
    expect(SPOT_AVAILABILITY).toHaveProperty('essential');
    expect(SPOT_AVAILABILITY).toHaveProperty('growth');
    expect(SPOT_AVAILABILITY).toHaveProperty('enterprise');
  });

  it('should have numeric values for all configurations', () => {
    expect(typeof SPOT_AVAILABILITY.team).toBe('number');
    expect(typeof SPOT_AVAILABILITY.essential).toBe('number');
    expect(typeof SPOT_AVAILABILITY.growth).toBe('number');
    expect(typeof SPOT_AVAILABILITY.enterprise).toBe('number');
  });

  it('should be centralized configuration that can be updated in one place', () => {
    // This test documents the intent: all spot availability should come from this single source
    expect(SPOT_AVAILABILITY.team).toBe(2);
    expect(SPOT_AVAILABILITY.essential).toBe(0);
    expect(SPOT_AVAILABILITY.growth).toBe(0);
    expect(SPOT_AVAILABILITY.enterprise).toBe(0);
  });
});