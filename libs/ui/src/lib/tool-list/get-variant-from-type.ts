export function getVariantFromType(type: string) {
  switch (type) {
    // types
    case 'Analytics':
      return 'lime';
    case 'Auth & Identity':
      return 'indigo';
    case 'Backend & APIs':
      return 'green';
    case 'Error Monitoring':
      return 'pink';
    case 'Database & Storage':
      return 'cyan';
    case 'CI/CD & Release':
      return 'blue';
    case 'Payments & Subscriptions':
      return 'yellow';
    case 'CMS & Content':
      return 'green';
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
    case 'Open Source':
      return 'gray-light';
    case 'Free tier':
      return 'gray-light';
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
    color: 'lime',
    name: 'Analytics',
  },
  {
    color: 'indigo',
    name: 'Auth & Identity',
  },
  {
    color: 'green',
    name: 'Backend & APIs',
  },
  {
    color: 'pink',
    name: 'Error Monitoring',
  },
  {
    color: 'blue',
    name: 'CI/CD & Release',
  },
  {
    color: 'yellow',
    name: 'Payments & Subscriptions',
  },
  {
    color: 'cyan',
    name: 'Database & Storage',
  },
  {
    color: 'green',
    name: 'CMS & Content',
  },
];
