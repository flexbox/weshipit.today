/**
 * The truth the figure moves by.
 *
 * Props flow down from a parent and are read-only to the child; when the
 * parent passes a new prop, the child re-renders. State belongs to the
 * component that creates it with useState; calling its setter re-renders
 * that component (and, through props, its children). When two components
 * need the same value, the state is lifted to their closest common parent
 * and passed down to both as a prop.
 */

export const NAMES = ['Ada', 'Bo', 'Cy', 'Dee'] as const;

export const readouts = {
  blocked: () => `Child B tried to write props.name · props are read-only`,
  lifted: (count: number) =>
    `count lifted to Parent · both children read count=${count} as a prop`,
  liftedTap: (count: number) =>
    `A calls onPress → Parent setCount(${count}) · Parent and both children re-render`,
  lowered: () => `count back in Counter A · B no longer sees it`,
  prop: (name: string) =>
    `Parent passes name="${name}" · both children re-render`,
  rest: () =>
    `Parent passes name="Ada" to both children · Counter A owns count`,
  state: (count: number) => `Counter A: setCount(${count}) · only A re-renders`,
};
