import {
  getSpmVerdict,
  SPM_AUDIT_ID,
  SPM_CATEGORIES,
} from '../utils/audits/spm-readiness';
import { EN_LABELS, SelfAuditConfig, SelfAuditQuiz } from './self-audit-quiz';

const SPM_READINESS_AUDIT: SelfAuditConfig = {
  categories: SPM_CATEGORIES,
  cta: {
    href: '/audit',
    label: 'Discover the full audit',
    text: 'Scored below 80? We map every native dependency of your app and hand you a step-by-step plan to leave CocoaPods.',
  },
  eyebrow: '12 checks · 2 minutes',
  getVerdict: getSpmVerdict,
  id: SPM_AUDIT_ID,
  intro: 'Answer No, Unknown or Yes. Your score shows up instantly.',
  labels: EN_LABELS,
  report: {
    bullets: [
      'Your blockers ranked by effort (quick fix / library change / wait)',
      'The React Native 0.87 commands for each step',
      'What to do for each library without a Package.swift',
    ],
    text: 'Your answers turned into an ordered migration plan, from the first blocker to the CocoaPods removal.',
    title: 'Get your migration plan',
  },
  resetLabel: 'Restart the readiness check',
  title: 'Your SPM readiness check',
};

interface SpmReadinessAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SpmReadinessAudit({
  headingAs = 'h2',
}: SpmReadinessAuditProps) {
  return <SelfAuditQuiz config={SPM_READINESS_AUDIT} headingAs={headingAs} />;
}

export default SpmReadinessAudit;
