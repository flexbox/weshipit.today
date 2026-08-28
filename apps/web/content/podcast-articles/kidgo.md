# KidGo : la stack React Native d'une app offline first

Pour l'épisode 20 du Cross Platform Show, les rôles s'inversent : Ludwig prend le micro et David Leuliette, l'animateur habituel, passe sur le gril. Au menu, la stack React Native de KidGo, son application perso — "le TripAdvisor, mais juste pour les sorties avec les enfants", pensée pour les darons qui n'ont pas le temps.

Pas de théorie ici : David construit KidGo seul, le soir, avec un impératif unique — shipper. Au programme : pourquoi Expo plutôt que React Native CLI, le piège NativeWind, la synchro offline first entre Legend State et Supabase, et ses librairies "no-brainer". Un retour d'expérience brut, erreurs cryptiques et heures de debug inutiles comprises.

---

## KidGo : une app que tu utilises le moins possible

Le pitch tient en une phrase : tu es parent, tu n'as pas d'idée, il te faut une sortie maintenant. KidGo trouve les lieux où aller avec les enfants — sans browsing, sans décision à prendre.

La vision : se connecter à d'autres API comme la météo ou le calendrier, et pousser directement la bonne suggestion. "Tu peux aller au parc dans 10 minutes parce qu'il fait 15 °C. N'oublie pas un petit manteau."

> "Le but, c'est que tu utilises l'app le moins possible. Pas de watch time, contrairement à YouTube. De l'efficacité : pas de browsing, pas d'onboarding." — David Leuliette

Le design suit la même logique : minimaliste zen, noir et blanc, des emojis à la place des images, aucune animation. La V1 ship les _places_, la V2 ajoutera les _events_ ("il y a le cirque qui est arrivé en ville, profitez !"). L'app est déjà sur TestFlight.

---

## Une stack React Native choisie pour shipper vite

Projet from scratch, zéro legacy, stack evergreen : David a tout défini lui-même. Premier choix, le framework. React Native CLI ? "Non, moi je fais plus ça. En 2025, faut arrêter." Avec une nuance de senior : ça dépend du critère de succès, de la team et du budget. Mais seul et busy, pas question de gérer les certificats à la main — c'est Expo, avec la New Architecture et même Bun, "parce que why not".

Pour le styling, c'est [NativeWind](https://www.nativewind.dev/), l'implémentation de Tailwind en React Native — un choix déclenché par un précédent épisode du podcast : les LLM autocomplètent mieux du Tailwind, parce qu'ils le connaissent par cœur.

Sauf que le plan initial — une universal app avec du SEO sur le web — s'est fracassé sur la réalité : NativeWind et NativeWindUI ne fonctionnaient pas sur le web dans sa stack, avec une erreur cryptique ("importing native only module… codegen native component") impossible à attribuer à une librairie précise. La leçon que David en tire vaut de l'or :

> "Si vous voulez faire une universal app, priorité numéro un : mettre la CI, un hello world, des tests, toute la machinerie qui build à chaque PR. Sinon vous allez faire comme moi — dev hyper rapidement, puis essayer de fixer des erreurs cryptiques dont vous n'avez no fucking idea d'où elles viennent." — David Leuliette

Côté design system, rien de formel : un écran caché affichait tous les composants, avant de laisser place à Storybook — dont le setup est devenu tellement simple qu'il ne coûte presque rien.

---

## Offline first : Legend State + Supabase, la synchro qui marche toute seule

Le cœur de la stack, c'est le state management. David a tout connu — setState, Redux, GraphQL avec Apollo, React Query — et son choix actuel, [Legend State](https://supabase.com/blog/local-first-expo-legend-state), tient en deux mots : offline first.

L'anecdote fondatrice : dans un avion, David ouvre son app bancaire — "qui commence par Rev-O et qui finit par LUT" — et ses données sont là, consultables hors ligne. Depuis, toutes ses apps fonctionnent offline, une appétence qui remonte à l'époque Cordova et PhoneGap en 2015.

