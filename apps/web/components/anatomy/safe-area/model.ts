/**
 * The truth the figure moves by.
 *
 * Safe area insets, in points, for two real devices in portrait:
 * iPhone 15 (393 × 852, Dynamic Island, home indicator) has top 59 and
 * bottom 34; iPhone SE 3rd generation (375 × 667, home button) has top 20
 * and bottom 0. `useSafeAreaInsets()` reads these per device; hardcoding
 * `paddingTop: 44` is wrong on both.
 */

export interface Device {
  w: number;
  h: number;
  top: number;
  name: string;
  bottom: number;
  corner: number;
  island: boolean;
}

export const DEVICES: Device[] = [
  {
    bottom: 34,
    corner: 55,
    h: 852,
    island: true,
    name: 'iPhone 15',
    top: 59,
    w: 393,
  },
  {
    bottom: 0,
    corner: 0,
    h: 667,
    island: false,
    name: 'iPhone SE',
    top: 20,
    w: 375,
  },
];

export const MODES = ['insets', 'none', 'hardcoded'] as const;
export type Mode = (typeof MODES)[number];
export const HARDCODED_TOP = 44;

export const padOf = (mode: Mode, device: Device) => ({
  bottom: mode === 'insets' ? device.bottom : 0,
  top:
    mode === 'insets' ? device.top : mode === 'hardcoded' ? HARDCODED_TOP : 0,
});

export const readouts: Record<Mode, string> = {
  hardcoded: `paddingTop: 44 · 15 pt short on iPhone 15 · 24 pt too much on iPhone SE`,
  insets: `useSafeAreaInsets() · iPhone 15: 59 / 34 · iPhone SE: 20 / 0`,
  none: `no insets · header under the island, button under the home indicator`,
};
