import { SECURITY_AUDIT } from '../utils/audits/security';
import { SelfAuditQuiz } from './self-audit-quiz';

interface SecurityAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SecurityAudit({ headingAs = 'h2' }: SecurityAuditProps) {
  return <SelfAuditQuiz audit={SECURITY_AUDIT} headingAs={headingAs} />;
}

export default SecurityAudit;
