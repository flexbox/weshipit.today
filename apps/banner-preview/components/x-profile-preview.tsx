import Image from 'next/image';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

import { AVATAR_URL, CONFIG } from '../config/config';

interface XProfilePreviewProps {
  bio?: string;
  name?: string;
  handle?: string;
  bannerUrl: string;
  location?: string;
  following?: string;
  followers?: string;
  avatarUrl?: string;
  joinedDate?: string;
  variant?: 'desktop' | 'mobile';
}

const DEFAULTS = {
  avatarUrl: AVATAR_URL,
  bio: CONFIG.x.description,
  followers: '19,361',
  following: '892',
  handle: CONFIG.x.handle,
  joinedDate: 'Joined January 2014',
  location: 'Paris, France',
  name: CONFIG.x.name,
};

const TABS = ['Posts', 'Replies', 'Highlights', 'Media', 'Likes'];

export function XProfilePreview({
  avatarUrl = DEFAULTS.avatarUrl,
  bannerUrl,
  bio = DEFAULTS.bio,
  followers = DEFAULTS.followers,
  following = DEFAULTS.following,
  handle = DEFAULTS.handle,
  joinedDate = DEFAULTS.joinedDate,
  location = DEFAULTS.location,
  name = DEFAULTS.name,
  variant = 'desktop',
}: XProfilePreviewProps) {
  const isMobile = variant === 'mobile';

  return (
    <div className="w-full bg-white text-gray-900">
      <div className="relative w-full" style={{ aspectRatio: '3 / 1' }}>
        <Image
          src={bannerUrl}
          alt={`${name} X banner`}
          fill
          sizes={isMobile ? '320px' : '(min-width: 1024px) 48rem, 100vw'}
          className="object-cover"
          unoptimized
        />
      </div>

      <div className={`relative ${isMobile ? 'px-3 pb-4' : 'px-4 pb-4'}`}>
        <div
          className={`absolute ${
            isMobile ? '-top-8 left-3' : '-top-16 left-4'
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-full ring-4 ring-white ${
              isMobile ? 'h-16 w-16' : 'h-32 w-32'
            }`}
          >
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes={isMobile ? '64px' : '128px'}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="button"
            className={`rounded-full border border-gray-300 bg-white font-bold text-gray-900 hover:bg-gray-100 ${
              isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
            }`}
          >
            Edit profile
          </button>
        </div>

        <div className={isMobile ? 'mt-2' : 'mt-6'}>
          <div className="flex items-center gap-1">
            <h3
              className={`font-extrabold ${isMobile ? 'text-base' : 'text-xl'}`}
            >
              {name}
            </h3>
            <CheckBadgeIcon
              className={`text-[#1d9bf0] ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
            />
          </div>
          <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {handle}
          </p>
        </div>

        <p className={`mt-3 text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {bio}
        </p>

        <div
          className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
        >
          <span className="flex items-center gap-1">
            <MapPinIcon className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDaysIcon
              className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}
            />
            {joinedDate}
          </span>
        </div>

        <div
          className={`mt-3 flex flex-wrap gap-4 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
        >
          <span>
            <span className="font-bold text-gray-900">{following}</span>
            <span className="text-gray-500"> Following</span>
          </span>
          <span>
            <span className="font-bold text-gray-900">{followers}</span>
            <span className="text-gray-500"> Followers</span>
          </span>
        </div>
      </div>

      <nav>
        <ul
          className={`flex ${isMobile ? 'overflow-x-auto text-xs' : 'text-sm'}`}
        >
          {TABS.map((tab, i) => (
            <li
              key={tab}
              className={`flex-1 whitespace-nowrap py-3 text-center ${
                i === 0
                  ? 'border-b-4 border-[#1d9bf0] font-bold text-gray-900'
                  : 'border-b-4 border-transparent text-gray-500 hover:bg-gray-50'
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
