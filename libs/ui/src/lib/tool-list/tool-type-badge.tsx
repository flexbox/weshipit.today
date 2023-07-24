import { Badge } from '../badge/badge';

export function ToolTypeBadge({
  type,
  ...rest
}: {
  type: string;
  size: 'sm' | 'md' | null | undefined;
}) {
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
    <Badge variant={typeVariant as any} className="mr-2" {...rest}>
      {type}
    </Badge>
  );
}
