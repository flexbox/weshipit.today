import { SPM_READINESS } from '../utils/audits/spm-readiness';
import { SelfAuditQuiz } from './self-audit-quiz';

interface SpmReadinessAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SpmReadinessAudit({
  headingAs = 'h2',
}: SpmReadinessAuditProps) {
  return <SelfAuditQuiz audit={SPM_READINESS} headingAs={headingAs} />;
}

export default SpmReadinessAudit;
