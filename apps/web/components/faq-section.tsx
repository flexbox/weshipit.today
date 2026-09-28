import { Faq, FaqProps } from '@weshipit/ui';

export const faqs: FaqProps[] = [
  {
    id: 'faq-1',
    question:
      'How is hiring a React Native development service different from hiring a full-time mobile developer?',
    answer:
      'A senior React Native engineer costs $150,000+ per year in salary alone — before benefits, equity, recruiting fees, and onboarding time. With our subscription, you get a specialized React Native team available immediately, with no hiring risk and no overhead. You can pause or cancel at any time, which is impossible with a full-time hire.',
  },
  {
    id: 'faq-2',
    question:
      'How quickly can your React Native developers integrate with our existing engineering team?',
    answer:
      'We embed directly into your GitHub workflow from day one. We join your existing repositories, follow your branching conventions, and deliver pull requests your team reviews and merges. Most clients have us shipping code within 48 hours of subscribing — no lengthy onboarding, no knowledge transfer sessions that delay delivery.',
  },
  {
    id: 'faq-3',
    question: 'Who will be working on our React Native codebase?',
    answer:
      'You work directly with David Leuliette, a top 20 Stack Overflow contributor with 10+ years of React Native experience, and Matthys Ducroq, our lead developer. No account managers, no rotating junior contractors. The same senior developers who scope your tasks are the ones writing your production code.',
  },
  {
    id: 'faq-4',
    question: 'Do we retain full ownership of the code and IP?',
    answer:
      'Yes, 100%. All code we write is committed directly to your private repository. There are no licensing restrictions, no proprietary tooling lock-in, and no clauses that retain ownership on our end. The moment we push the code, it belongs entirely to you.',
  },
  {
    id: 'faq-5',
    question:
      'Can you handle both new React Native feature development and legacy code maintenance?',
    answer:
      'Yes. We handle greenfield React Native projects, new feature sprints, performance audits, library upgrades, and legacy codebase migrations — including upgrades from the old React Native architecture to the New Architecture with Fabric and TurboModules. We regularly work on codebases we did not start from scratch.',
  },
  {
    id: 'faq-6',
    question:
      'What happens if we need to scale up or scale down the engagement?',
    answer:
      "You can upgrade, downgrade, pause, or cancel your subscription at any time with no penalty. If your roadmap accelerates, we can increase throughput. If you're in a quiet period, pause and restart when you're ready. We're designed to flex with your engineering needs, not lock you into a fixed contract.",
  },
  {
    id: 'faq-7',
    question:
      'How do you handle App Store submissions and production deployments?',
    answer:
      "We manage the full release pipeline — TestFlight builds, Google Play internal tracks, Expo EAS submissions, and production rollouts. We set up automated CI/CD if you don't have it, handle code signing and provisioning profiles, and notify your team on Slack when each build is ready for review or live in the stores.",
  },
  {
    id: 'faq-8',
    question:
      'Why is keeping a React Native app up to date a critical engineering concern?',
    answer:
      'React Native releases major versions regularly, and Apple and Google enforce SDK requirements that can block your app from the stores. Falling behind on upgrades — React Native version, Expo SDK, or native dependencies — can require months of remediation work or, in severe cases, a full rebuild. Staying current is significantly cheaper than catching up.',
  },
  {
    id: 'faq-9',
    question: 'How is our backlog managed and how do we track progress?',
    answer:
      "You organize your backlog as GitHub Issues in your repository. We triage, prioritize, and work through tasks one at a time, focusing on production-ready delivery rather than partially completed work. You get automatic Slack notifications when a task is in review and when it's shipped to production.",
  },
  {
    id: 'faq-10',
    question:
      'Is this service suitable for a CTO managing a product team without dedicated mobile expertise?',
    answer:
      "That's exactly who we built this for. We act as your embedded React Native experts — reviewing architectural decisions, mentoring your existing developers, and delivering features your team doesn't have the mobile depth to build confidently. We've helped CTOs at funded startups and scale-ups ship iOS and Android apps without hiring a full mobile team.",
  },
];

export function faqPageSchema(items: FaqProps[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function FaqSection({ items = faqs }: { items?: FaqProps[] }) {
  return (
    <section
      className="bg-white dark:bg-slate-900"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Faq faqs={items} headingId="faq-heading" />
      </div>
    </section>
  );
}
