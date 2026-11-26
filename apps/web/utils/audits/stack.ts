import type { SelfAudit } from './types';

/**
 * L’audit de stack React Native : 32 Checks sur les fondations,
 * l’écosystème, la couche data et le devops. Les Priorities croisent impact
 * et effort, comme le promet le formulaire. En français, au tutoiement.
 */

type StackPriority = 'quick' | 'structural' | 'improve';

function getVerdict(score: number) {
  if (score < 40) {
    return {
      label: 'Fondations à consolider',
      text: 'Plusieurs bases structurantes manquent encore. C’est le moment de prioriser, avant que la dette technique ne ralentisse l’équipe.',
    };
  }
  if (score < 70) {
    return {
      label: 'Bases solides, dette à surveiller',
      text: 'L’essentiel est en place, mais quelques zones méritent une revue avant de faire grandir l’équipe ou le produit.',
    };
  }
  return {
    label: 'Stack bien tenue',
    text: 'Ton architecture tient la route sur la majorité des points. Les optimisations restantes sont surtout marginales.',
  };
}

export const STACK_AUDIT: SelfAudit<StackPriority> = {
  categories: [
    {
      checks: [
        {
          fix: 'Enveloppe la racine de l’app dans un Error Boundary (react-error-boundary) qui affiche un écran de secours et envoie l’erreur à Sentry. Sans lui, une erreur de rendu laisse un écran blanc.',
          id: 'f1',
          label: 'Ajouter un Error Boundary global',
          priority: 'quick',
          text: 'Un Error Boundary global capture les crashs inattendus et affiche un fallback.',
        },
        {
          fix: 'Utilise react-native-safe-area-context : SafeAreaProvider à la racine, puis useSafeAreaInsets dans les écrans qui dessinent sous l’encoche ou la barre système.',
          id: 'f2',
          label: 'Gérer les zones sûres sur chaque écran',
          priority: 'quick',
          text: 'SafeAreaView est utilisé correctement sur tous les écrans (rien sous l’encoche ou la barre système).',
        },
        {
          fix: 'Regroupe boutons, textes, champs et espacements dans des composants partagés, avec des tokens pour les couleurs et les tailles. Commence par les 5 composants les plus copiés-collés.',
          id: 'f3',
          label: 'Construire une librairie de composants',
          priority: 'structural',
          text: 'Tu as une librairie de composants UI cohérente, pas un simple UI kit assemblé à la main.',
        },
        {
          fix: 'Choisis un seul système (@gorhom/bottom-sheet, ou les modals natives d’Expo Router) et migre les autres implémentations écran par écran.',
          id: 'f4',
          label: 'Unifier les modals',
          priority: 'improve',
          text: 'Toutes les modals passent par un seul système (bottom sheet unifié), pas 3 implémentations différentes.',
        },
        {
          fix: 'Remplace les .map() dans un ScrollView par FlashList (ou FlatList) dès qu’une liste peut dépasser une vingtaine d’éléments.',
          id: 'f5',
          label: 'Virtualiser les listes longues',
          priority: 'quick',
          text: 'Tes listes longues sont virtualisées (FlatList/FlashList), pas un .map() dans un ScrollView.',
        },
        {
          fix: 'Pour scanner des codes ou traiter l’image en temps réel, utilise react-native-vision-camera et ses frame processors.',
          id: 'f6',
          label: 'Passer le scan sur react-native-vision-camera',
          priority: 'improve',
          text: 'Tu utilises react-native-vision-camera plutôt qu’expo-camera pour les besoins performance (scan…), le cas échéant.',
        },
        {
          fix: 'Remplace createStackNavigator par createNativeStackNavigator (@react-navigation/native-stack) : les transitions passent sur les composants natifs. Expo Router l’utilise déjà par défaut.',
          id: 'f7',
          label: 'Passer au Native Stack',
          priority: 'quick',
          text: 'Ta navigation repose sur un Native Stack (native-stack), pas un JS Navigator.',
        },
        {
          command: 'npx expo-doctor',
          fix: 'Vérifie la compatibilité de chaque librairie native (expo-doctor la contrôle pour toi), mets à jour celles qui bloquent, puis active la New Architecture sur une branche. Depuis React Native 0.82, l’ancienne architecture n’existe plus.',
          id: 'f8',
          label: 'Migrer vers la New Architecture',
          priority: 'structural',
          text: 'Ton app tourne sur la New Architecture (Fabric + TurboModules), pas encore sur Paper et le Bridge historique.',
        },
        {
          fix: 'Remplace Image de react-native par celui d’expo-image : cache disque, placeholders (blurhash) et priorités de chargement. L’API est presque la même, la migration se fait fichier par fichier.',
          id: 'f9',
          label: 'Passer les images sur expo-image',
          priority: 'quick',
          text: 'Tes images passent par expo-image (cache disque, placeholders, priorités), pas le composant Image de React Native.',
        },
        {
          fix: 'Réécris les animations liées aux gestes et au scroll avec Reanimated et react-native-gesture-handler, en animant transform et opacity. Elles restent fluides même quand le thread JS est occupé.',
          id: 'f10',
          label: 'Passer les animations sur Reanimated',
          priority: 'improve',
          text: 'Tes animations et gestes complexes tournent via Reanimated sur le thread UI (transform/opacity), pas via Animated sur le thread JS.',
        },
      ],
      key: 'fondations',
      label: 'Fondations',
    },
    {
      checks: [
        {
          fix: 'Installe Storybook for React Native et écris une story par composant partagé. Tu développes et revois l’UI sans naviguer dans toute l’app.',
          id: 'e1',
          label: 'Mettre en place Storybook',
          priority: 'improve',
          text: 'Tu as Storybook (ou équivalent) pour développer tes composants isolément.',
        },
        {
          fix: 'Commence par la logique qui coûte cher en cas de bug (paiement, auth, calculs) avec Jest et React Native Testing Library, et lance les tests à chaque pull request.',
          id: 'e2',
          label: 'Tester les parties critiques',
          priority: 'structural',
          text: 'Les parties critiques de l’app sont couvertes par des tests unitaires.',
        },
        {
          fix: 'Crée un seul module logger (debug, info, warn, error) qui écrit en console en dev et envoie à Sentry en production, puis remplace les console.log au fil de l’eau.',
          id: 'e3',
          label: 'Centraliser les logs',
          priority: 'improve',
          text: 'Tu as un logger centralisé pour l’observabilité, pas des console.log éparpillés.',
        },
        {
          command: 'npx expo lint',
          fix: 'Ajoute eslint-config-expo (ou @react-native/eslint-config) avec les règles des hooks, puis lance ESLint en CI. Sur un projet Expo, cette commande installe la config.',
          id: 'e4',
          label: 'Configurer ESLint pour React Native',
          priority: 'quick',
          text: 'ESLint est configuré avec des règles spécifiques React Native, pas la config par défaut.',
        },
        {
          command: 'maestro test .maestro/',
          fix: 'Écris un flow Maestro par parcours critique (inscription, connexion, paiement) et lance-les en CI sur chaque build de release.',
          id: 'e5',
          label: 'Couvrir les parcours critiques en E2E',
          priority: 'structural',
          text: 'Tu as des tests E2E (Maestro ou équivalent) sur les parcours critiques.',
        },
        {
          fix: 'Initialise Sentry dans un seul module (DSN, environnement, release, beforeSend) et importe tes helpers depuis ce module plutôt que d’appeler Sentry partout.',
          id: 'e6',
          label: 'Centraliser Sentry dans un seul fichier',
          priority: 'quick',
          text: 'Sentry (ou équivalent) est centralisé dans un seul fichier, pas dispersé dans le code.',
        },
      ],
      key: 'ecosystem',
      label: 'Écosystème',
    },
    {
      checks: [
        {
          fix: 'Commence par les écrans les plus chargés : useQuery remplace le trio fetch + useState + isLoading, avec le cache, le retry et le rafraîchissement inclus.',
          id: 'd1',
          label: 'Passer les appels réseau sur TanStack Query',
          priority: 'structural',
          text: 'Tu utilises TanStack Query (ou équivalent) plutôt que fetch + useState/isLoading maison.',
        },
        {
          fix: 'Remplace les booléens isLoading, isError et isSuccess empilés par un seul champ status (idle, loading, error, success). Les états impossibles disparaissent.',
          id: 'd2',
          label: 'Exposer un statut typé dans les hooks data',
          priority: 'improve',
          text: 'Tes hooks data maison (hors TanStack Query) exposent un statut typé, pas des booléens isLoading empilés.',
        },
        {
          command: 'npx orval',
          fix: 'Si ton backend expose un schéma OpenAPI, génère le client et les types avec Orval (il crée aussi les hooks TanStack Query), et relance la génération en CI.',
          id: 'd3',
          label: 'Générer le client API depuis OpenAPI',
          priority: 'structural',
          text: 'Ton client API est généré automatiquement depuis un schéma OpenAPI (Orval ou équivalent), zéro type manuel.',
        },
        {
          fix: 'Liste les actions qui doivent marcher sans réseau, garde-les dans une queue persistée et rejoue-la avec retry quand le réseau revient. Les mutations en pause de TanStack Query couvrent une partie de ce cycle.',
          id: 'd4',
          label: 'Concevoir une stratégie offline-first',
          priority: 'structural',
          text: 'Tu as une vraie stratégie offline-first avec gestion de queue et retry.',
        },
        {
          fix: 'Découpe les gros Contexts par domaine, ou passe sur un store à sélecteurs (Zustand, Jotai) pour que chaque composant ne s’abonne qu’à ce qu’il lit. Le Profiler de React DevTools montre qui re-rend.',
          id: 'd5',
          label: 'Limiter les re-renders du state global',
          priority: 'improve',
          text: 'Ton state global (Context/store) ne provoque pas de re-renders en cascade sur toute l’app.',
        },
        {
          fix: 'Baisse la précision et augmente la distance minimale quand l’utilisateur ne bouge pas (expo-location : accuracy, distanceInterval, deferredUpdatesInterval). La batterie tient plus longtemps.',
          id: 'd6',
          label: 'Adapter la précision du GPS en arrière-plan',
          priority: 'improve',
          text: 'Ton tracking GPS background (si applicable) adapte sa précision selon l’activité, pas un intervalle fixe.',
        },
        {
          fix: 'Remplace AsyncStorage par react-native-mmkv pour les préférences et le cache : les lectures sont synchrones et bien plus rapides. Garde expo-secure-store pour les tokens.',
          id: 'd7',
          label: 'Passer le stockage clé-valeur sur MMKV',
          priority: 'quick',
          text: 'Ton stockage clé-valeur pour données non sensibles utilise MMKV (ou équivalent) plutôt qu’AsyncStorage, pour des accès synchrones et rapides.',
        },
        {
          command: 'git grep -nE "(AsyncStorage|MMKV|storage)\\.set.*[Tt]oken"',
          fix: 'AsyncStorage et MMKV écrivent des fichiers en clair, lisibles dans une sauvegarde ou sur un appareil rooté. Déplace tokens et secrets dans expo-secure-store (ou react-native-keychain). Cette commande liste les endroits qui écrivent un token.',
          id: 'd8',
          label: 'Stocker les tokens dans expo-secure-store',
          priority: 'quick',
          text: 'Tes tokens d’auth et secrets sont stockés dans expo-secure-store (Keychain/Keystore), jamais dans AsyncStorage ou MMKV en clair.',
        },
        {
          fix: 'Fais passer tous les appels par un seul client qui vérifie response.ok, lève une erreur typée (réseau, 401, 5xx) et réessaie avec backoff. Un catch vide cache les pannes, à tes utilisateurs comme à toi.',
          id: 'd9',
          label: 'Gérer les erreurs réseau',
          priority: 'quick',
          text: 'Tes appels réseau vérifient response.ok, remontent des erreurs typées et gèrent les échecs (retry / backoff), pas juste un try/catch silencieux.',
        },
      ],
      key: 'data',
      label: 'Couche data',
    },
    {
      checks: [
        {
          command: 'EXPO_ATLAS=true npx expo export --platform ios',
          fix: 'Exporte le bundle avec Expo Atlas pour voir ce qui pèse, puis retire ou charge à la demande les plus grosses dépendances.',
          id: 'o1',
          label: 'Mesurer la taille du bundle JS',
          priority: 'improve',
          text: 'Ton bundle JS est mesuré et reste sous les 3MB minifié.',
        },
        {
          fix: 'Mesure le démarrage avec Flashlight sur un Android d’entrée de gamme, note le score, et refais la mesure après chaque grosse dépendance ajoutée.',
          id: 'o2',
          label: 'Mesurer le Time To Interaction',
          priority: 'improve',
          text: 'Tu mesures le Time To Interaction (Flashlight ou équivalent) plutôt que de deviner.',
        },
        {
          command: 'npx expo install expo@latest && npx expo install --fix',
          fix: 'Monte d’un SDK à la fois, sur une branche, en suivant le guide de migration de chaque version. La deuxième commande aligne les versions des librairies.',
          id: 'o3',
          label: 'Mettre à jour le SDK Expo',
          priority: 'structural',
          text: 'Tu es sur une version d’Expo SDK encore supportée (l’une des plus récentes), pas une version en fin de vie.',
        },
        {
          command: 'eas env:create',
          fix: 'Déclare tes variables par environnement (development, preview, production) avec eas env, retire les .env commités et change les secrets qu’ils contenaient : ils restent dans l’historique git.',
          id: 'o4',
          label: 'Passer les variables d’environnement sur EAS',
          priority: 'quick',
          text: 'Tes variables d’environnement sont gérées par environnement EAS, pas de .env en dur commité.',
        },
        {
          fix: 'Dans eas.json, mets cli.appVersionSource à "remote" et autoIncrement à true sur le profil production. EAS incrémente les numéros de build à ta place.',
          id: 'o5',
          label: 'Laisser EAS gérer les numéros de version',
          priority: 'quick',
          text: 'La version de l’app est pilotée à distance (remote version source), pas bumpée à la main.',
        },
        {
          command: 'npx rnsec scan',
          fix: 'Lance rnsec sur ton code et ta config native : il détecte les clés en dur et les secrets exposés. Pour aller plus loin, fais la checklist sécurité sur https://weshipit.today/react-native-security-audit.',
          id: 'o6',
          label: 'Scanner l’app avec rnsec',
          priority: 'quick',
          text: 'Tu as scanné ton app avec un outil de sécurité dédié (clés API en dur, secrets exposés…).',
        },
        {
          command: 'eas update --channel production',
          fix: 'Installe expo-updates et configure un channel par profil EAS, puis publie tes correctifs JS sans repasser par la review des stores. Un changement de code natif demande toujours un nouveau build.',
          id: 'o7',
          label: 'Livrer les correctifs JS avec EAS Update',
          priority: 'quick',
          text: 'Tu livres tes correctifs JS via EAS Update (OTA) sans repasser systématiquement par une review des stores.',
        },
      ],
      key: 'devops',
      label: 'Devops',
    },
  ],
  getVerdict,
  id: 'stack-audit',
  locale: 'fr',
  name: 'React Native stack audit',
  page: {
    cta: {
      href: '/audit',
      label: 'Découvrir l’audit complet',
      text: 'Score en dessous de 70 ? Notre équipe réalise le même audit en profondeur sur ta codebase, avec un plan d’action priorisé.',
    },
    eyebrow: 'Outil gratuit',
    form: {
      bullets: [
        'Tes points faibles classés par priorité : gains rapides, chantiers structurants, améliorations',
        'Une recommandation concrète par point, pas de généralités',
        'Pour chaque point, la commande ou le réglage à changer',
      ],
      text: 'Le détail de tes réponses, classé par impact et effort comme dans un vrai audit d’architecture, envoyé dans ta boîte mail.',
      title: 'Reçois ton rapport d’audit complet',
    },
    intro:
      '32 questions, 4 catégories, un score en 3 minutes. La grille qui sert à challenger l’architecture d’apps à des millions d’utilisateurs, transformée en checklist pour ta propre codebase.',
    resetLabel: 'Recommencer l’audit',
    title: 'Audite toi-même ta stack React Native',
  },
  priorities: [
    { key: 'quick', label: 'Gains rapides' },
    { key: 'structural', label: 'Chantiers structurants' },
    { key: 'improve', label: 'Améliorations' },
  ],
  report: {
    closing: {
      path: '/audit-gratuit',
      text: 'Refais l’audit dans 3 mois pour mesurer tes progrès :',
    },
    offer: 'Tu veux qu’on fasse l’audit complet sur ton code ?',
    subject: 'Ton audit de stack',
  },
};
