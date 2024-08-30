import { Hyperlink } from '../hyperlink/hyperlink';
import { Badge } from '../badge/badge';

export interface AppBadgeProps {
  link: string;
  iOS?: boolean;
  android?: boolean;
}

export function AppBadge({ android, iOS, link }: AppBadgeProps) {
  return (
    <Hyperlink isExternal noIcon href={link} className="no-underline">
      <Badge size="md" variant="gray-light">
        {iOS && '🍎 iOS'}
        {android && '🤖 Android'}
        {iOS || android ? '' : '🌐 Web'}
      </Badge>
    </Hyperlink>
  );
}

export default AppBadge;
