interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * remark-gfm renders `- [ ]` as a disabled checkbox. This rehype plugin
 * enables every task checkbox and numbers it in document order, so the
 * client can remember which ones a student ticked.
 */
export function rehypeTaskList() {
  return (tree: HastNode) => {
    let index = 0;

    const walk = (node: HastNode) => {
      if (
        node.type === 'element' &&
        node.tagName === 'input' &&
        node.properties?.type === 'checkbox'
      ) {
        delete node.properties.disabled;
        node.properties.dataTaskIndex = index;
        index += 1;
      }
      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
