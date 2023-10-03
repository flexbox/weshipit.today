import { Button } from '@weshipit/ui';
import { linksApi } from '../pages/api/links';

export function HeaderLinksForTools() {
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
        href={linksApi.airtable.TOOLS_FORM}
        className="px-2"
        target="_blank"
        size="xl"
      >
        Add a React Native Tool
      </Button>
    </div>
  );
}
