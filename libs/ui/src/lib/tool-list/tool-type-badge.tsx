import { getVariantFromType } from './get-variant-from-type';
import { Badge } from '../badge/badge';

export function ToolTypeBadge({
  type,
  ...rest
}: {
  type: string;
  size: 'sm' | 'md' | null | undefined;
}) {
  const variantType = getVariantFromType(type);

  return (
    <Badge variant={variantType} className="mr-2" {...rest}>
      {type}
    </Badge>
  );
}
