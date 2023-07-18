import { Badge } from '../badge/badge';

export interface TypeListProps {
  types: string[];
}

export function ToolTypeBadge({ type }: { type: string }) {
  let typeVariant = 'gray-lighter';
  switch (type) {
    case 'Analytics':
      typeVariant = 'lime';
      break;
    case 'Authentication':
      typeVariant = 'indigo';
      break;
    case 'Persistent storage':
      typeVariant = 'cyan';
      break;
    case 'Infrastructure':
      typeVariant = 'blue';
      break;
    case 'Backend':
      typeVariant = 'green';
      break;
    case 'Crash reporting':
      typeVariant = 'pink';
      break;
    case 'Payment':
      typeVariant = 'yellow';
      break;
    default:
      break;
  }

  return (
    <Badge variant={typeVariant as any} className="mr-2">
      {type}
    </Badge>
  );
}
