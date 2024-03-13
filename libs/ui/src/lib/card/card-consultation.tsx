import { Card } from './card';
import Button from '../button/button';
import Gravatar from 'react-gravatar';
import Link from 'next/link';
import LinkButton from '../button/link-button';

export interface CardConsultationProps {
  gravatarSize: number;
}

export function CardConsultation({ gravatarSize }: CardConsultationProps) {
  return (
    <Card variant="gradient-purple" size="lg">
      <Link
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="/onboarding"
      >
        <div className="relative flex h-[164px] w-[124px] flex-row items-center justify-center sm:h-[124px]">
          <Gravatar
            className="rounded-full border-4 border-white"
            size={gravatarSize}
            email="ducrocq.matthys@gmail.com"
          />
          <Gravatar
            className="-ml-4 mr-4 rounded-full border-4 border-white"
            size={gravatarSize}
            email="dleuliette@gmail.com"
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-black sm:items-start">
          <h1 className="relative bg-gradient-to-b from-black to-[#444] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-3xl dark:from-white dark:to-white/75 dark:drop-shadow">
            Consultation
          </h1>
          <p className="max-w-[20ch] text-xl font-medium opacity-80 md:text-2xl dark:text-white">
            Book a call with us to talk about your project.
          </p>
          <LinkButton
            as="a"
            variant="secondary"
            href="/onboarding"
            className="mt-4"
          >
            Book a call
          </LinkButton>
        </div>
      </Link>
    </Card>
  );
}

export default CardConsultation;
