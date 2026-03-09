'use client';

import { useState } from 'react';
import Button from '../button/button';
import {
  CalendarIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  RocketLaunchIcon,
  CheckIcon,
  ChatBubbleBottomCenterIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import clsx, { ClassValue } from 'clsx';
import { SpotLeft } from '../spot-left/spot-left';
import { Card } from '../card/card';
import { SPOT_AVAILABILITY } from '../spot-left/spot-availability';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/monthly' },
  { value: 'onetime', label: 'One time', priceSuffix: '/one time' },
];

const tiers = [
  {
    name: 'Kickstart Audit',
    id: 'tier-kickstart',
    href: 'https://buy.stripe.com/bJefZi5umh140FAfwt4wM0d',
    price: { onetime: '10000 €' },
    description:
      'Get a senior-level React Native audit that prevents 6+ months of trial-and-error and saves you 50k€ in tech debt.',
    audience: 'For startups with a legacy app that’s lagging',
    features: [
      'Comprehensive stack audit and assessment',
      '2 phases implementation: investigation and execution',
      'Definition of key objectives and success metrics',
      'High-level strategy document',
      'DX improvements and performance optimizations',
      'Recommendations for library and tooling updates',
      '2 follow-up strategy calls within the first three months',
    ],
    featured: false,
    cta: 'Reserve now',
  },
  {
    name: 'Essential',
    id: 'tier-essential',
    href: 'https://buy.stripe.com/bIY2bOb39fYWe0E8wD',
    price: { monthly: '2500 €' },
    description:
      'Build your mobile app with confidence through our monthly guidance. Our expert team provides responsive support and weekly strategic sessions to ensure your development success and continuous improvement.',
    audience: 'For companies with more than 1 mobile developer.',
    features: [
      '40 hours of software development',
      '24-hour support response time on Slack',
      'Weekly backlog calls',
    ],
    featured: false,
    cta: 'Reserve now',
    spotsLeft: SPOT_AVAILABILITY.essential,
  },
  {
    name: 'Growth',
    id: 'tier-growth',
    href: 'https://buy.stripe.com/5kA03G1sz8wu8GkfZ6',
    price: { monthly: '5000 €' },
    description:
      'Accelerate your app development with our premium package. Get a dedicated team, priority support, and in-depth strategic sessions to maximize your growth potential and scale efficiently.',
    audience: 'For companies with more than 1 mobile developer.',
    features: [
      '80 hours of software development',
      '12-hour support response time on Slack',
      'Daily backlog calls',
    ],
    featured: false,
    cta: 'Get Started',
    spotsLeft: SPOT_AVAILABILITY.growth,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: 'https://flexbox.notion.site/2fbf478bcb8c8033859bf78cf7646db9?pvs=105',
    price: 'Custom',
    description:
      'Custom-tailored solutions for large-scale enterprises. Experience dedicated team support, premium infrastructure, and personalized React Native development strategies for your mission-critical projects.',
    audience: 'For companies with more than 1 mobile developer.',
    features: [
      'Custom hours of software development',
      '1-hour, dedicated support response time',
      'Daily backlog calls',
      'I talk about your company on my podcast',
    ],
    featured: true,
    cta: 'View Proposal',
  },
];

type PlanKey = 'kickstart' | 'essential' | 'growth' | 'enterprise';

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

const plans = {
  kickstart: {
    name: 'Kickstart',
    icon: MagnifyingGlassIcon,
    price: '5,000€',
    period: 'one-time',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-600',
    description: 'Comprehensive audit & strategic roadmap',
    highlights: ['2 strategy calls', 'Stack assessment', 'Roadmap document'],
    cta: 'Get Started',
    href: '#',
  },
  essential: {
    name: 'Essential',
    icon: BeakerIcon,
    price: '2,500€',
    period: '/month',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-600',
    description: 'Monthly guidance with 40h development',
    highlights: ['Weekly backlog calls', '24h Slack support', '40 dev hours'],
    cta: 'Get Started',
    href: '#',
  },
  growth: {
    name: 'Growth',
    icon: RocketLaunchIcon,
    price: '6,750€',
    period: '/month',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-600',
    description: 'Premium package with 120h development',
    highlights: ['Weekly backlog calls', '24h Slack support', '120 dev hours'],
    cta: 'Get Started',
    href: '#',
  },
  enterprise: {
    name: 'Enterprise',
    icon: BuildingStorefrontIcon,
    price: 'Custom',
    period: '',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-600',
    description: 'Dedicated team for mission-critical apps',
    highlights: ['Daily calls', '1h response time', 'Custom hours'],
    cta: 'View Proposal',
    href: '#',
  },
};

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

