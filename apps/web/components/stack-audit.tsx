import {
  AuditCategory,
  SelfAuditConfig,
  SelfAuditQuiz,
} from './self-audit-quiz';

const CATEGORIES: AuditCategory[] = [
  {
    key: 'fondations',
    label: 'Fondations',
    questions: [
      {
        id: 'f1',
        text: 'Un Error Boundary global capture les crashs inattendus et affiche un fallback.',
      },
      {
        id: 'f2',
        text: "SafeAreaView est utilisé correctement sur tous les écrans (rien sous l'encoche ou la barre système).",
      },
      {
        id: 'f3',
        text: 'Vous avez une librairie de composants UI cohérente, pas un simple UI kit assemblé à la main.',
      },
      {
        id: 'f4',
        text: 'Toutes les modals passent par un seul système (bottom sheet unifié), pas 3 implémentations différentes.',
      },
      {
        id: 'f5',
        text: 'Vos listes longues sont virtualisées (FlatList/FlashList), pas un .map() dans un ScrollView.',
      },
      {
        id: 'f6',
        text: "Vous utilisez react-native-vision-camera plutôt qu'expo-camera pour les besoins performance (scan…), le cas échéant.",
      },
      {
        id: 'f7',
        text: 'Votre navigation repose sur un Native Stack (native-stack), pas un JS Navigator.',
      },
      {
        id: 'f8',
        text: 'Votre app tourne sur la New Architecture (Fabric + TurboModules), pas encore sur Paper et le Bridge historique.',
      },
      {
        id: 'f9',
        text: 'Vos images passent par expo-image (cache disque, placeholders, priorités), pas le composant Image de React Native.',
      },
      {
        id: 'f10',
        text: 'Vos animations et gestes complexes tournent via Reanimated sur le thread UI (transform/opacity), pas via Animated sur le thread JS.',
      },
    ],
  },
  {
    key: 'ecosystem',
    label: 'Écosystème',
    questions: [
      {
        id: 'e1',
        text: 'Vous avez Storybook (ou équivalent) pour développer vos composants isolément.',
      },
      {
        id: 'e2',
        text: "Les parties critiques de l'app sont couvertes par des tests unitaires.",
      },
      {
        id: 'e3',
        text: "Vous avez un logger centralisé pour l'observabilité, pas des console.log éparpillés.",
      },
      {
        id: 'e4',
        text: 'ESLint est configuré avec des règles spécifiques React Native, pas la config par défaut.',
      },
      {
        id: 'e5',
        text: 'Vous avez des tests E2E (Maestro ou équivalent) sur les parcours critiques.',
      },
      {
        id: 'e6',
        text: 'Sentry (ou équivalent) est centralisé dans un seul fichier, pas dispersé dans le code.',
      },
    ],
  },
  {
    key: 'data',
    label: 'Couche data',
    questions: [
      {
        id: 'd1',
        text: 'Vous utilisez TanStack Query (ou équivalent) plutôt que fetch + useState/isLoading maison.',
      },
      {
        id: 'd2',
        text: 'Vos hooks data maison (hors TanStack Query) exposent un statut typé, pas des booléens isLoading empilés.',
      },
      {
        id: 'd3',
        text: 'Votre client API est généré automatiquement depuis un schéma OpenAPI (Orval ou équivalent), zéro type manuel.',
      },
      {
        id: 'd4',
        text: 'Vous avez une vraie stratégie offline-first avec gestion de queue et retry.',
      },
      {
        id: 'd5',
        text: 'Votre state global (Context/store) ne provoque pas de re-renders en cascade sur toute l’app.',
      },
      {
        id: 'd6',
        text: 'Votre tracking GPS background (si applicable) adapte sa précision selon l’activité, pas un intervalle fixe.',
      },
      {
        id: 'd7',
        text: 'Votre stockage clé-valeur pour données non sensibles utilise MMKV (ou équivalent) plutôt qu’AsyncStorage, pour des accès synchrones et rapides.',
      },
      {
        id: 'd8',
        text: 'Vos tokens d’auth et secrets sont stockés dans expo-secure-store (Keychain/Keystore), jamais dans AsyncStorage ou MMKV en clair.',
      },
      {
        id: 'd9',
        text: 'Vos appels réseau vérifient response.ok, remontent des erreurs typées et gèrent les échecs (retry / backoff), pas juste un try/catch silencieux.',
      },
    ],
  },
  {
    key: 'devops',
    label: 'Devops',
    questions: [
      {
        id: 'o1',
        text: 'Votre bundle JS est mesuré et reste sous les 3MB minifié.',
      },
      {
        id: 'o2',
        text: 'Vous mesurez le Time To Interaction (Flashlight ou équivalent) plutôt que de deviner.',
      },
      {
        id: 'o3',
        text: "Vous êtes sur une version d'Expo SDK encore supportée (l'une des plus récentes), pas une version en fin de vie.",
      },
      {
        id: 'o4',
        text: "Vos variables d'environnement sont gérées par environnement EAS, pas de .env en dur commité.",
      },
      {
        id: 'o5',
        text: "La version de l'app est pilotée à distance (remote version source), pas bumpée à la main.",
      },
      {
        id: 'o6',
        text: 'Vous avez scanné votre app avec un outil de sécurité dédié (clés API en dur, secrets exposés…).',
      },
      {
        id: 'o7',
        text: 'Vous livrez vos correctifs JS via EAS Update (OTA) sans repasser systématiquement par une review des stores.',
      },
    ],
  },
];

function getVerdict(scorePct: number) {
  if (scorePct < 40) {
    return {
      label: 'Fondations à consolider',
      text: "Plusieurs bases structurantes manquent encore — c'est le moment de prioriser avant que la dette technique ne ralentisse l'équipe.",
    };
  }
  if (scorePct < 70) {
    return {
      label: 'Bases solides, dette à surveiller',
      text: "L'essentiel est en place, mais quelques zones méritent une revue avant de scaler l'équipe ou le produit.",
    };
  }
  return {
    label: 'Stack bien tenue',
    text: 'Votre architecture tient la route sur la majorité des points. Les optimisations restantes sont surtout marginales.',
  };
}

const STACK_AUDIT: SelfAuditConfig = {
  id: 'stack-audit',
  eyebrow: 'Outil gratuit',
  title: 'Auditez vous-même votre stack React Native',
  intro:
    "32 questions, 4 catégories, un score en 3 minutes. La même grille utilisée pour challenger l'architecture d'apps qui gèrent des millions d'utilisateurs — transformée en checklist que vous pouvez faire passer à votre propre codebase.",
  categories: CATEGORIES,
  getVerdict,
  resetLabel: "Recommencer l'audit",
  report: {
    title: "Recevez votre rapport d'audit complet",
    text: "Le détail de vos réponses, priorisé par impact et effort (comme un vrai audit d'architecture), envoyé directement dans votre boîte mail.",
    bullets: [
      'Vos points faibles classés par priorité (impact / effort)',
      'Des recommandations concrètes par item, pas de généralités',
      'Le même format utilisé pour les audits clients',
    ],
  },
  scoreField: 'audit_score',
  cta: {
    text: "Score en dessous de 70 ? Notre équipe réalise le même audit en profondeur sur votre codebase, avec un plan d'action priorisé.",
    href: '/audit',
    label: "Découvrir l'audit complet",
  },
};

interface StackAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function StackAudit({ headingAs = 'h2' }: StackAuditProps) {
  return <SelfAuditQuiz config={STACK_AUDIT} headingAs={headingAs} />;
}

export default StackAudit;
