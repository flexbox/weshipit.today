import { StarIcon } from '@heroicons/react/24/outline';
import { Button } from '../button/button';
import { LinkButton } from '../button/link-button';

export function HeaderLinksOnboarding() {
  return (
    <div className="flex gap-2">
      <LinkButton variant="outline" href="/pricing" size="xl">
        Pricing
      </LinkButton>
      <Button
        variant="outline"
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
