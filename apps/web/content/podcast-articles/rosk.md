# Stack React Native en production : les choix de Rosk

Il y a les articles qui comparent React Native et Flutter, et il y a les équipes qui maintiennent une app en production depuis 2017. Thibault Malbranche est dans la deuxième catégorie : lead mobile chez Rosk (ex-Brigad), mainteneur de `react-native-webview`, l'un des rares développeurs français impliqués dans les releases du core. Dans cet épisode du Cross Platform Show, David Leuliette lui demande de démonter sa stack React Native en production couche par couche — data, navigation, styling, graphique, release. Un inventaire sans posture, avec une thèse en filigrane : l'open source se mesure en heures de debug économisées.

---

## D'Epitech à mainteneur de react-native-webview

Le parcours de Thibault est collé à celui de sa boîte. Pour son projet de fin d'études à Epitech, son groupe s'associe aux entrepreneurs qui lancent Brigad : trois fondateurs, six étudiants, une équipe tech complète dès le premier jour. Le CTO avait testé React Native quand la lib ne supportait qu'iOS, et le pari est pris — sur du 0.41 ou 0.42, « celui qui était un peu moins fun qu'aujourd'hui ». La première app mobile ? Un login et une WebView sur le site web.

Cette WebView vit alors dans le core de React Native, et elle est cassée : impossible d'uploader des fichiers, impossible d'injecter des scripts. Thibault agrège les forks existants et en fait sa propre version. Quand Meta lance le _lean core effort_ — sortir du core tout ce que Facebook n'utilise pas — la WebView est le premier package extrait, et il hérite du bébé. Le reste est une histoire de timing : un message de [Lorenzo Sciandra](https://github.com/kelset), un Discord de core contributors dont il devient admin, et un Hackintosh maison qui builde React Native from source en cinq minutes là où un portable met une heure. Tester une release lui prend un dixième du temps des autres.

Côté produit, Brigad apportait de la simplicité dans un secteur où le recrutement se fait encore au téléphone. Après le Covid et un second vertical — la santé — l'équipe change de modèle : Rosk pose cette simplicité sur du travail temporaire, avec une communauté et un profil professionnel pour les métiers hors tech. Ordre de grandeur pour la suite : sept à huit personnes qui codent, plusieurs mises en production par jour.

---

## La data layer d'une stack React Native en production : GraphQL et Apollo

Le back est une fédération de microservices exposée par une seule gateway. Côté client, c'est [Apollo](https://www.apollographql.com/) pour le state management **et** le data fetching, depuis le début. Pas de Redux : du React context quand il faut faire circuler quelque chose, `useSyncExternalStore` sinon.

Apollo gère son cache tout seul et l'app repart sur des données offline au reboot, mais l'argument principal est ailleurs : la codegen. Le back écrit le schéma GraphQL, ça lui génère son TypeScript ; le front écrit ses queries, la codegen fait le reste. La data arrive typée dans le composant, et l'accord entre les deux se vérifie à la compilation, pas en production.

