import { Card, LinkButton, Text } from '@weshipit/ui';

export function AuditGratuitCta() {
  return (
    <Card variant="gradient-blue" className="md:p-10">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <Text
            as="p"
            variant="c2"
            className="uppercase tracking-wide text-white/80"
          >
            Outil gratuit
          </Text>
          <Text as="h2" variant="h4" className="mt-1 text-white">
            Auditez votre stack React Native en 3 minutes
          </Text>
          <Text as="p" variant="p2" className="mt-2 max-w-xl text-white/90">
            25 questions, un score sur 100 — la même grille que nous utilisons
            pour auditer des apps à des millions d’utilisateurs.
          </Text>
        </div>
        <LinkButton
          href="/audit-gratuit"
          variant="outline"
          size="xl"
          className="shrink-0"
        >
          Faire l’audit gratuit
        </LinkButton>
      </div>
    </Card>
  );
}

export default AuditGratuitCta;
