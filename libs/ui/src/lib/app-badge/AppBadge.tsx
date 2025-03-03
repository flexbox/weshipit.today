import { Hyperlink } from '../hyperlink/hyperlink';
import { Badge } from '../badge/badge';
import { PropsWithChildren } from 'react';

export interface AppBadgeProps extends PropsWithChildren {
  link: string;
  platform?: 'iOS' | 'android' | 'web';
}

export function AppBadge({ platform, link, children }: AppBadgeProps) {
  return (
    <Hyperlink isExternal noIcon href={link} className="no-underline">
      <Badge size="md" variant="gray-light">
        {platform === 'iOS' && '🍎 iOS'}
        {platform === 'android' && '🤖 Android'}
        {platform === 'web' && '🌐 Web'}
        {children}
      </Badge>
    </Hyperlink>
  );
}

export default AppBadge;
