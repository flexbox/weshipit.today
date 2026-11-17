import React, { ComponentPropsWithoutRef, useSyncExternalStore } from 'react';
import { useRouter } from 'next/router';

export { rehypeTaskList } from './rehypeTaskList';

const CHANGE_EVENT = 'task-list-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: boolean) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Storage blocked (private mode): the tick still shows until reload.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type InputProps = ComponentPropsWithoutRef<'input'> & {
  'data-task-index'?: number | string;
};

function TaskCheckbox(props: InputProps) {
  const { checked: defaultChecked, 'data-task-index': taskIndex } = props;
  const router = useRouter();
  const pagePath = router.asPath.split(/[?#]/)[0];
  const storageKey = `task-list:${pagePath}:${taskIndex}`;

  const stored = useSyncExternalStore(
    subscribe,
    () => readStored(storageKey),
    () => null,
  );
  const isChecked =
    stored === null ? Boolean(defaultChecked) : stored === 'true';

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(event) => writeStored(storageKey, event.target.checked)}
    />
  );
}

function Input(props: InputProps) {
  if (props.type === 'checkbox' && props['data-task-index'] !== undefined) {
    return <TaskCheckbox {...props} />;
  }
  return <input {...props} />;
}

function ListItem(props: ComponentPropsWithoutRef<'li'>) {
  const { className, children, ...rest } = props;

  if (!className?.includes('task-list-item')) {
    return <li {...props} />;
  }

  // Wrapping in a label makes the whole line toggle the checkbox.
  return (
    <li className={className} {...rest}>
      <label>{children}</label>
    </li>
  );
}

/** Pass to `<MDXRemote components={...}>` with `rehypeTaskList` in serialize. */
export const taskListComponents = {
  input: Input,
  li: ListItem,
};
