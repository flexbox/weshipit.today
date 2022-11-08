import { Layout } from '../components/layout';

import { Button, Text } from '@weshipit/ui';

export default function ReactNativeApiPage() {
  return (
    <Layout
      withAccessoryRight={
        <Button href="https://airtable.com/shrcF4Xn27rhIZVCs/tblpNvaodZH5S99le">
          Add a new API
        </Button>
      }
    >
      <div className="mx-auto max-w-6xl py-24">
        <Text variant="h3" style="py-4">
          React Native API
        </Text>
        <Text variant="s2" style="mb-4">
          Here is the list of all the React Native API.
        </Text>
      </div>

      <iframe
        src="https://airtable.com/embed/shrcF4Xn27rhIZVCs/tblpNvaodZH5S99le"
        height={1830}
        width="80%"
        className="mx-auto"
      />
    </Layout>
  );
}
