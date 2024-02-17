import { StarIcon } from '@heroicons/react/24/outline';
import { Button } from '../button/button';
import { LinkButton } from '../button/link-button';

/* eslint-disable-next-line */
export interface HeaderLinksOnboardingProps {}

export function HeaderLinksOnboarding(props: HeaderLinksOnboardingProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        href="https://github.com/flexbox/weshipit.today"
        size="xl"
        as="a"
        isExternalLink
        withExternalLinkIcon={false}
      >
        <StarIcon className="mr-2 size-5" />
        Star Us on GitHub
      </Button>
      <LinkButton variant="primary" href="/onboarding" size="xl">
        Book a consultation
      </LinkButton>
    </div>
  );
}

export default HeaderLinksOnboarding;
