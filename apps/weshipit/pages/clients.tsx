import { useAllPrismicDocumentsByType } from '@prismicio/react';

export default function ClientPage() {
  const [document] = useAllPrismicDocumentsByType('client');

  let docs;
  document &&
    (docs = document.map((doc) => {
      return {
        id: doc.id,
        name: doc.data.name,
        logo: doc.data.logo.url,
      };
    }));
  console.log(
    '🚀 ~ file: clients.tsx ~ line 5 ~ ClientPage ~ document',
    document
  );
  console.log('🚀 ~ file: clients.tsx ~ line 13 ~ ClientPage ~ docs', docs);

  {
    // eslint-disable-next-line react/jsx-key
    document && document.map((doc) => <div>{docs.name}</div>);
  }

  // <div>{document && <h1>{document.data.name}</h1>}</div>;
}
