/**
 * Centralized spot availability configuration
 * Update these values to change spot availability across the entire application
 */
export const SPOT_AVAILABILITY = {
  /** Number of spots available for general team/hero banner */
  team: 3,
  /** Number of spots available for Essential tier */
  essential: 2,
  /** Number of spots available for Growth tier */
  growth: 1,
  /** Number of spots available for Enterprise tier */
  enterprise: 1,
} as const;
