import { AppBadge } from './AppBadge';

export default {
  component: AppBadge,
  title: 'AppBadge',
};

export const allVariants = () => (
  <div className="flex flex-col space-y-4">
    <AppBadge link="https://example.com" platform="iOS" />
    <AppBadge link="https://example.com" platform="android" />
    <AppBadge link="https://example.com" platform="web" />
    <AppBadge link="https://example.com">🎙️ Podcast</AppBadge>
  </div>
);
