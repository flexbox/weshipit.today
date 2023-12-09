export function getVariantFromType(type: string) {
  switch (type) {
    // types
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
    // platform
    case 'Android':
      return 'lime';
    case 'iOS':
      return 'gray-light';
    case 'macOS':
      return 'gray';
    case 'tvOS':
      return 'gray-dark';
    case 'Unity':
      return 'gray-darker';
    case 'Windows':
      return 'blue';
    // pricing
    case 'Open Source' || 'Free tier':
      return 'gay-light';
    case 'Pay as-you-go':
      return 'orange';
    case 'Premium tiers':
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
