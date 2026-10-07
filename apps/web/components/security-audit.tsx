import {
  AuditCategory,
  SelfAuditConfig,
  SelfAuditQuiz,
} from './self-audit-quiz';

const CATEGORIES: AuditCategory[] = [
  {
    key: 'secrets',
    label: 'Secrets & stockage',
    questions: [
      {
        id: 's1',
        text: 'Aucune clé secrète (Stripe secret key, clé admin Firebase, clé OpenAI…) ne se trouve dans le bundle JS, app.json ou app.config — tout ce qui est embarqué est considéré public.',
      },
      {
        id: 's2',
        text: 'Les variables EXPO_PUBLIC_* ne contiennent que des valeurs publiques, jamais de secret serveur.',
      },
      {
        id: 's3',
        text: 'Vos tokens d’auth sont stockés dans expo-secure-store (Keychain/Keystore), jamais dans AsyncStorage ou MMKV en clair.',
      },
      {
        id: 's4',
        text: 'Les données personnelles sensibles (santé, paiement, identité) stockées localement sont chiffrées, ou mieux : pas stockées du tout.',
      },
      {
        id: 's5',
        text: 'Les console.log sont retirés des builds de production et vos logs/breadcrumbs Sentry ne contiennent ni token, ni mot de passe, ni donnée perso.',
      },
      {
        id: 's6',
        text: 'La déconnexion vide le stockage sécurisé, le cache des requêtes et révoque le refresh token côté serveur.',
      },
      {
        id: 's7',
        text: 'Votre flux OAuth utilise PKCE (expo-auth-session ou équivalent), sans client secret embarqué dans l’app.',
      },
    ],
  },
  {
    key: 'network',
    label: 'Réseau & API',
    questions: [
      {
        id: 'n1',
        text: 'Tout le trafic passe en HTTPS : pas de usesCleartextTraffic sur Android, pas de NSAllowsArbitraryLoads sur iOS.',
      },
      {
        id: 'n2',
        text: 'Votre backend vérifie l’autorisation à chaque requête — aucun contrôle d’accès ne repose uniquement sur l’app (écran masqué, rôle stocké côté client…).',
      },
      {
        id: 'n3',
        text: 'Si vous utilisez Supabase ou Firebase, les Row Level Security / Security Rules sont activées et testées, pas laissées en mode test.',
      },
      {
        id: 'n4',
        text: 'Vos access tokens ont une durée de vie courte et sont renouvelés via refresh token, pas un token valable des mois.',
      },
      {
        id: 'n5',
        text: 'Vos API sensibles sont protégées contre les clients non légitimes (rate limiting, App Attest / Play Integrity, Firebase App Check…).',
      },
      {
        id: 'n6',
        text: 'Les messages d’erreur de l’API ne divulguent ni stack trace, ni requête SQL, ni détail d’infrastructure.',
      },
      {
        id: 'n7',
        text: 'Pour les apps à fort enjeu (banque, santé), le certificate pinning est en place avec une stratégie de rotation, le cas échéant.',
      },
    ],
  },
  {
    key: 'platform',
    label: 'Plateforme',
    questions: [
      {
        id: 'p1',
        text: 'Les paramètres de vos deep links sont validés et ne déclenchent aucune action sensible sans confirmation ; vous préférez les Universal Links / App Links vérifiés aux seuls custom schemes.',
      },
      {
        id: 'p2',
        text: 'Vos WebViews ont un originWhitelist restreint, n’activent pas allowFileAccess sur du contenu non maîtrisé et vérifient l’origine dans onMessage.',
      },
      {
        id: 'p3',
        text: 'Sur Android, android:allowBackup est désactivé (ou les données sensibles en sont exclues) et seuls les composants nécessaires sont exported.',
      },
      {
        id: 'p4',
        text: 'L’app ne demande que les permissions strictement nécessaires, au moment où elles sont utiles, avec un message explicite.',
      },
      {
        id: 'p5',
        text: 'Les écrans sensibles sont masqués dans le sélecteur d’apps et protégés des captures d’écran (expo-screen-capture / FLAG_SECURE), le cas échéant.',
      },
      {
        id: 'p6',
        text: 'L’authentification biométrique déverrouille un secret stocké dans le Keychain/Keystore, pas un simple booléen côté JS.',
      },
      {
        id: 'p7',
        text: 'Pour les apps à fort enjeu, la détection root/jailbreak et la vérification d’intégrité de l’app sont en place, le cas échéant.',
      },
    ],
  },
  {
    key: 'build',
    label: 'Build & dépendances',
    questions: [
      {
        id: 'b1',
        text: 'Vos builds de release sont en mode release : Hermes en bytecode, pas de menu dev, pas d’écran ou d’endpoint de debug accessible via __DEV__ ou un feature flag.',
      },
      {
        id: 'b2',
        text: 'Vos dépendances sont surveillées en continu (Dependabot, Renovate ou npm audit en CI) et les vulnérabilités critiques corrigées sous quelques jours.',
      },
      {
        id: 'b3',
        text: 'Le lockfile est commité et la CI installe avec npm ci (ou équivalent), pas une résolution flottante des versions.',
      },
      {
        id: 'b4',
        text: 'Chaque SDK tiers (analytics, pub, attribution) a été revu : données collectées, Privacy Manifest iOS et Data Safety Google Play à jour.',
      },
      {
        id: 'b5',
        text: 'Vos keystores, certificats et credentials de signature sont gérés par EAS ou un coffre-fort, jamais commités dans le repo.',
      },
      {
        id: 'b6',
        text: 'Vos mises à jour OTA (EAS Update) sont signées (code signing) pour qu’aucun bundle non autorisé ne puisse être servi à vos utilisateurs.',
      },
      {
        id: 'b7',
        text: 'Un scanner de sécurité dédié (rnsec ou équivalent) tourne en CI et bloque les pull requests qui introduisent une faille critique.',
      },
    ],
  },
];

