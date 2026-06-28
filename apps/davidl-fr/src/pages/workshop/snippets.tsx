import React from 'react';
import Layout from '~/components/Workshop/Layout';
import { getPatterns } from '../api/pattern';

import { ProseContainer } from '~/components/Container/ProseContainer';
import { PatternItem } from '~/components/Pattern/Item';
import { pattern } from '~/types/pattern';

interface PatternPageProps {
  data: {
    patterns: pattern[];
  };
}

export default function SnippetsPage({ data }: PatternPageProps) {
  const { patterns } = data;

  return (
    <Layout>
      <ProseContainer>
        <h2>How to do in React Native?</h2>
        {patterns.map((pattern: any) => (
          <div className="mb-48" key={pattern.id}>
            <PatternItem pattern={pattern} />
          </div>
        ))}
      </ProseContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getPatterns();

  return {
    props: {
      data,
    },
  };
}
