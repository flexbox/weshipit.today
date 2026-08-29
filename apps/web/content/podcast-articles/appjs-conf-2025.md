# App.js Conf 2025 : ce qu'on retient de la conf React Native

Chaque année, l'écosystème se retrouve à Cracovie. App.js Conf 2025, c'était 450 personnes sur trois jours et, pour la première fois, une hacker house française à quatre. Dans cet épisode du Cross Platform Show, David Leuliette débriefe la conférence avec Ludwig Vantours, Gabriel Hofman et Matthys Ducrocq — trois développeurs mobile qui ont écumé workshops, talks et after-parties.

Le fil rouge de l'édition ? Un changement de statut. React Native ne se défend plus, il s'installe. Entre le gel officiel de l'ancienne architecture, la maturité de l'outillage Expo et les app clips qui font grimper la conversion de près de 45 %, l'année a moins été celle des annonces spectaculaires que celle de la consolidation.

---

## Jour zéro : les workshops performance et EAS

La conférence commence par une journée d'ateliers. Ludwig, David et Matthys s'inscrivent au workshop performance — première leçon, purement logistique : télécharger Xcode 16.3 **avant** d'arriver, pas sur le Wi-Fi de la salle.

Le contenu balaye large : pourquoi les FPS comptent, ce qui se passe quand on bloque le JS thread pendant une animation Reanimated, comment débugger listes et maps, comment tracer les performances sur iOS et Android. La révélation de David tient en un raccourci : `Cmd + I` pour lancer Instruments.

Deux optimisations de la nouvelle architecture ressortent nettement. **Le view flattening** : un arbre de dix vues imbriquées n'en donne parfois qu'une seule côté natif, les styles étant fusionnés. **Le re-parenting** : une chaîne parent-enfant devient une fratrie de siblings quand ça a du sens. Les deux sont appliquées out of the box, et pour s'en extraire il n'y a qu'une prop : `collapsible={false}`.

Autre point pratique : `react-native-svg` rend chaque path, cercle et rectangle comme un élément natif individuel, là où Expo Image produit un seul élément — sur un SVG massif qu'on n'anime pas, le gain est immédiat. Et sur le React Compiler, expédié en dix minutes de rab : les intervenants l'utilisent déjà en production malgré son statut expérimental, et `"use no memo"` permet de l'exclure au cas par cas.

Matthys, lui, était au workshop EAS, sur la distinction branches / channels : autant de branches qu'on veut, mais seulement trois channels — production, staging, development. Même avec l'Expo Dev Client pour switcher de branche depuis l'app, l'exercice reste confus pour les QA sans convention de nommage.

---

## La keynote d'App.js Conf 2025 : Expo change d'échelle

Charlie et John ouvrent la conférence sur une question restée en tête : à la prochaine App.js Conf, combien d'applications Expo aurez-vous sur votre home screen ? Screenshot à l'appui — plus de la moitié des apps du sien.

Derrière la blague, un vrai point d'inflexion sur les téléchargements d'Expo en 2025 et des exemples qui parlent : BlueSky numéro un sur les stores, Phantom numéro quatre, Partiful, Burger King, Discord. Cette dernière n'était pas au programme — le crew français a simplement fait du _shoulder surfing_ sur un développeur en train de bosser dessus en pleine conf.

> "Tu peux faire tourner des LLM avec React Native sur ton téléphone. On a passé un plafond de verre : on est arrivés à un stade où tout est possible." — Ludwig Vantours

L'annonce la plus structurante est arrivée là : l'ancienne architecture est officiellement **gelée**. Plus de bug reports, plus de pull requests mergées, avec pour objectif de retirer le bridge. La nouvelle architecture, elle, ouvre les propriétés CSS attendues depuis longtemps — `box-shadow`, `mix-blend-mode`, `filter`, `box-sizing`.

---

## Les outils qui changent le quotidien

**Radon IDE** a été le talk préféré de David. Le plugin transforme VS Code (ou Cursor) en véritable IDE mobile : simulateur intégré, clic sur un élément visuel qui renvoie dans le code, breakpoints, et les outils de debug — React Query, network, console logs — au même endroit. Ludwig l'utilise au quotidien : aussi productif qu'Xcode, sans jongler avec un onglet Chrome.

**Evan Bacon** a présenté Expo Router v5 et la direction prise par Expo : devenir une plateforme serveur, avec variables d'environnement, API routes, server functions et `eas deploy` — un all-in-one façon Heroku.

**Legend List**, par Jay — ancien développeur de jeux sur Nintendo Wii — aborde le rendu de listes avec une obsession de la performance. **Expo UI**, présenté avec la métaphore du _pit of success_, propose des composants réellement natifs via un mapping vers SwiftUI et Jetpack Compose.

---

## App clips et qualité perçue : le vrai différenciateur

Le talk de **Partiful** sur les app clips a produit le plus gros effet wow. L'app sert à créer un événement et à inviter ses amis ; le problème était la conversion des invités qui ne l'ont pas installée. La solution : un SMS dont le lien déclenche un app clip — une prévisualisation réduite avec l'événement affiché, et une invitation à installer seulement au moment d'interagir. Résultat : près de 45 % de conversion en plus, 47 % d'usage et 23 % de téléchargements supplémentaires.

