import { Badge } from '../badge/badge';

export interface PlatformListProps {
  platforms: string[];
}

function PlatformListItem({ platform }: { platform: string }) {
  let platformVariant = 'gray-lighter';
  switch (platform) {
    case 'Android':
      platformVariant = 'lime';
      break;
    case 'iOS':
      platformVariant = 'gray-light';
      break;
    case 'macOS':
      platformVariant = 'gray';
      break;
    case 'tvOS':
      platformVariant = 'gray-dark';
      break;
    case 'Unity':
      platformVariant = 'gray-darker';
      break;
    case 'Web':
      platformVariant = 'cyan';
      break;
    case 'Windows':
      platformVariant = 'blue';
      break;
    case 'Premium tiers':
      platformVariant = 'yellow';
      break;
    case 'Free tier':
      platformVariant = 'lime';
      break;
    case 'Pay as-you-go':
      platformVariant = 'pink';
      break;
    case 'Open source':
      platformVariant = 'indigo';
      break;
    default:
      break;
  }

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