export function PlanFinderSection() {
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
        (Object.keys(points) as PlanKey[]).forEach((plan) => {
          scores[plan] += points[plan];
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
  const plan = recommendedPlan ? plans[recommendedPlan] : null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <SparklesIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Find Your Perfect Plan
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Not Sure Which Plan Fits?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Answer a few quick questions and we&apos;ll recommend the best plan
            for your needs, or compare all plans side by side.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
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
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <Card className="border-2 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
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
              className={cn(
                'border-2 shadow-xl overflow-hidden',
                plan.borderColor,
              )}
            >
              <div className={cn('h-2 bg-gradient-to-r', plan.color)} />

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
                <p className="text-muted-foreground mt-3">{plan.description}</p>
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
                <Button
                  size="lg"
                  className={cn(
                    'bg-gradient-to-r text-white shadow-lg',
                    plan.color,
                  )}
                >
                  {plan.cta}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={resetQuiz}>
                  Retake Quiz
                </Button>
              </div>
            </Card>
          </div>
        )}

        {mode === 'compare' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.entries(plans) as [PlanKey, typeof plans.kickstart][]).map(
              ([key, plan]) => (
                <Card
                  key={key}
                  className={cn(
                    'relative border-2 transition-all hover:shadow-xl hover:-translate-y-1',
                    plan.borderColor,
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-0 left-0 right-0 h-1 rounded-t-lg bg-gradient-to-r',
                      plan.color,
                    )}
                  />
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      plan.bgColor,
                    )}
                  >
                    <plan.icon className={cn('w-6 h-6', plan.textColor)} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={cn('text-2xl font-bold', plan.textColor)}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckIcon
                          className={cn('w-4 h-4 shrink-0', plan.textColor)}
                        />
                        <span className="text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      'w-full bg-gradient-to-r text-white',
                      plan.color,
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ),
            )}
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-10">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Still unsure? Let&apos;s talk.
              </h3>
              <p className="text-primary-foreground/80 max-w-md">
                Book a free 20-minute discovery call and we&apos;ll help you
                find the perfect fit for your team.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="shrink-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Book a Discovery Call
            </Button>
          </div>
        </div>

        {/* Upgrade Paths */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Common Upgrade Paths
            </h3>
            <p className="text-muted-foreground">
              See how companies typically grow with us over time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upgradePaths.map((item, index) => (
              <Card
                key={index}
                className="group border-2 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {item.path.map((step, stepIndex) => (
                    <span key={stepIndex} className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {step}
                      </span>
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

export function Pricing() {
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
                    'mb-2 text-xl font-semibold',
                    tier.featured
                      ? 'text-white dark:text-gray-900'
                      : 'text-gray-900 dark:text-white',
                  )}
                >
                  {tier.name}
                </h3>
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
                {(tier.spotsLeft || tier.spotsLeft === 0) && (
                  <SpotLeft spotsLeft={tier.spotsLeft} />
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
                      : tier.price.monthly || tier.price.onetime}
                  </span>
                  {typeof tier.price !== 'string' ? (
                    <span
                      className={clsx(
                        'text-sm/6 font-semibold',
                        tier.featured
                          ? 'text-gray-300 dark:text-gray-600'
                          : 'text-gray-600 dark:text-gray-300',
                      )}
                    >
                      {tier.price.monthly && frequencies[0].priceSuffix}
                      {tier.price.onetime && frequencies[1].priceSuffix}
                    </span>
                  ) : null}
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
                  'mt-auto pt-6 text-center text-xs font-medium uppercase tracking-wider',
                  tier.featured
                    ? 'text-gray-300 dark:text-gray-600'
                    : 'text-gray-600 dark:text-gray-300',
                )}
              >
                NO CONTRACTS, CANCEL ANYTIME
              </p>
            </Card>
          ))}
        </div>

        <PlanFinderSection />
      </div>
    </div>
  );
}

export default Pricing;
