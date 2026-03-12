'use client';

import { useState, ElementType } from 'react';
import Button from '../button/button';
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  RocketLaunchIcon,
  CheckIcon,
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import clsx, { ClassValue } from 'clsx';
import { SpotLeft, SPOT_AVAILABILITY } from '../spot-left/spot-left';
import { Card } from '../card/card';
import { twMerge } from 'tailwind-merge';
import { Text } from '../text/text';
import { Badge } from '../badge/badge';
import LinkButton from '../button/link-button';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PlanKey = 'kickstart' | 'essential' | 'growth' | 'enterprise';

interface Tier {
  key: PlanKey;
  name: string;
  id: string;
  href: string;
  price: { monthly?: string; onetime?: string } | string;
  description: string;
  audience: string;
  features: string[];
  highlights: string[];
  deliveredBy: string;
  featured: boolean;
  cta: string;
  spotsLeft: number;
  icon: ElementType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const tiers: Tier[] = [
  {
    key: 'kickstart',
    name: 'Kickstart Audit',
    id: 'tier-kickstart',
    href: 'https://buy.stripe.com/14k3fSdbhdQOcWA28e',
    price: { onetime: '10 000 €' },
    description:
      'Get a senior-level React Native audit that prevents 6+ months of trial-and-error and saves you 50k€ in tech debt.',
    audience: 'Before raising your next funding round.',
    features: [
      'Complete codebase audit and performance analysis',
      'Technical debt assessment with priority matrix',
      'DX improvements and tooling recommendations',
      'Library updates and architecture optimization strategy',
      'High-level optimization roadmap (4-12 weeks)',
      'Key success metrics and implementation phases',
      '2 strategic follow-up calls within 3 months',
      'Slack access for critical questions',
    ],
    highlights: ['Stack assessment', 'Roadmap document', '3 months follow-up'],
    deliveredBy: 'David Leuliette (React Native expert)',
    featured: false,
    cta: 'Reserve now',
    spotsLeft: SPOT_AVAILABILITY.kickstart,
    icon: MagnifyingGlassIcon,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-600',
  },
  {
    key: 'essential',
    name: 'Essential',
    id: 'tier-essential',
    href: 'https://buy.stripe.com/bIY2bOb39fYWe0E8wD',
    price: { monthly: '2 500 €' },
    description:
      'Reliable React Native development with weekly strategic alignment. Your go-to execution partner for consistent delivery.',
    audience: 'Post-PMF startups building features consistently.',
    features: [
      '40 hours of software development',
      'Feature development and bug fixes',
      'Code reviews and technical documentation',
      'Performance optimizations',
      'Weekly backlog calls',
      'Sprint planning and priority alignment',
      '24-hour Slack response time',
      'Proactive recommendations',
    ],
    highlights: ['40 dev hours', 'Weekly calls', '24h Slack'],
    deliveredBy: 'Matthys Ducrocq (Lead Developer)',
    featured: false,
    cta: 'Reserve now',
    spotsLeft: SPOT_AVAILABILITY.essential,
    icon: BeakerIcon,
    color: 'from-blue-500 to-cyan-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-600',
  },
  {
    key: 'growth',
    name: 'Growth',
    id: 'tier-growth',
    href: 'https://buy.stripe.com/5kA03G1sz8wu8GkfZ6',
    price: { monthly: '5 000 €' },
    description:
      'Accelerate development with doubled capacity and daily alignment. Scale your mobile app faster with dedicated support.',
    audience: 'Scale-ups in rapid growth phase.',
    features: [
      '80 hours of software development',
      'Complex feature development',
      'Architecture improvements',
      'Migration and refactoring projects',
      'Daily backlog calls',
      'Continuous priority alignment',
      '12-hour Slack response time',
      'Monthly performance reports',
    ],
    highlights: ['80 dev hours', 'Daily calls', '12h Slack'],
    deliveredBy: 'Matthys Ducrocq (Lead Developer)',
    featured: false,
    cta: 'Get Started',
    spotsLeft: SPOT_AVAILABILITY.growth,
    icon: RocketLaunchIcon,
    color: 'from-blue-500 to-cyan-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-600',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: 'https://flexbox.notion.site/2fbf478bcb8c8033859bf78cf7646db9?pvs=105',
    price: 'Custom',
    description:
      'Work directly with our award-winning senior expert. Strategic partnership for mission-critical React Native projects.',
    audience: 'Series A+ companies with complex mobile apps.',
    features: [
      '4 days/week senior expertise (David)',
      'Strategic architecture and technical leadership',
      'Code reviews and team mentorship',
      'Long-term technical roadmap planning',
      'Daily calls for continuous alignment',
      'Direct access to decision-maker',
      '1-hour dedicated response time',
      'Monthly strategy sessions',
      'David talks about your company on his podcast',
    ],
    highlights: ['4 days/week David', 'Daily calls', '1h response'],
    deliveredBy: 'David Leuliette (Award-winning expert, 10+ years)',
    featured: true,
    cta: 'View Proposal',
    spotsLeft: SPOT_AVAILABILITY.enterprise,
    icon: BuildingStorefrontIcon,
    color: 'from-indigo-500 via-purple-500 to-pink-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-600',
  },
];

// Derived from tiers — do not edit directly
type PlanInfo = {
  name: string;
  icon: ElementType<{ className?: string }>;
  price: string;
  period: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  highlights: string[];
  cta: string;
  href: string;
};

const plansByKey = Object.fromEntries(
  tiers.map((tier) => {
    const price =
      typeof tier.price === 'string'
        ? tier.price
        : (tier.price.monthly ?? tier.price.onetime ?? 'Custom');
    const period =
      typeof tier.price === 'string'
        ? ''
        : tier.price.monthly
          ? '/month'
          : 'one-time';
    return [
      tier.key,
      {
        name: tier.name,
        icon: tier.icon,
        price,
        period,
        color: tier.color,
        bgColor: tier.bgColor,
        borderColor: tier.borderColor,
        textColor: tier.textColor,
        description: tier.description,
        highlights: tier.highlights,
        cta: tier.cta,
        href: tier.href,
      } satisfies PlanInfo,
    ];
  }),
) as Record<PlanKey, PlanInfo>;

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    description: string;
    points: Record<PlanKey, number>;
  }[];
}

