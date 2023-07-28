import Button from '../button/button';
import CardGradient from '../card-gradient/card-gradient';
import Gravatar from 'react-gravatar';

export interface CardConsultationProps {
  gravatarSize: number;
}

export function CardConsultation({ gravatarSize }: CardConsultationProps) {
  return (
    <CardGradient
      variant="purple"
      className="flex justify-center rounded-xl bg-cover p-8"
    >
      <a
        className="flex flex-col items-center justify-center gap-8 text-center sm:text-left"
        href="https://airtable.com/shryVoJ3nzyeq2P4s"
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
          <h1 className="relative bg-gradient-to-b from-black to-[#444] bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/75 dark:drop-shadow md:text-3xl">
            Consultation
          </h1>
          <p className="max-w-[20ch] text-xl font-medium opacity-80 dark:text-white md:text-2xl">
            Book a call with us to talk about your project.
          </p>
          <Button
            as={'a'}
            variant="secondary"
            href="https://airtable.com/shryVoJ3nzyeq2P4s"
            className="mt-4"
            isExternalLink={true}
          >
            Book a call
          </Button>
        </div>
      </a>
    </CardGradient>
  );
}

export default CardConsultation;