function getVerdict(scorePct: number) {
  if (scorePct < 50) {
    return {
      label: 'Exposition élevée',
      text: 'Plusieurs protections de base manquent. Un secret extrait du bundle ou une API mal protégée suffit à compromettre vos utilisateurs — à traiter avant la prochaine release.',
    };
  }
  if (scorePct < 80) {
    return {
      label: 'Bonnes bases, angles morts à fermer',
      text: 'L’essentiel est en place, mais certains points (stockage, deep links, supply chain) restent exploitables. Priorisez les réponses « Non » de la catégorie la plus faible.',
    };
  }
  return {
    label: 'Posture de sécurité solide',
    text: 'Votre app couvre la grande majorité des contrôles de base. Prochaine étape : un test d’intrusion ou une revue manuelle orientée OWASP MASVS.',
  };
}

const SECURITY_AUDIT: SelfAuditConfig = {
  id: 'security-audit',
  eyebrow: 'Outil gratuit',
  title: 'Auditez la sécurité de votre app React Native',
  intro:
    '28 contrôles, 4 catégories, un score en 3 minutes. Les points que nous vérifions en premier sur une app React Native ou Expo avant une mise en production — inspirés de l’OWASP MASVS et des failles les plus fréquentes que nous trouvons en audit.',
  categories: CATEGORIES,
  getVerdict,
  resetLabel: "Recommencer l'audit sécurité",
  report: {
    title: 'Recevez votre rapport de sécurité',
    text: 'Le détail de vos réponses, classé par gravité et par effort de correction, avec la marche à suivre pour chaque point faible.',
    bullets: [
      'Vos failles classées par gravité (critique / élevée / modérée)',
      'Le correctif concret pour React Native et Expo, item par item',
      'La commande rnsec à brancher dans votre CI',
    ],
  },
  scoreField: 'security_score',
  cta: {
    text: 'Score en dessous de 80 ? Notre équipe audite votre codebase et votre configuration native, et livre un plan de remédiation priorisé.',
    href: '/audit',
    label: "Découvrir l'audit complet",
  },
};

interface SecurityAuditProps {
  headingAs?: 'h1' | 'h2';
}

export function SecurityAudit({ headingAs = 'h2' }: SecurityAuditProps) {
  return <SelfAuditQuiz config={SECURITY_AUDIT} headingAs={headingAs} />;
}

export default SecurityAudit;
