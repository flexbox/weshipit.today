import { Button } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

interface HeaderLinksForToolsProps {
  buttonText?: string;
  buttonLink?: string;
}

export function HeaderLinksForTools({
  buttonText = 'Add a React Native Tool',
  buttonLink = linksApi.airtable.TOOLS_FORM,
}: HeaderLinksForToolsProps) {
  return (
    <div className="flex">
      <Button
        variant="secondary"
        as="a"
        className="mr-4 px-2"
        href="https://flexbox.gumroad.com/l/expo-checklist"
        target="_blank"
        size="xl"
      >
        🎁 Free Launch Checklist
      </Button>
      <Button
        as="a"
        href={buttonLink}
        className="px-2"
        target="_blank"
        size="xl"
      >
        {buttonText}
      </Button>
    </div>
  );
}