Cette chaîne de types explique les deux librairies recommandées en premier : [type-fest](https://github.com/sindresorhus/type-fest) (les utility types que TypeScript n'a pas) et [ts-pattern](https://github.com/gvergnaud/ts-pattern), du pattern matching typé. Chez Rosk, les erreurs GraphQL ne sont pas des 400 : ce sont des 200 dont le `__typename` porte le type d'erreur. Avec ts-pattern, si le back ajoute un type d'erreur, le front ne compile plus.

---

## Navigation : Expo Router en test, React Navigation en filet

Rosk a fait le tour : react-native-navigation (Wix), React Navigation, et aujourd'hui Expo Router sur la nouvelle app — en test, avec un retour arrière chiffré à une journée. « C'est la même techno en dessous. »

> « Je trouve que ce n'est pas aussi magique que ce que les gens aiment le dire. Ça fait super bien une app de deux pages, et super bien plein de trucs de base. » — Thibault Malbranche

Les limites apparaissent sur les flows complexes, et Rosk en a : l'utilisateur doit voir la valeur de l'app avant de s'inscrire, donc l'authentification démarre depuis n'importe quel écran, dans une modal dismissable contenant une stack. Il faut aussi reprendre un flow à l'étape 5 sur 10 — avec les écrans 1 à 4 empilés derrière, pour que le retour fonctionne. Expo Router ne sait pas faire ça : on lui donne une URL source, pas une pile. On tombe dans du `navigation reset` non typé, exactement ce qu'on ne veut pas maintenir. Autre exemple : jusqu'à récemment, l'universal linking app killed ramenait l'utilisateur sur la home. Le genre de bug qui casse une campagne newsletter entière.

---

## Styling : un design system qui absorbe les évolutions de React Native

La réponse va décevoir : `StyleSheet`, et rien d'autre — du CSS avec SASS et des CSS Modules côté web, parce qu'il est difficile de faire plus performant. Mais la vraie décision est ailleurs : personne chez Rosk n'écrit de style. On importe une `Box`, une `Stack`, on lui passe une shadow de type `high` et un background de type `info`. Le design system est bâti sur les primitives de plateforme, avec une résolution `box.web` / `box.native` — la même approche que React Native Web — vérifiable côte à côte dans Storybook. Un composant qui n'utilise que le design system tourne partout, et rend le résultat _approprié à la plateforme_ : une bottom sheet sur mobile, un drawer sur web.

Le bénéfice se voit quand l'écosystème bouge. Thibault a harcelé Meta pendant des mois pour faire merger `gap` en Flex — avant, il fallait wrapper chaque enfant pour gérer un espacement.

> « Le jour où ils ont mergé flex gap, on a divisé notre nombre de views dans l'app par deux. On n'a rien eu à changer d'autre que l'implémentation de notre design system. » — Thibault Malbranche

Quand Strict DOM arrivera, les fichiers `.native` et `.web` disparaîtront de la même manière, sans que la code base bouge.

Côté animation, la réponse tient en un mot : **Reanimated**, avec **Skia** par-dessus pour les gradients. Ceux qui s'animent au scroll sont impeccables sur iOS ; sur Android bas de gamme, c'est encore expérimental.

---

## Release : la stack React Native en production côté build

Depuis 2017, tout était fait maison : Fastlane, des scripts internes, un Mac dans le cloud, drone CI. Rosk a été l'occasion de tout reprendre — GitHub Actions et EAS Build, avec des OTA gérées par expo-updates après des années de CodePush. Le verdict sur EAS est honnête : builds un peu lents, mais puisque Expo facture au build, son seul incentive est de les accélérer pour ne pas payer le compute.

La vraie trouvaille, c'est le **remote build cache**. On build en local, le build est uploadé chez Expo, et quand un collègue lance son app, le CLI vérifie s'il existe un build correspondant et le télécharge. Détail important : le fingerprint par défaut n'étant pas encore fiable, Thibault l'a remplacé par « version de l'app + plateforme ». Résultat : plus personne dans l'équipe ne build, et l'app démarre en vingt secondes, serveur compris.

Deux dépendances sous-cotées au passage : [react-native-fast-shadow](https://github.com/alan-eu/react-native-fast-shadow), signée Alan, qui donne des shadows façon iOS sur Android — qui n'expose nativement que l'élévation — sans démolir les performances, et **MMKV** pour ceux qui sont encore sur AsyncStorage. Sur le débat FlatList / FlashList / LegendList : tant que ça ne lag pas en prod, pourquoi changer ?

---

## L'open source comme avantage compétitif

Le fil rouge de l'épisode n'est pas une librairie, c'est un calcul. Thibault soigne ses bug reports : reproduction minimale, template officiel React Native quand le bug est dans le core, projet Expo Go ou Snack pour que le mainteneur vérifie depuis son téléphone. Cette rigueur n'est pas de la politesse : ces gens maintiennent leurs librairies le soir et le week-end, gratuitement. Lui-même admet ne presque jamais lire les issues de la WebView, sauf quand on le ping.

> « Tout le temps que je passe à faire de l'open source, je le récupère au centuple quand j'ai un bug sur mon app en prod. » — Thibault Malbranche

Un DM à la bonne personne, un report qu'on sait valide, et une semaine de debug devient une heure. L'investissement de la boîte — du temps humain — est largement rentabilisé : le dev débloque plus vite, et il reste plus longtemps parce qu'il s'épanouit. Avec un garde-fou : forcer quelqu'un à faire de l'open source est le meilleur moyen de le dégoûter.

---

## Conclusion

Cette stack n'est pas une liste de librairies à la mode. C'est une petite équipe qui ship plusieurs fois par jour parce qu'elle a construit les bonnes couches d'abstraction : un design system qui encaisse les évolutions du framework, une codegen qui rend les incompatibilités impossibles à ignorer, un cache de build qui supprime une étape du quotidien. Le reste est testé plutôt que cru sur parole — et l'iPhone 6S du bureau continue de trouver les paddings oubliés.

---

## Key Takeaways

- **Apollo et GraphQL couvrent state management et data fetching** : la codegen aligne front et back avant la prod.
- **ts-pattern + erreurs GraphQL typées** : si le back ajoute un type d'erreur, le front ne compile plus.
- **Expo Router excelle sur les cas simples**, mais ne sait pas initialiser une pile d'écrans arbitraire.
- **Un design system posé sur les primitives** absorbe les évolutions du framework : flex gap a divisé par deux le nombre de views.
- **Le remote build cache d'Expo supprime les builds locaux de l'équipe** — à condition de fiabiliser le fingerprint.
- **`react-native-fast-shadow` et MMKV** restent deux dépendances sous-cotées.
- **L'open source se rentabilise en heures de debug** : un bug report irréprochable transforme une semaine de galère en un message direct.
