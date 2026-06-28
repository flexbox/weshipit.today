import { createClient } from '~/utils/prismic-configuration';

export async function getPatterns() {
  const client = createClient();

  try {
    const patterns = await client.getByType('design_pattern', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    });

    return {
      patterns: patterns ? patterns.results : [],
    };
  } catch (error) {
    console.error('getPatterns -> error', error);
    return error;
  }
}

export async function getPatternByUid(uid: string) {
  const client = createClient();

  try {
    const pattern = await client.getByUID('design_pattern', uid, {
      lang: 'en-gb',
    });
    return { pattern };
  } catch (error) {
    console.error('getPatternByUid -> error', error);
    return error;
  }
}
