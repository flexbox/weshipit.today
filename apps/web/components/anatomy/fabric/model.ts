/**
 * The truth the figure moves by.
 *
 * Fabric builds the view tree in C++ shared by iOS and Android: React's
 * elements become a shadow tree, Yoga lays it out, a diff finds what changed,
 * and only those changes are mounted as real host views (UIView on iOS,
 * ViewGroup on Android). Because it sits on JSI, JavaScript can read layout
 * synchronously instead of waiting for an async reply.
 */

export const NODES = ['Header', 'Image', 'Button'] as const;
export const IMAGE_HEIGHTS = [14, 22, 10];
export const HEADER = 8;
export const BUTTON = 7;
export const GAP = 3;

export const layoutOf = (image: number) => {
  const header = { h: HEADER, y: GAP };
  const img = { h: image, y: header.y + header.h + GAP };
  const button = { h: BUTTON, y: img.y + img.h + GAP };
  return [header, img, button];
};

export const readouts = {
  commit: (h: number) =>
    `setState · diff: 1 view changed (Image → ${h}) · Yoga moved Button`,
  measured: (h: number, y: number) =>
    `measure(Image) → height ${h}, y ${y} · read synchronously over JSI`,
  mounted: () =>
    `mounted on both: UIView on iOS, ViewGroup on Android · nothing else touched`,
  rest: () => `one C++ tree · laid out by Yoga · mounted on iOS and Android`,
};
