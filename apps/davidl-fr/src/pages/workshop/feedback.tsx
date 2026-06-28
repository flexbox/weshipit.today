import React, { ReactElement } from 'react';
import Layout from '~/components/Workshop/Layout';
import { FeedBackWorkshop } from '../feedback-workshop';

interface Props {}

export default function feedback({}: Props): ReactElement {
  return (
    <Layout>
      <FeedBackWorkshop />
    </Layout>
  );
}