> "Tu peux goûter à l'application sans forcément passer par l'App Store. Le chemin pour installer une application a été tellement réduit qu'on en arrive à un tap." — Ludwig Vantours

Gabriel nuance : le use case reste spécifique, mais l'idée d'une preview avant téléchargement se transpose — Frank d'Infinite Red imaginait déjà l'équivalent pour une app de fitness.

Même logique côté interface avec le talk _Building Mobile Apps with Premium Feel and Quality UX_ : une dizaine de conseils pour éviter le syndrome du « website in a box » — design non unifié, conventions de plateforme ignorées, modal qu'on ne peut pas fermer en glissant vers le bas, gestures approximatives.

---

## IA : faire un plan avant de prompter

Raphaël, de Ground Control, a ouvert le deuxième jour sur son workflow de développement assisté par IA. Sa catch phrase a fait le tour de la salle :

> "Don't vibe code on a code base worth millions of dollars — instead, create a plan." — Raphaël

Concrètement : un échange en mode chat qui se termine par la génération d'un `plan.md` listant les étapes, puis seulement ensuite un mode agent qui implémente ce plan. On pilote la génération de code au lieu de la subir. Même logique pour la review : `gh pr view` et `gh pr diff` dans le prompt, et l'IA produit un `pr-review.md` résumant les changements fichier par fichier. Sa métaphore de clôture : on a tous reçu des Lamborghini, il reste à apprendre à ne pas les envoyer dans le mur.

Le talk de Bolt disait la même chose autrement : ils font du vibe coding, et recrutent de bons développeurs JavaScript.

---

## App.js Conf 2025 : les talks techniques qu'on n'attendait pas

- **Granite**, un framework de brownfield integration né en Corée, pour intégrer React Native dans une app native faite d'une constellation de micro-applications. Contre un bundle monolithique lent au démarrage : tree shaking via ESBuild (Metro ne le supporte pas), micro-bundles chargés à la demande, OTA ciblées par micro-application.
- **Mistral**, présenté par Delphine Bugner : le `fetch` de React Native ne supporte pas le streaming out of the box, bloquant pour un chat IA — la donnée arrivait encodée puis décodée au lieu d'être reçue directement. Solution : un polyfill, et l'implémentation d'Expo.
- **La sécurité mobile**, avec l'idée d'un _secure core_ : un module natif autour d'Expo Secure Store qui expose auth, storage et network au JavaScript via des allers-retours contrôlés — le natif étant compilé en binaire là où le JavaScript reste inspectable.
- **RevenueCat**, et la statistique retenue par Ludwig : les apps React Native rapportent plus que les natives.

Le talk de clôture, _Keyboard Management Evolution_, a retracé dix ans de galère : `KeyboardAvoidingView` en 2015, `react-native-keyboard-aware-scroll-view` en 2017 pour les formulaires, `react-native-keyboard-manager` en 2018 pour la toolbar, `react-native-avoid-softinput` en 2021, et enfin `react-native-keyboard-controller` en 2022 qui unifie tout.

> "En 2015, on était capables d'envoyer une fusée sur la lune avec du JavaScript. Par contre, afficher correctement un clavier et gérer le focus, ça, on ne savait pas faire." — Ludwig Vantours

---

## Conclusion : les prédictions pour l'année prochaine

Chacun s'est mouillé. David parie sur la fin du débat UI library : tout le monde utilisera NativeWind, parce que les LLM sont bons avec Tailwind. Ludwig table sur une généralisation des server side components. Gabriel anticipe un afflux d'apps plus ou moins qualitatives sur les stores, avec la qualité d'exécution comme seul différenciateur. Matthys veut déployer une app Expo depuis son téléphone.

Ce que raconte App.js Conf 2025, c'est le passage d'un écosystème qui prouvait sa légitimité à un écosystème qui l'a acquise. La question n'est plus « est-ce faisable en React Native » mais « comment le faire proprement » — d'où des talks sur les micro-interactions, le streaming et la sécurité plutôt que sur les fondations. Les fondations, elles, sont désormais gelées et assumées.

---

## Key Takeaways

- **L'ancienne architecture React Native est gelée** : plus de bug reports ni de PR mergées, le retrait du bridge en ligne de mire.
- **Le view flattening et le re-parenting sont automatiques** ; `collapsible={false}` est la seule porte de sortie.
- **Le React Compiler tourne déjà en production** chez certaines équipes ; `"use no memo"` exclut un composant au cas par cas.
- **Les app clips restent sous-exploités** : Partiful annonce près de 45 % de conversion en plus sans passage par l'App Store.
- **Le workflow IA gagnant passe par un `plan.md`** : chat pour planifier, agent pour exécuter — jamais de vibe coding brut sur une code base critique.
- **Radon IDE et Expo UI marquent la maturité de l'outillage** : debug intégré dans VS Code, composants mappés sur SwiftUI et Jetpack Compose.
- **Pour le clavier, une seule réponse** : `react-native-keyboard-controller`, qui unifie dix ans de librairies concurrentes.
