import { client as prismicClient } from './prismic';

export interface GlossaryTerm {
  id: string;
  data: {
    title: string;
    description: any;
    related_to: any;
  };
}

export async function getAllGlossaryTerms() {
  try {
    const glossaryTerms = await prismicClient.getAllByType('glossary');

    return {
      glossaryTerms: glossaryTerms ? glossaryTerms : [],
    };
  } catch (error) {
    console.error('getAllGlossaryTerms -> error', error);
    return error;
  }
}
