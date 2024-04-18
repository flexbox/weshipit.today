import { client as prismicClient } from './prismic';

export async function getAllFaq() {
  try {
    const faq = await prismicClient.getAllByType('faq');

    return {
      faq: faq ? faq : [],
    };
  } catch (error) {
    console.error('getAllfaq -> error', error);
    return error;
  }
}
