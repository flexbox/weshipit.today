import { Button } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

interface HeaderLinksForToolsProps {
  buttonText?: string;
  buttonLink?: string;
}

export function HeaderLinksForTools({
  buttonLink = linksApi.airtable.TOOLS_FORM,
  buttonText = 'Add a React Native Tool',
}: HeaderLinksForToolsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        as="a"
        className="px-2"
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
