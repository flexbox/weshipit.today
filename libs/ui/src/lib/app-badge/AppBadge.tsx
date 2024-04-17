import { Hyperlink } from '../hyperlink/hyperlink';
import { Badge } from '../badge/badge';

export interface AppBadgeProps {
  iOS?: boolean;
  android?: boolean;
  link: string;
}

export function AppBadge({ iOS, android, link }: AppBadgeProps) {
  return (
    <Hyperlink isExternal noIcon href={link} className="no-underline">
      <Badge size={'md'}>
        {iOS && ' iOS'}
        {android && '🤖 Android'}
        {iOS || android ? '' : '🌐 Web'}
      </Badge>
    </Hyperlink>
  );
}

export default AppBadge;
