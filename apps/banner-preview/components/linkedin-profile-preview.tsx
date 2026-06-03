import Image from 'next/image';
import {
  ShieldCheckIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid';

import { AVATAR_URL, CONFIG } from '../config/config';

interface LinkedInProfilePreviewProps {
  bannerUrl: string;
  variant?: 'desktop' | 'mobile';
  name?: string;
  headline?: string;
  location?: string;
  ctaLabel?: string;
  followers?: string;
  connections?: string;
  avatarUrl?: string;
}

const DEFAULTS = {
  name: CONFIG.linkedIn.name,
  headline: CONFIG.linkedIn.description,
  location: 'Paris, Île-de-France, France',
  ctaLabel: 'Book React Native Experts',
  followers: '19,361 followers',
  connections: '500+ connections',
  avatarUrl: AVATAR_URL,
};

export function LinkedInProfilePreview({
  bannerUrl,
  variant = 'desktop',
  name = DEFAULTS.name,
  headline = DEFAULTS.headline,
  location = DEFAULTS.location,
  ctaLabel = DEFAULTS.ctaLabel,
  followers = DEFAULTS.followers,
  connections = DEFAULTS.connections,
  avatarUrl = DEFAULTS.avatarUrl,
}: LinkedInProfilePreviewProps) {
  const isMobile = variant === 'mobile';

  return (
    <div className="w-full bg-white text-gray-900">
      <div className="relative w-full" style={{ aspectRatio: '4 / 1' }}>
        <Image
          src={bannerUrl}
          alt={`${name} LinkedIn banner`}
          fill
          sizes={isMobile ? '320px' : '(min-width: 1024px) 48rem, 100vw'}
          className="object-cover"
          unoptimized
        />
      </div>

      <div className={`relative ${isMobile ? 'px-3 pb-4' : 'px-6 pb-6'}`}>
        <div
          className={`absolute ${
            isMobile ? '-top-8 left-3' : '-top-16 left-6'
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

        <div className={isMobile ? 'h-10' : 'h-20'} />

        <div className="flex items-center gap-1.5">
          <h3
            className={`font-bold text-gray-900 ${
              isMobile ? 'text-lg' : 'text-3xl'
            }`}
          >
            {name}
          </h3>
          <ShieldCheckIcon
            className={`text-gray-500 ${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`}
          />
          <SpeakerWaveIcon
            className={`text-gray-700 ${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`}
          />
        </div>

        <p
          className={`mt-2 text-gray-900 ${isMobile ? 'text-xs' : 'text-base'}`}
        >
          {headline}
        </p>

        <p
          className={`mt-2 text-gray-500 ${
            isMobile ? 'text-[11px]' : 'text-sm'
          }`}
        >
          {location} ·{' '}
          <a href="#" className="font-semibold text-violet-700 hover:underline">
            Contact info
          </a>
        </p>

        <a
          href="#"
          className={`mt-1 inline-flex items-center gap-1 font-semibold text-[#0a66c2] hover:underline ${
            isMobile ? 'text-[11px]' : 'text-sm'
          }`}
        >
          {ctaLabel}
          <ArrowTopRightOnSquareIcon
            className={isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}
          />
        </a>

        <p
          className={`mt-2 font-semibold text-[#0a66c2] ${
            isMobile ? 'text-[11px]' : 'text-sm'
          }`}
        >
          {followers} · {connections}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`rounded-full bg-[#0a66c2] font-semibold text-white hover:bg-[#004182] ${
              isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
            }`}
          >
            Open to
          </button>
          <button
            type="button"
            className={`rounded-full border-2 border-[#0a66c2] font-semibold text-[#0a66c2] hover:bg-blue-50 ${
              isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
            }`}
          >
            Add section
          </button>
          <button
            type="button"
            className={`rounded-full border-2 border-[#0a66c2] font-semibold text-[#0a66c2] hover:bg-blue-50 ${
              isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
            }`}
          >
            Enhance profile
          </button>
          <button
            type="button"
            aria-label="More actions"
            className={`flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-600 hover:bg-gray-50 ${
              isMobile ? 'h-7 w-7' : 'h-8 w-8'
            }`}
          >
            <EllipsisHorizontalIcon
              className={isMobile ? 'h-4 w-4' : 'h-5 w-5'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