Sur KidGo, le backend est [Supabase](https://supabase.com/) — "pas le time, tu fais clic clic, terminé" — et Legend State s'y synchronise nativement : store en observable, persistance locale, avec un contrôle fin sur les tables à synchroniser et le nombre de retries avant d'afficher une erreur.

La preuve que ça marche ? Une heure de debug perdue pour rien. En offline, David ajoute des places, kill l'app, relance : les données sont en local, mais rien dans la base. Il se persuade que son code est cassé…

> "J'ai cherché pendant une heure pourquoi ça ne marchait pas. En fait, tout le code était bon : j'étais juste pas logué. Dès que je me suis connecté, la data est remontée toute seule." — David Leuliette

Cerise sur le gâteau, tout est typé de bout en bout. Pour ajouter les events : `supabase migration new`, le LLM génère la migration, `supabase db push`, puis `supabase gen typescript` produit les types du schéma — récupérés directement dans la synchro Legend State. TanStack Query complète le tableau pour le data fetching, même si le SDK Supabase abstrait l'essentiel des appels.

Et l'observabilité ? Pas encore de Sentry sur KidGo — pas de prod, pas d'utilisateurs, pas de besoin. Mais sur ses projets clients, comme l'app Bluetooth chez Nacon, c'est l'inverse : des loggers dans tous les sens, chaque action remontée à Sentry — le premier point qu'il vérifie dans ses audits.

---

## Les librairies no-brainer d'une stack React Native moderne

Les librairies que David recommande les yeux fermés :

- **[Fuse.js](https://www.fusejs.io/)** — une fuzzy search légère, zéro dépendance. Sur KidGo, la recherche porte sur le nom, la catégorie, la description et l'adresse, avec un score pondéré : tu tapes "museux" au lieu de "musée", ça trouve quand même. Avec moins de 1 000 enregistrements en local, inutile de sortir Algolia — et comme le state est offline, la recherche est instantanée.
- **Expo Haptics** — "car nous sommes sur un téléphone". Le retour haptique sur les micro-interactions (une action qui réussit, un update) fait partie de ces détails invisibles qu'on ne remarque qu'une fois qu'on les connaît, comme le C caché du logo Carrefour.
- **[CVA (Class Variance Authority)](https://github.com/joe-bell/cva)** — pour créer des variants avec Tailwind : `primary`, `secondary`, `ghost`, des tailles `sm`/`md`/`lg`, un default, et ton bouton s'écrit `variant="primary" size="md"` sans classes à rallonge. "Ceux qui détestent Tailwind ne sont pas assez outillés."
- **[Sonner Native](https://github.com/gunnartorfis/sonner-native)** — la librairie de toasts utilisée par Bluesky. Customisable (boutons, texte) et surtout capable de gérer une promise directement : loading, success, erreur, tout est inclus.

---

## Les leçons d'un daron qui ship en solo

Développer seul, le soir, a ses pièges — et David les documente sans se ménager. Après la migration d'Expo SDK 53 vers 54, un bug est apparu : avec Expo Router et deux tabs affichés d'entrée, la permission de localisation est demandée deux fois, comme si le layout se re-rendait. Nouveaux tabs, Liquid Glass ? Impossible à dire. Son conseil : attendre un peu avant d'adopter les nouveaux tabs — le SDK 54 lui-même n'est pas en cause.

L'autre leçon est plus universelle. Seul sur main, on enchaîne les commits, jusqu'au jour où, 15 000 changements plus tard, impossible de revenir en arrière.

> "Faites des branches. Toujours des branches, et des petits morceaux. On ne fait pas 'refactor entire universe'." — David Leuliette

Quant aux animations fancy — Moti, Rive, les micro-interactions qui "spark le joy" — elles attendront : la priorité, c'est la data et sortir la V1. La punchline de David résume l'épisode : "J'ai pas le time. Ship it."

---

## Conclusion

La stack React Native de KidGo n'est pas un catalogue de hype : chaque brique répond à une contrainte réelle. Expo parce qu'un solo dev n'a pas le temps de gérer des certificats. NativeWind parce que les LLM le complètent mieux. Legend State et Supabase parce qu'une app de parents pressés doit fonctionner dans un parc sans réseau.

Le fil rouge, c'est l'arbitrage permanent entre l'idéal et le shippable : la CI avant la vitesse quand on vise l'universal app, l'observabilité quand le besoin existe, les animations quand la data est là. Une masterclass de pragmatisme, payée en heures de debug.

---

## Key Takeaways

- **KidGo est pensée à contre-courant** : le parent doit utiliser l'app le moins possible — pas de browsing, pas d'onboarding, pas de watch time.
- **En 2025, un solo dev démarre avec Expo** : seul et pressé, gérer les certificats à la main n'a plus de sens.
- **Universal app = CI d'abord** : hello world, tests et build à chaque PR avant de coder vite, sinon les erreurs cryptiques deviennent indébuggables.
- **Legend State + Supabase rend l'offline first presque gratuit** : observables, persistance locale, retries configurables et synchro automatique au login — typé de bout en bout via `supabase gen typescript`.
- **Les no-brainer de David** : Fuse.js pour la fuzzy search locale, Expo Haptics pour les micro-interactions, CVA pour les variants Tailwind, Sonner Native pour les toasts avec promises.
- **Attention aux nouveaux tabs d'Expo Router** : depuis la migration SDK 53 → 54, la permission de localisation s'affiche deux fois — mieux vaut patienter un peu.
- **Faites des branches, même en solo** : des petits morceaux atomiques plutôt que 15 000 changements sur main dont on ne revient pas.
