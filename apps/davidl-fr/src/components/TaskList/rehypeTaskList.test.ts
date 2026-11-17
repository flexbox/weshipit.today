import { rehypeTaskList } from './rehypeTaskList';

const checkbox = () => ({
  type: 'element',
  tagName: 'input',
  properties: { type: 'checkbox', checked: false, disabled: true },
  children: [],
});

describe('rehypeTaskList', () => {
  it('enables task checkboxes and numbers them in document order', () => {
    const first = checkbox();
    const second = checkbox();
    const text = {
      type: 'element',
      tagName: 'input',
      properties: { type: 'text', disabled: true },
      children: [],
    };
    const tree = {
      type: 'root',
      children: [
        { type: 'element', tagName: 'li', children: [first] },
        { type: 'element', tagName: 'li', children: [text, second] },
      ],
    };

    rehypeTaskList()(tree);

    expect(first.properties).toEqual({
      type: 'checkbox',
      checked: false,
      dataTaskIndex: 0,
    });
    expect(second.properties).toMatchObject({ dataTaskIndex: 1 });
    expect(second.properties).not.toHaveProperty('disabled');
    expect(text.properties).toEqual({ type: 'text', disabled: true });
  });
});
