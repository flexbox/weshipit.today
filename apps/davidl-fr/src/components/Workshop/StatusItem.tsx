function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface StatusItemProps {
  item: {
    status: string;
    statusType: 'todo' | 'done' | string;
  };
}

export const StatusItem = ({ item }: StatusItemProps) => {
  return (
    <div
      className={classNames(
        item.statusType !== 'todo'
          ? ' bg-green-100 text-green-800'
          : ' bg-blue-100 text-blue-800',
        '-ml-2 inline-flex items-baseline rounded-full border px-2.5 py-0.5 text-sm font-bold md:mt-2 lg:mt-0',
      )}
    >
      {item.status}
    </div>
  );
};

export const StatusItemHomepage = ({ item }: StatusItemProps) => {
  return <div>{item.statusType === 'done' ? '✅' : '➡️'}</div>;
};
