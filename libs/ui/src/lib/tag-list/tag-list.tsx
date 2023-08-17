import { getVariantFromType } from '../tool-list/get-variant-from-type';
import { Badge } from '../badge/badge';

export interface TagListProps {
  tags: string[];
}

function TagListItem({ platform }: { platform: string }) {
  const platformVariant = getVariantFromType(platform);

  return (
    <Badge variant={platformVariant as any} className="mr-2">
      {platform}
    </Badge>
  );
}

export function TagList({ tags }: TagListProps) {
  return (
    <div>
      <ul className="flex list-none flex-wrap pl-0">
        {tags?.map((platform, index) => (
          <li key={`platform-${index}`} className="mb-2 mr-2">
            <TagListItem platform={platform} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;
