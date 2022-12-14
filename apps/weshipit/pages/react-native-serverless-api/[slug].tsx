import { Button } from '@weshipit/ui';
import Layout from '../../components/layout';

/* eslint-disable-next-line */
export interface SlugProps {}

export function Slug(props: SlugProps) {
  return (
    <Layout
      seoTitle="Slug React Native Serverless API"
      seoDescription="The best tools and resources for busy developers"
      ogImageTitle="React Native Serverless API"
      withAccessoryRight={
        <Button href="https://airtable.com/shrKPA2DGcG8xnQGG">
          Add a new API
        </Button>
      }
    >
      <h1>Welcome to Slug!</h1>
    </Layout>
  );
}

export default Slug;
