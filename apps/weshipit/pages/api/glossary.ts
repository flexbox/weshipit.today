import { client as prismicClient } from './prismic';

export interface GlossaryTerm {
  id: string;
  uid: string | null;
  data: {
    title: string;
    description: any;
    related_to: any;
    related_articles?: any[];
    [key: string]: any;
  };
}

export async function getAllGlossaryTerms() {
  try {
    const glossaryTerms = await prismicClient.getAllByType('glossary');

    return {
      glossaryTerms: glossaryTerms as unknown as GlossaryTerm[],
    };
  } catch (error) {
    console.error('getAllGlossaryTerms -> error', error);
    return { glossaryTerms: [] };
  }
}

export async function getGlossaryTermByUID(uid: string) {
  try {
    const term = await prismicClient.getByUID('glossary', uid);
    return term as unknown as GlossaryTerm;
  } catch (error) {
    console.error('getGlossaryTermByUID -> error', error);
    return null;
  }
}

export async function getPrevNextGlossaryTerms(currentUID: string) {
  try {
    const allTerms = await prismicClient.getAllByType('glossary');

    // Sort terms alphabetically by title
    allTerms.sort((a, b) => a.data.title.localeCompare(b.data.title));

    const currentIndex = allTerms.findIndex((term) => term.uid === currentUID);

    return {
      previousTerm:
        currentIndex > 0
          ? (allTerms[currentIndex - 1] as unknown as GlossaryTerm)
          : null,
      nextTerm:
        currentIndex < allTerms.length - 1
          ? (allTerms[currentIndex + 1] as unknown as GlossaryTerm)
          : null,
    };
  } catch (error) {
    console.error('getPrevNextGlossaryTerms -> error', error);
    return { previousTerm: null, nextTerm: null };
  }
}
