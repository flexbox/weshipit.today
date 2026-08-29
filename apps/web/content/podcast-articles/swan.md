# Librairies React Native : 8 ans de maintenance open source

Derrière la moitié des `npm install` d'un projet React Native, il y a un mainteneur bénévole. Mathieu Acthernoene — [Zoontek](https://github.com/zoontek) sur GitHub — en est un : cinq librairies React Native actives, dont `react-native-localize`, `react-native-bootsplash`, `react-native-permissions` et `react-native-edge-to-edge`. Le jour, il est staff engineer chez [Swan](https://www.swan.io/), une startup parisienne de banking-as-a-service.

Dans cet épisode du Cross Platform Show, David Leuliette le fait parler de ce qu'on voit rarement : comment on écrit un module natif aujourd'hui, pourquoi une bonne partie de l'écosystème casse le mode edge-to-edge d'Android 15, et à quel moment une équipe a intérêt à arrêter d'installer pour se mettre à construire.

---

## De Titanium à React Native 0.15 : comment on devient mainteneur

Après un DUT informatique à Calais en 2009, Mathieu rejoint Colisweb, une startup lilloise de livraison du dernier kilomètre. L'app tourne sous Titanium — un legacy que personne n'ose toucher : « ça tournait miraculeusement, mais si on faisait la moindre modification on n'arrivait même pas à builder l'app ». Les livreurs étant tous sous Android, l'équipe attend la toute première version de React Native compatible Android — la 0.15 — et se lance. C'était il y a huit ans.

La première librairie arrive en 2017 : Mathieu veut ajouter un polyfill de `Navigator.languages` au cœur de React Native, pour traduire les apps selon les préférences de langue du device. Réponse de l'équipe : le besoin est compris, mais le core est déjà bien chargé. Ce sera donc une lib.

> "J'avais bossé quasiment une semaine sur juste la PR pour la codebase de React Native. Je n'avais aucune connaissance, ni en Java ni en Objective-C — une semaine pour un truc qui retournait juste un tableau de strings." — Mathieu Acthernoene

Ses builds passent aujourd'hui par [Builder Bob](https://github.com/callstack/react-native-builder-bob), le scaffold de Callstack. Le code natif reste en Objective-C++ côté iOS — faute de doc solide sur les modules en Swift — et en Kotlin côté Android.

---

## Turbo modules ou Nitro : quelle base pour un module natif ?

Écrire un module natif aujourd'hui, c'est écrire des **turbo modules**. Le principe : on déclare des signatures de types en TypeScript, la **codegen** de React Native passe dessus et génère une interface Kotlin et une interface Objective-C. Il ne reste plus qu'à implémenter les méthodes. Avantage décisif : on peut faire des appels synchrones vers le natif, sans repasser par une promesse.

Puis Marc Rousavy est arrivé avec **Nitro**. Ses besoins sur Vision Camera — analyse d'image en temps réel avec TensorFlow — dépassaient ce qu'encaissent les turbo modules. Nitro s'appuie sur JSI et va plus loin en performance, mais il a un coût : l'utilisateur final doit installer une dépendance native supplémentaire. Pour un splash screen ou des permissions, Mathieu ne franchit pas le pas.

Sa philosophie d'API suit la même logique. Deux écoles cohabitent : exposer toutes les options de chaque plateforme, ou masquer la complexité. Lui vise trois voire quatre plateformes, cherche le socle commun et ajoute une couche d'abstraction au lifecycle unifié — pour que quelqu'un à qui on donne deux jours n'ait pas à apprendre comment on gère les permissions sur iOS puis sur Android.

---

## Edge-to-edge : le chantier Android 15 qui va tomber sur toutes les apps

C'est le sujet sur lequel il insiste le plus. Depuis Android 15, passer le `targetSdk` à 35 réactive de force le mode **edge-to-edge** : l'application passe sous la status bar et sous la navigation bar. En React Native, la plupart des devs mettaient déjà la status bar en translucent — quasiment personne ne le faisait pour la navigation bar.

Le vrai problème n'est pas la migration, c'est l'écosystème : la plupart des librairies React Native n'ont jamais été pensées pour l'edge-to-edge, et beaucoup utilisent une API qui le casse.

> "Tu veux ton app en edge-to-edge, tu fais un npm install d'une lib et boum, d'un coup tu as à nouveau ta status bar et tu ne comprends pas pourquoi. Sans aucune connaissance en natif, je te laisse imaginer à quel point le debug peut être douloureux." — Mathieu Acthernoene

D'où `react-native-edge-to-edge`, doublée d'une librairie de détection qu'il a fait adopter un peu partout : six à huit mois de travail, une série de pull requests sur les librairies fautives, et de la sensibilisation en conférence pour que les mainteneurs testent leur lib dans ce mode.

La deadline stores est fixée à fin août 2025. Un attribut permet de désactiver temporairement le comportement forcé, mais Mathieu déconseille de compter dessus — d'autant que la migration simplifie les choses : le comportement s'unifie avec iOS et les conditions de styling disparaissent.

---

## Les librairies React Native qu'un mainteneur recommande

Question rituelle de l'épisode, sans citer les siennes.

