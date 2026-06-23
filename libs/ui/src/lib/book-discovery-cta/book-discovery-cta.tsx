'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import LinkButton from '../button/link-button';
import { Card } from '../card/card';
import { Text } from '../text/text';

interface BookDiscoveryCtaProps {
  ctaLink: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
}

export function BookDiscoveryCta({
  ctaLink,
  title = 'Still unsure? Let’s talk.',
  description = 'Book a free 30-minute discovery call and we’ll help you find the perfect fit for your team.',
  buttonLabel = 'Book a Discovery Call',
  className,
}: BookDiscoveryCtaProps) {
  return (
    <Card variant="gradient-blue" className={`md:p-10 ${className ?? ''}`}>
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Text as="h3" variant="h4" className="mb-2 text-white">
            {title}
          </Text>
          <Text as="p" variant="p1" className="text-white max-w-md">
            {description}
          </Text>
        </div>
        <LinkButton href={ctaLink} variant="outline" size="lg">
          <CalendarIcon className="w-5 h-5 mr-2" />
          {buttonLabel}
        </LinkButton>
      </div>
    </Card>
  );
}

export default BookDiscoveryCta;
