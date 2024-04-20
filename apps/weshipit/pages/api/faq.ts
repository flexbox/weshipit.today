import { client as prismicClient } from './prismic';

export async function getAllFaqs() {
  try {
    const faqs = await prismicClient.getAllByType('faq');

    return {
      faqs: faqs ? faqs : [],
    };
  } catch (error) {
    console.error('getAllfaq -> error', error);
    return error;
  }
}