- **[react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller)** — un must sur Android, où la gestion native se limite à `adjustResize` et à son saut disgracieux à l'ouverture du clavier. Il s'appuie sur les API disponibles depuis Android 12 pour un comportement proche d'iOS : un input de chat qui suit le clavier élégamment.
- **[React Navigation](https://reactnavigation.org/)** — Mathieu n'est pas fan des routeurs file-based : en TypeScript, il préfère ne pas dépendre d'un plugin qui génère les correspondances entre fichiers. Et de toute façon, Expo Router est du React Navigation à 100 % en dessous. La nouveauté qui l'intéresse en v7 : passer une fonction à un navigateur pour conditionner les écrans, ce qui évite de dupliquer la logique d'authentification entre deux stacks.
- **[react-native-screens](https://github.com/software-mansion/react-native-screens)** — la brique de Software Mansion qui fournit de vrais écrans natifs là où tout était reproduit côté JavaScript. Avant, transitions et gestes rendaient « un peu off » ; depuis, ils se comportent comme dans une app native.
- **[react-native-unistyles](https://github.com/jpudysz/react-native-unistyles)** — media queries, thèmes et insets conditionnables directement dans la stylesheet. Surtout rentable dès que l'app tourne aussi sur iPad.
- **[react-native-macos](https://github.com/microsoft/react-native-macos)** — le travail de Microsoft, largement sous-estimé : même simplicité d'initialisation, mais pour du desktop. C'est utilisé dans Office.

---

## Quand créer ses propres librairies React Native devient rentable

Chez Swan, la réponse à un outil qui devient douloureux est toujours la même : l'absorber. L'API est full GraphQL, avec une exigence de type safety de bout en bout. Après Apollo puis urql, l'équipe a écrit **son propre client GraphQL**. La raison est concrète : les clients existants exigent l'introspection complète du schéma pour résoudre leur cache. Sur une API bancaire, ce schéma est énorme — et les bundles JavaScript deviennent infernaux. Leur client offre les mêmes capacités pour environ 3 Ko.

Même logique pour le reste : **Chicane**, un routeur type-safe maison né des template literal types de TypeScript, à une époque où TanStack Router n'existait pas. **[swan-io/css](https://github.com/swan-io/css)**, un CSS-in-JS hybride pensé comme un drop-in replacement de la StyleSheet API pour sortir progressivement de react-native-web. Et **[Lake](https://github.com/swan-io/lake)**, leur design system open source.

> "Tu vas allouer deux semaines, peut-être. Mais après, tu contrôles les releases, tu contrôles les features. C'est un vrai luxe." — Mathieu Acthernoene

Tout est open source par défaut, jusqu'à `swan-partner-mobile`, l'app de démo publiée sur les stores pour des raisons réglementaires. Swan étant en marque blanche, il n'y a aucun branding à protéger : un client peut garder la logique et plaquer son propre design system.

Le prérequis est évident : 80 développeurs et un horizon long. En freelance, on ne prend pas une semaine pour concevoir un routeur custom.

---

## Débugger le natif : Android Studio, et l'IA avec parcimonie

Son conseil pour progresser en debug Android tient en une ligne : installer Android Studio. Pas glamour, mais le **layout inspector** a été son life saver sur tous les problèmes d'edge-to-edge, parce qu'il donne accès à l'arbre de vues natif au lieu d'avancer à tâtons avec des `console.log`. Sur un projet Expo, un `npx expo prebuild` suffit à générer les dossiers natifs et à ouvrir le projet dans l'IDE. Côté matériel, il achète des Pixels : les API natives y sont correctement implémentées.

Sur l'IA, il est net : en mode chat pour se faire expliquer des concepts, oui ; en autocomplete, non. « La plupart du temps il hallucine, ou il produit des trucs qui marchent — mais c'est l'équivalent du no-code. »

---

## Conclusion

Ce qui relie tout l'épisode, c'est un même réflexe : comprendre la couche du dessous. Écrire une librairie apprend à faire une release proprement. Écrire un routeur permet ensuite de migrer vers n'importe quel autre, parce qu'on sait comment ça fonctionne derrière — seule la syntaxe change. Et savoir lire un arbre de vues Android permet de piloter un chantier comme l'edge-to-edge au lieu de le subir.

S'il démarrait une app aujourd'hui, Mathieu partirait d'ailleurs sur du bare React Native — avec le pipeline de build d'Expo, mais un accès immédiat aux dossiers `android` et `ios`.

---

## Key Takeaways

- **Les turbo modules suffisent dans l'immense majorité des cas** : Nitro est plus performant, mais impose une dépendance native supplémentaire à vos utilisateurs.
- **Une bonne API de librairie masque la plateforme** : viser le socle commun permet de shipper sans apprendre les spécificités de chaque OS.
- **L'edge-to-edge d'Android 15 est un chantier d'écosystème** : beaucoup de librairies le cassent à l'installation, deadline fin août 2025.
- **Cinq librairies React Native à connaître** : keyboard-controller, React Navigation, react-native-screens, unistyles et react-native-macos.
- **React Navigation v7 simplifie les flows d'authentification** en conditionnant les écrans via une fonction, au lieu de dupliquer la logique entre deux stacks.
- **Construire son propre outillage devient rentable sur le long terme** : un client GraphQL de 3 Ko contre des bundles inutilisables, si on a l'équipe pour le porter.
- **Le layout inspector d'Android Studio vaut mieux que tous les `console.log`** dès qu'un bug touche à la couche native.

---

**David Leuliette** → [Twitter](https://x.com/flexbox_) · [BlueSky](https://go.bsky.app/6QQemwz) · [weshipit.today](https://weshipit.today/)

**Mathieu Acthernoene** → [BlueSky](https://bsky.app/profile/zoontek.me) · [GitHub](https://github.com/zoontek)
