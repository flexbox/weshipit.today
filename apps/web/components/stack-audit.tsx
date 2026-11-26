import { STACK_AUDIT } from '../utils/audits/stack';
import { SelfAuditQuiz } from './self-audit-quiz';

interface StackAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function StackAudit({ headingAs = 'h2' }: StackAuditProps) {
  return <SelfAuditQuiz audit={STACK_AUDIT} headingAs={headingAs} />;
}

export default StackAudit;
