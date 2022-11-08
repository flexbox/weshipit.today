import { Layout } from '../components/layout';

import { Button, Text } from '@weshipit/ui';

export default function ReactNativeApiPage() {
  return (
    <Layout
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new API
        </Button>
      }
    >
      <div className="mx-auto max-w-6xl py-24">
        <Text variant="h3" style="py-4">
          The best ressources and tools for busy developers
        </Text>
        <Text variant="s2" style="mb-4">
          We curated the essentials for the success of your React Native App.
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
