/**
 * Centralized spot availability configuration
 * Update these values to change spot availability across the entire application
 */
export const SPOT_AVAILABILITY = {
  /** Number of spots available for general team/hero banner */
  team: 0,
  /** Number of spots available for Essential tier */
  essential: 0,
  /** Number of spots available for Growth tier */
  growth: 0,
  /** Number of spots available for Enterprise tier */
  enterprise: 0,
} as const;
