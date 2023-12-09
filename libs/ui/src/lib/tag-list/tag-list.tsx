import { getVariantFromType } from '../tool-list/get-variant-from-type';
import { Badge } from '../badge/badge';

export interface TagListProps {
  tags: string[];
  size?: 'sm' | 'md';
}

interface TagListItemProps {
  item: string;
  size?: 'sm' | 'md';
}

function TagListItem({ item, size }:TagListItemProps) {
  const variant = getVariantFromType(item);

  return (
    <Badge variant={variant as any} size={size} className="mr-2">
      {item}
    </Badge>
  );
}

export function TagList({ tags, size }: TagListProps) {
  return (
    <ul className="flex list-none flex-wrap pl-0">
      {tags?.map((item, index) => (
        <li key={`platform-${index}`} className="mb-2 mr-2">
          <TagListItem item={item} size={size}/>
        </li>
      ))}
    </ul>
  );
}

export default TagList;
