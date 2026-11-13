/**
 * The truth the figure moves by.
 *
 * JSX is compiled to plain function calls (the automatic runtime emits
 * jsx() and jsxs()) that return React elements; React Native turns <View>
 * and <Text> into real native views. A component returns one root: two
 * sibling tags without a wrapper are a syntax error, and a fragment <>…</>
 * groups them without adding a native view.
 */

export type Case = 'one' | 'two' | 'fragment';

export const SOURCE: Record<Case, string[]> = {
  fragment: ['<>', '  <Text>Hi</Text>', '  <Text>Yo</Text>', '</>'],
  one: ['<View>', '  <Text>Hi</Text>', '</View>'],
  two: ['<Text>Hi</Text>', '<Text>Yo</Text>'],
};

export const COMPILED: Record<Case, string[]> = {
  fragment: [
    'jsxs(Fragment, {',
    '  children: [',
    '    jsx(Text, …"Hi"),',
    '    jsx(Text, …"Yo")] })',
  ],
  one: ['jsx(View, {', '  children: jsx(Text, {', '    children: "Hi" }) })'],
  two: [],
};

export const readouts = {
  fragment: () => `wrapped in <>…</> · one root, no extra native view`,
  jam: () => `two roots · adjacent JSX elements must be wrapped`,
  one: () => `<View> → jsx(View, …) → a UIView on iOS, a ViewGroup on Android`,
  rest: () => `JSX in · function calls out · native views on screen`,
};
