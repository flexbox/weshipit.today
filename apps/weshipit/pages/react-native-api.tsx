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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Text variant="h3" style="py-4">
          The best ressources and tools for busy developers
        </Text>
        <Text variant="s2" style="mb-4">
          We curated the essentials for the success of your React Native App.
          <br />
          Get all the data with{' '}
          <a
            href="https://gum.co/road-react-native"
            className="font-semibold text-blue-500 underline underline-offset-4 hover:text-blue-700"
          >
            the React Native Roadmap
          </a>
          .
        </Text>
      </div>

      <iframe
        src="https://airtable.com/embed/shrcF4Xn27rhIZVCs/tblpNvaodZH5S99le"
        height={3200}
        width="100%"
        className="mx-auto"
      />
    </Layout>
  );
}
