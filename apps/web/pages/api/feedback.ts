import * as prismic from '@prismicio/client';
import type {
  PrismicDocument,
  ImageField,
  KeyTextField,
  RichTextField,
} from '@prismicio/client';
import { client as prismicClient } from './prismic';

// Define the structure for the data part of the feedback document
interface FeedbackData {
  full_name: KeyTextField;
  job_title: KeyTextField;
  company: KeyTextField;
  review: RichTextField;
  avatar: ImageField;
}

export type FeedbackPrismicDocument = PrismicDocument<any, 'feedback'>;

export async function getAllFeedback(): Promise<{
  feedback: FeedbackPrismicDocument[];
}> {
  try {
    const response = await prismicClient.get({
      filters: [prismic.filter.at('document.type', 'feedback')],
      orderings: [
        {
          field: 'document.first_publication_date',
          direction: 'desc',
        },
      ],
      pageSize: 5,
    });

    return {
      feedback: (response.results as FeedbackPrismicDocument[]) ?? [],
    };
  } catch (error) {
    console.error('getAllFeedback -> error', error);
    return { feedback: [] };
  }
}
