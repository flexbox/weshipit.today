export function getVariantFromType(type: string) {
  switch (type) {
    case 'Analytics':
      return 'lime';
    case 'Authentication':
      return 'indigo';
    case 'Backend':
      return 'green';
    case 'Crash reporting':
      return 'pink';
    case 'Persistent storage':
      return 'cyan';
    case 'Infrastructure':
      return 'blue';
    case 'Payment':
      return 'yellow';
    default:
      return 'gray';
  }
}

interface Type {
  name: string;
  color?:
    | 'blue'
    | 'cyan'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'pink'
    | 'yellow'
    | null
    | undefined;
}

export const types: Type[] = [
  {
    name: 'Analytics',
    color: 'lime',
  },
  {
    name: 'Authentication',
    color: 'indigo',
  },
  {
    name: 'Backend',
    color: 'green',
  },
  {
    name: 'Crash reporting',
    color: 'pink',
  },
  {
    name: 'Infrastructure',
    color: 'blue',
  },
  {
    name: 'Payment',
    color: 'yellow',
  },
  {
    name: 'Persistent storage',
    color: 'cyan',
  },
];
