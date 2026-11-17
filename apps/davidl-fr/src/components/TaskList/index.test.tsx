import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { taskListComponents } from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/workshop/challenges/03-maestro?tab=1#step' }),
}));

const { input: Input, li: ListItem } = taskListComponents;

function Task({ index, checked }: { index: number; checked?: boolean }) {
  return (
    <ListItem className="task-list-item">
      <Input type="checkbox" checked={checked} data-task-index={index} /> Step{' '}
      {index}
    </ListItem>
  );
}

describe('taskListComponents', () => {
  beforeEach(() => localStorage.clear());

  it('toggles when the label text is clicked and remembers it per page', () => {
    const { unmount } = render(<Task index={0} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Step 0' });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(screen.getByText(/Step/));
    expect(checkbox).toBeChecked();
    expect(
      localStorage.getItem('task-list:/workshop/challenges/03-maestro:0'),
    ).toBe('true');

    unmount();
    render(<Task index={0} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('starts from the markdown state until the student changes it', () => {
    render(<Task index={1} checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
