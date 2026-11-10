// Exported from Prismic (weshipit repo) on 2026-11-02. Edit here, Prismic is no longer the source of truth.
import type { LocalImage } from './types';

export interface Step {
  id: string;
  data: {
    step_number: number;
    title: string;
    /** Markdown */
    description: string;
    image: LocalImage;
  };
}

export const workflowSteps: Step[] = [
  {
    data: {
      description:
        'Whether it’s **big features**, **small fixes**, or **relase workflows**, no matter the complexity, we’ve got your back. We will provide you with a custom todo list tailored to your needs.\n\nYou can add any tasks requiring our attention to this list. There are no limits or constraints.',
      image: {
        alt: '',
        height: 400,
        url: '/images/workflow/step-1.jpg',
        width: 520,
      },
      step_number: 1,
      title: 'You have React Native features or fixes that need to be done.',
    },
    id: 'ZiQueBAAAAKD69Tw',
  },
  {
    data: {
      description:
        'We’ll tackle your custom todo list **one task at a time**.\n\nYou have the freedom to reshuffle, invert, add, or remove any tasks that have not yet started. **You set the order**, and we’ll proceed accordingly.',
      image: {
        alt: '',
        height: 400,
        url: '/images/workflow/step-2.jpg',
        width: 520,
      },
      step_number: 2,
      title: 'We will design and develop until it’s released.',
    },
    id: 'ZiQtnBAAAL6C69EX',
  },
  {
    data: {
      description:
        '_“Using your app should spark joy.”_\n\nWe’ve always wanted to say that, and we’ve always believed in it too.\n\nWe offer unlimited revisions, comments, and critiques on any task. No matter how high you set the bar, we aim to meet and exceed it. Our goal is to help you build **not just good, but memorable products**.',
      image: {
        alt: '',
        height: 400,
        url: '/images/workflow/step-3.jpg',
        width: 520,
      },
      step_number: 3,
      title: 'Satisfaction guaranteed.',
    },
    id: 'ZiQt3hAAANKC69I_',
  },
  {
    data: {
      description:
        'We understand that your needs can fluctuate – whether you’re in between projects, feature launches, or funding rounds. That’s why we offer the flexibility to pause or cancel your subscription at any time.\n\nWe believe in being there when you need us and respecting your timeline. It’s your call, because we’re here to support your journey, whether it’s a sprint or a marathon.',
      image: {
        alt: '',
        height: 400,
        url: '/images/workflow/step-3-2.jpg',
        width: 520,
      },
      step_number: 3.2,
      title: 'Your Schedule, Your Terms',
    },
    id: 'ZiQu0xAAAPyC69aN',
  },
];
