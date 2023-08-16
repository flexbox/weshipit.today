import { getVariantFromType } from './get-variant-from-type';
import { Badge } from '../badge/badge';

export interface PlatformListProps {
  platforms: string[];
}

function PlatformListItem({ platform }: { platform: string }) {
  const platformVariant = getVariantFromType(platform);

  return (
    <Badge variant={platformVariant as any} className="mr-2">
      {platform}
    </Badge>
  );
}

export function PlatformList({ platforms }: PlatformListProps) {
  return (
    <div>
      <ul className="flex flex-wrap">
        {platforms?.map((platform, index) => (
          <li key={`platform-${index}`} className="mb-2 mr-2">
            <PlatformListItem platform={platform} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlatformList;