const questions: Question[] = [
  {
    id: 'stage',
    question: 'What stage is your React Native project in?',
    options: [
      {
        label: 'Planning or evaluating',
        description: "We're considering React Native or need an expert review",
        points: { kickstart: 3, essential: 1, growth: 0, enterprise: 0 },
      },
      {
        label: 'Active development',
        description: 'We have an app and need ongoing development help',
        points: { kickstart: 0, essential: 3, growth: 2, enterprise: 1 },
      },
      {
        label: 'Scaling rapidly',
        description: 'Our app is growing and we need more development power',
        points: { kickstart: 0, essential: 1, growth: 3, enterprise: 2 },
      },
      {
        label: 'Mission-critical',
        description:
          'We need a dedicated strategic partner for our enterprise app',
        points: { kickstart: 0, essential: 0, growth: 1, enterprise: 3 },
      },
    ],
  },
  {
    id: 'hours',
    question: 'How many development hours do you need monthly?',
    options: [
      {
        label: 'One-time engagement',
        description: 'I need a strategic audit or assessment',
        points: { kickstart: 3, essential: 0, growth: 0, enterprise: 0 },
      },
      {
        label: 'Up to 40 hours',
        description: 'Part-time development support',
        points: { kickstart: 1, essential: 3, growth: 0, enterprise: 0 },
      },
      {
        label: '40-120 hours',
        description: 'Substantial development capacity',
        points: { kickstart: 0, essential: 1, growth: 3, enterprise: 1 },
      },
      {
        label: '120+ hours',
        description: 'Full-time dedicated team',
        points: { kickstart: 0, essential: 0, growth: 1, enterprise: 3 },
      },
    ],
  },
  {
    id: 'support',
    question: 'What level of communication do you need?',
    options: [
      {
        label: 'Periodic check-ins',
        description: 'Follow-up calls within the engagement period',
        points: { kickstart: 3, essential: 1, growth: 0, enterprise: 0 },
      },
      {
        label: 'Weekly sync',
        description: 'Regular backlog calls and 24h Slack response',
        points: { kickstart: 0, essential: 3, growth: 2, enterprise: 0 },
      },
      {
        label: 'Daily communication',
        description: 'Daily calls and 1-hour response time',
        points: { kickstart: 0, essential: 0, growth: 1, enterprise: 3 },
      },
    ],
  },
];

const upgradePaths = [
  {
    title: 'Audit → Execution',
    path: ['Kickstart', 'Essential or Growth'],
    description: 'Most startups start here',
    icon: '🔍',
  },
  {
    title: 'Audit → Strategic Partnership',
    path: ['Kickstart', 'Enterprise'],
    description: 'For companies ready to scale with senior guidance',
    icon: '🎯',
  },
  {
    title: 'Scale Your Execution',
    path: ['Essential', 'Growth', 'Enterprise'],
    description: 'Natural growth path',
    icon: '📈',
  },
];

