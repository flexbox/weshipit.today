// Exported from Prismic (weshipit repo) on 2026-11-02. Edit here, Prismic is no longer the source of truth.
import type { LocalImage } from './types';

export interface Feedback {
  id: string;
  data: {
    full_name: string;
    job_title: string;
    company: string;
    /** Markdown */
    review: string;
    avatar: LocalImage | null;
  };
}

// Newest first
export const feedback: Feedback[] = [
  {
    data: {
      avatar: {
        alt: '',
        height: 800,
        url: '/images/feedback/clementine-lourme.jpg',
        width: 800,
      },
      company: 'Retail Shake',
      full_name: 'Clémentine Lourme',
      job_title: 'Business developer',
      review:
        "David is a true tech influencer who will improve your team's productivity by 55% thanks to his startup knowledge and deep roots in the JavaScript ecosystem.\n\nThanks to his automation coaching, I'm more productive—thank you!",
    },
    id: 'aAoHIBEAACcAtES1',
  },
  {
    data: {
      avatar: {
        alt: 'Photo of Ludovic',
        height: 500,
        url: '/images/feedback/ludovic-borie.jpg',
        width: 500,
      },
      company: 'Karnott',
      full_name: 'Ludovic Borie',
      job_title: 'CTO',
      review:
        "Positive energy, the desire to move forward, to propose solutions, and, with Matthys, the ability to adapt to our work environment. Thank you for that; working with small companies isn't always easy.",
    },
    id: 'aAoDkREAACcAtD-T',
  },
  {
    data: {
      avatar: {
        alt: 'Photo of Alice',
        height: 800,
        url: '/images/feedback/alice-jodra.jpg',
        width: 800,
      },
      company: 'Saint-Gobain PAM Canalisation',
      full_name: 'Alice Jodra',
      job_title: 'IT Project Manager',
      review:
        'Impressive practical knowledge and expertise, with a lot of useful information provided to jump into development as easily and efficiently as possible.',
    },
    id: 'aAoC5hEAACwAtD6c',
  },
];
