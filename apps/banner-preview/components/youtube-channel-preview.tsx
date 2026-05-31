import Image from 'next/image';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';

interface YouTubeChannelPreviewProps {
  bannerUrl: string;
  variant?: 'desktop' | 'mobile';
  channelName?: string;
  handle?: string;
  subscribers?: string;
  videos?: string;
  description?: string;
  avatarUrl?: string;
}

const DEFAULTS = {
  channelName: 'David Leuliette',
  handle: '@dleuliette',
  subscribers: '12.4K subscribers',
  videos: '87 videos',
  description: 'React Native tutorials, talks, and live coding sessions.',
  avatarUrl: 'https://placehold.co/300x300/d1d5db/4b5563?text=DL',
};

const TABS = ['Home', 'Videos', 'Shorts', 'Live', 'Playlists'];

export function YouTubeChannelPreview({
  bannerUrl,
  variant = 'desktop',
  channelName = DEFAULTS.channelName,
  handle = DEFAULTS.handle,
  subscribers = DEFAULTS.subscribers,
  videos = DEFAULTS.videos,
  description = DEFAULTS.description,
  avatarUrl = DEFAULTS.avatarUrl,
}: YouTubeChannelPreviewProps) {
  const isMobile = variant === 'mobile';
  // Desktop YouTube crops the 16:9 asset to ~6.05:1; mobile crops to ~3.66:1.
  const bannerAspect = isMobile ? '3.66 / 1' : '6.05 / 1';

  return (
    <div className="w-full bg-white text-gray-900">
      <div className={isMobile ? '' : 'px-4 pt-4'}>
        <div
          className={`relative w-full overflow-hidden bg-gray-100 ${
            isMobile ? '' : 'rounded-xl'
          }`}
          style={{ aspectRatio: bannerAspect }}
        >
          <Image
            src={bannerUrl}
            alt={`${channelName} YouTube banner`}
            fill
            sizes={isMobile ? '320px' : '(min-width: 1024px) 48rem, 100vw'}
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <div
        className={
          isMobile
            ? 'flex flex-col items-center px-4 py-4 text-center'
            : 'flex items-start gap-6 px-4 py-6'
        }
      >
        <div className="flex-shrink-0">
          <div
            className={`relative overflow-hidden rounded-full ${
              isMobile ? 'h-20 w-20' : 'h-40 w-40'
            }`}
          >
            <Image
              src={avatarUrl}
              alt={channelName}
              fill
              sizes={isMobile ? '80px' : '160px'}
              className="object-cover"
            />
          </div>
        </div>

        <div className={isMobile ? 'mt-3 w-full' : 'flex-1'}>
          <div
            className={`flex items-center gap-1.5 ${
              isMobile ? 'justify-center' : ''
            }`}
          >
            <h3 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>
              {channelName}
            </h3>
            <CheckBadgeIcon
              className={`text-gray-500 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
            />
          </div>

          <p
            className={`mt-1 text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            <span className="font-semibold text-gray-900">{handle}</span> ·{' '}
            {subscribers} · {videos}
          </p>

          <p
            className={`mt-2 text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {description}
          </p>

          <div
            className={`mt-3 flex flex-wrap items-center gap-2 ${
              isMobile ? 'justify-center' : ''
            }`}
          >
            <button
              type="button"
              className={`rounded-full bg-gray-900 font-semibold text-white hover:bg-black ${
                isMobile ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'
              }`}
            >
              Subscribe
            </button>
            <button
              type="button"
              className={`flex items-center gap-1 rounded-full border border-gray-300 font-semibold text-gray-900 hover:bg-gray-50 ${
                isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
              }`}
            >
              <BellIcon className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
              Join
            </button>
          </div>
        </div>
      </div>

      <nav className={isMobile ? 'overflow-x-auto' : ''}>
        <ul
          className={`flex gap-6 whitespace-nowrap px-4 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
        >
          {TABS.map((tab, i) => (
            <li
              key={tab}
              className={`border-b-2 py-3 ${
                i === 0
                  ? 'border-black font-semibold text-gray-900'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