export function PlanFinderSection({ ctaLink }: { ctaLink: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [mode, setMode] = useState<'quiz' | 'compare'>('quiz');

  const calculateRecommendation = (): PlanKey => {
    const scores: Record<PlanKey, number> = {
      kickstart: 0,
      essential: 0,
      growth: 0,
      enterprise: 0,
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find((q) => q.id === questionId);
      if (question && question.options[optionIndex]) {
        const points = question.options[optionIndex].points;
        (Object.keys(points) as PlanKey[]).forEach((p) => {
          scores[p] += points[p];
        });
      }
    });

    return (Object.entries(scores) as [PlanKey, number][]).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    )[0];
  };

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    setAnswers({ ...answers, [question.id]: optionIndex });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const recommendedPlan = showResult ? calculateRecommendation() : null;
  const plan = recommendedPlan ? plansByKey[recommendedPlan] : null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Text as="h2" variant="h2">
            Not sure which plan fits?
          </Text>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
            Answer a few quick questions and we’ll recommend the best plan for
            your needs, or compare all plans side by side.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50 dark:bg-muted/10 dark:border-muted/20">
            <button
              onClick={() => {
                setMode('quiz');
                resetQuiz();
              }}
              className={cn(
                'px-5 py-2.5 rounded-md text-sm font-medium transition-all',
                mode === 'quiz'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <ChatBubbleBottomCenterIcon className="w-4 h-4 inline-block mr-2" />
              Quick Quiz
            </button>
            <button
              onClick={() => setMode('compare')}
              className={cn(
                'px-5 py-2.5 rounded-md text-sm font-medium transition-all',
                mode === 'compare'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <MagnifyingGlassIcon className="w-4 h-4 inline-block mr-2" />
              Compare Plans
            </button>
          </div>
        </div>

        {mode === 'quiz' && !showResult && (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  %
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden dark:bg-muted/20">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <Card className="shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group dark:hover:bg-primary/10 dark:border-muted/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {option.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {mode === 'quiz' && showResult && plan && (
          <div className="max-w-3xl mx-auto">
            <Card
              className={cn('shadow-xl overflow-hidden !p-0', plan.borderColor)}
            >
              <div className={cn('h-2 bg-gradient-to-r', plan.color)} />

              <div className="p-12">
                <div className="text-center mb-8">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                      plan.bgColor,
                    )}
                  >
                    <plan.icon className={cn('w-8 h-8', plan.textColor)} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    We recommend
                  </p>
                  <h3 className="text-3xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mt-2">
                    <span className={cn('text-4xl font-bold', plan.textColor)}>
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-3">
                    {plan.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {plan.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg',
                        plan.bgColor,
                      )}
                    >
                      <CheckIcon
                        className={cn('w-5 h-5 shrink-0', plan.textColor)}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" variant="outline" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                  <LinkButton
                    href={plan.href}
                    size="lg"
                    className={cn(
                      'bg-gradient-to-r text-white shadow-lg group',
                      plan.color,
                    )}
                  >
                    {plan.cta}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </LinkButton>
                </div>
              </div>
            </Card>
          </div>
        )}

        {mode === 'compare' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.entries(plansByKey) as [PlanKey, PlanInfo][]).map(
              ([key, p]) => (
                <Card
                  key={key}
                  className={cn(
                    'relative transition-all hover:shadow-xl',
                    p.borderColor,
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-0 left-0 right-0 h-1 rounded-t-lg bg-gradient-to-r',
                      p.color,
                    )}
                  />
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      p.bgColor,
                    )}
                  >
                    <p.icon className={cn('w-6 h-6', p.textColor)} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={cn('text-2xl font-bold', p.textColor)}>
                      {p.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {p.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 md:min-h-24">
                    {p.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {p.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckIcon
                          className={cn('w-4 h-4 shrink-0', p.textColor)}
                        />
                        <span className="text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <LinkButton
                    href={p.href}
                    className={cn(
                      'w-full bg-gradient-to-r text-white group',
                      p.color,
                    )}
                  >
                    {p.cta}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </LinkButton>
                </Card>
              ),
            )}
          </div>
        )}

        <Card variant="gradient-blue" className="mt-16 md:p-10">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <Text as="h3" variant="h4" className="mb-2 text-white">
                Still unsure? Let’s talk.
              </Text>
              <p className="text-primary-foreground/80 max-w-md text-muted">
                Book a free 30-minute discovery call and we’ll help you find the
                perfect fit for your team.
              </p>
            </div>
            <LinkButton href={ctaLink} variant="outline" size="lg">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Book a Discovery Call
            </LinkButton>
          </div>
        </Card>

        {/* Upgrade Paths */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <Text as="h3" variant="h4" className="mb-3 text-foreground">
              Common upgrade paths
            </Text>
            <p className="text-muted-foreground">
              See how companies typically grow with us over time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upgradePaths.map((item, index) => (
              <Card
                key={index}
                className="group hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {item.path.map((step, stepIndex) => (
                    <span key={stepIndex} className="flex items-center gap-2">
                      <Badge variant="gray-lighter" size="md">
                        {step}
                      </Badge>
                      {stepIndex < item.path.length - 1 && (
                        <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ ctaLink }: { ctaLink: string }) {
  return (
    <div className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-blue-600">Pricing</h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Pricing that scales with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          Choose your entry point, upgrade anytime. No contracts, no BS.
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={clsx('p-8 xl:p-10 isolate flex flex-col h-full')}
              variant={tier.featured ? 'featured' : undefined}
              size="sm"
            >
              <div className="flex-1">
                <h3
                  id={tier.id}
                  className={clsx(
                    'mb-4 text-xl font-semibold',
                    tier.featured
                      ? 'text-white dark:text-gray-900'
                      : 'text-gray-900 dark:text-white',
                  )}
                >
                  {tier.name}
                </h3>
                {(tier.spotsLeft || tier.spotsLeft === 0) && (
                  <SpotLeft spotsLeft={tier.spotsLeft} invert={tier.featured} />
                )}
                <div className="md:min-h-32">
                  {tier.audience && (
                    <p
                      className={clsx(
                        'mt-4 text-sm/6',
                        tier.featured
                          ? 'text-gray-300 dark:text-gray-600'
                          : 'text-gray-600 dark:text-gray-300',
                      )}
                    >
                      {tier.audience}
                    </p>
                  )}
                  <p
                    className={clsx(
                      'mt-4 text-sm/6',
                      tier.featured
                        ? 'text-gray-300 dark:text-gray-600'
                        : 'text-gray-600 dark:text-gray-300',
                    )}
                  >
                    {tier.description}
                  </p>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={clsx(
                      'text-4xl font-semibold tracking-tight',
                      tier.featured
                        ? 'text-white dark:text-gray-900'
                        : 'text-gray-900 dark:text-white',
                    )}
                  >
                    {typeof tier.price === 'string'
                      ? tier.price
                      : (tier.price.monthly ?? tier.price.onetime)}
                  </span>
                  {typeof tier.price !== 'string' && (
                    <span
                      className={clsx(
                        'text-sm/6 font-semibold',
                        tier.featured
                          ? 'text-gray-300 dark:text-gray-600'
                          : 'text-gray-600 dark:text-gray-300',
                      )}
                    >
                      {tier.price.monthly ? '/monthly' : '/one time'}
                    </span>
                  )}
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={clsx(
                    'mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    tier.featured
                      ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
                      : 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400',
                  )}
                >
                  {tier.cta}
                </a>
                {!tier.featured && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>or</span>
                    <a
                      href="https://cal.com/davidl/weshipit-onboarding"
                      className="underline hover:text-gray-900 dark:hover:text-white"
                    >
                      book a call
                    </a>
                  </div>
                )}
                <ul className="mt-8 space-y-3 text-sm/6 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={clsx(
                        'flex gap-x-3',
                        tier.featured
                          ? 'text-gray-300 dark:text-gray-600'
                          : 'text-gray-600 dark:text-gray-300',
                      )}
                    >
                      <CheckIcon
                        aria-hidden="true"
                        className={clsx(
                          'h-6 w-5 flex-none',
                          tier.featured
                            ? 'text-white dark:text-blue-600'
                            : 'text-blue-600 dark:text-blue-400',
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <p
                className={clsx(
                  'mt-auto pt-4 text-xs',
                  tier.featured
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-gray-500 dark:text-gray-400',
                )}
              >
                Delivered by {tier.deliveredBy}
              </p>
              <p
                className={clsx(
                  'mt-2 pt-4 text-center text-xs font-medium uppercase tracking-wider border-t',
                  tier.featured
                    ? 'text-gray-300 dark:text-gray-600 border-white/10'
                    : 'text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700',
                )}
              >
                NO CONTRACTS, CANCEL ANYTIME
              </p>
            </Card>
          ))}
        </div>

        <PlanFinderSection ctaLink={ctaLink} />
      </div>
    </div>
  );
}

export default Pricing;
