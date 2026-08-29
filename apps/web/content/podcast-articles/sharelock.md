# React Native et Bluetooth : 5 ans d'app en production

Faire dialoguer une app React Native avec un cadenas connecté posé sur un potelet de trottoir, c'est le genre de projet où le Bluetooth décide de votre planning. Adnan Aita, CTO et co-fondateur de ShareLock, vit avec cette contrainte depuis cinq ans. Son app companion a d'abord servi à déverrouiller des cadenas partagés, avant de devenir la brique centrale d'une offre d'assurance vélo qui compte 20 000 assurés actifs.

Dans cet épisode du Cross Platform Show, David Leuliette dissèque avec lui une stack qui n'a rien d'un projet greenfield : React Native 0.71, Redux Toolkit, NativeBase, une CI sur un Mac mini d'occasion, et huit personnes en tech qui n'ont même pas un temps plein sur le mobile.

---

## Des cadenas connectés à l'assurance vélo

Le point de départ de ShareLock est un constat simple : le frein principal au vélo en ville, c'est le vol et la peur du vol. La réponse logique, c'est du stationnement sécurisé — sauf que ça demande du génie civil. L'équipe conçoit donc des cadenas partagés qui s'installent sur les potelets déjà présents en bord de route, sans toucher à la chaussée : près de 800 à Nice, quelques villes d'Île-de-France, mais pas Paris. Le modèle coince — ShareLock porte le CAPEX et se rembourse sur les abonnements, or les cyclistes déjà équipés de quatre antivols ne paieront jamais pour du stationnement. Quatre ans plus tard, les cadenas passent au second plan et l'assurance devient le cœur du produit.

---

## Pourquoi React Native plutôt que deux apps natives

Adnan n'avait jamais fait de cross-platform avant ShareLock : un peu de Swift, un peu de Kotlin. Le choix tient en trois mots.

> "C'est pas cher. Aujourd'hui, l'intérêt de faire du natif, du Swift ou du Kotlin, est quand même relativement limité." — Adnan Aita

Sur l'argument des performances, il est catégorique : 95 % des problèmes reprochés à React Native n'ont rien à voir avec React Native. Ce sont 30 000 requêtes envoyées au serveur, des `useEffect` dans tous les sens qui re-render constamment les vues, ou une pile de navigation où modifier l'écran du dessus déclenche des effets sur tous les écrans en dessous — y compris ceux qui ne sont pas affichés. L'autre bénéfice est organisationnel : le front web étant en React, les mêmes développeurs livrent la feature sur les deux plateformes.

> "Ne pas utiliser aujourd'hui une technologie qui permet de faire à la fois iOS et Android, je trouve ça d'une stupidité incroyable." — Adnan Aita

---

## React Native et Bluetooth : la race condition du cadenas

C'est le bug qui a coûté le plus de nuits blanches. De manière parfaitement aléatoire, le cadenas refusait de s'ouvrir. Problème mécanique ? Électronique ? L'équipe change des dizaines de choses, sans rien trouver.

Le protocole est pourtant clair : le backend envoie un payload chiffré au téléphone, l'app le découpe en cinq à dix messages Bluetooth, le cadenas le reconstitue, le déchiffre, vérifie la signature et s'ouvre. La boucle d'envoi est triviale : tant qu'il reste des messages, envoie-les. Sauf que la librairie Bluetooth ne les envoyait pas forcément dans l'ordre, malgré les `wait`. Sur un device standard, la couche BLE gère des index et réordonne les paquets à l'arrivée — mais le cadenas est un device propriétaire, bricolé maison, d'abord sur ESP32 puis sur une puce nRF.

> "On a fini par faire quelque chose d'horrible que je recommande à personne : on a rajouté un sleep de 15 ms pour lutter contre la race condition." — Adnan Aita

Le Bluetooth a aussi écarté Expo à l'époque : le BLE n'y fonctionnait pas.

---

## Redux Toolkit, SDK maison et monorepo

La stack data n'a pas bougé depuis 2020 : Redux Toolkit. Et pour Adnan, l'erreur classique est de le voir comme un simple state manager. Ce qui l'intéresse, c'est la boucle de feedback entre actions et états, qui déporte 95 % des traitements asynchrones hors des composants React. Toutes les interactions Bluetooth du téléphone sont ainsi des actions Redux.

Le data fetching passe lui aussi par Redux, qui appelle un SDK maison partagé avec le web : personne n'écrit jamais de requête HTTP dans le code mobile. Si une route change, on modifie le SDK, ni les actions ni les reducers. Tout vit dans un monorepo passé de Lerna à pnpm, qui héberge aussi le C du firmware embarqué et le Python des lambdas AWS.

Côté navigation, React Navigation avec des stack navigators — et un aveu. Trois navigateurs distincts chapeautés par un navigateur racine, une décision que le recul condamne : passer de l'un à l'autre oblige à détricoter la pile puis à la restituer pour que le `go back` fonctionne.

---

## La dette technique quand personne n'est à plein temps sur le mobile

L'app tourne en 0.71, et Apple impose désormais le build avec le SDK 18. Verdict côté React Native : la 0.71 n'est plus maintenue, débrouillez-vous.

Le chiffrage est instructif. Le passage de 0.68 à 0.71 avait pris un mois. La tentative vers 0.74, six mois plus tôt, donnait 95 % d'un truc qui marche en une après-midi — avant de buter sur un conflit Reanimated / React Native Screens qui cassait le `onClick`, avec une issue GitHub à 250 commentaires toujours pas résolue.

Deux autres chantiers attendent : NativeBase, qu'Adnan ne recommanderait plus aujourd'hui, et React Native Vision Camera, dont le passage de V2 à V3 est une réécriture complète. Sa méthode pour choisir une librairie reste simple : combien de gens s'en servent, est-ce que c'est maintenu, et un tour sur Snyk. Embarquer Lodash pour une seule fonction est un automatisme à interroger.

---

## Une CI React Native sur un Mac mini d'occasion

Pour builder du iOS, il faut du Mac, et en louer dans le cloud coûtait une fortune. La solution ShareLock : un GitLab Runner installé sur un Mac mini acheté d'occasion, qui fait tourner les pipelines mobiles avec Fastlane. Seul irritant : le téléchargement des certificats PEM pour les push notifications ne passe pas avec la seule clé API Apple. Il faut que quelqu'un au bureau vienne valider le MFA physiquement sur le Mac mini — et ça tient ensuite une semaine.

Le pipeline distingue deux applications par plateforme : une staging distribuée via TestFlight et la Closed Beta Android, et une prod alimentée par la branche master. La livraison est automatisée, mais le dernier clic reste manuel pour que l'app, le backend et les lambdas basculent ensemble.

---

## VigiMap : cartographier le risque de vol rue par rue

La feature la plus emblématique s'appelle VigiMap : une carte du risque de vol, rue par rue, calculée par ShareLock à partir de ses propres sinistres — anonymisée, sans contribution des utilisateurs pour éviter les fausses déclarations. Le proto a pris trois semaines, la version fluide trois mois. Le mur est classique : avec quelques données de POC la carte circule bien ; à l'échelle d'une ville, il faut attendre trois minutes après chaque déplacement du point. La solution ressemble à ce que faisait Google Maps il y a dix ans : une clusterisation avec cache en local storage, rendu direct si le cluster est déjà là — plus on utilise l'app, plus elle est fluide.

---

## Ce que React Native ne teste pas pour vous

Le terrain réserve des surprises qu'aucun émulateur ne reproduit. Sentry est l'outil le plus précieux de la stack : récupérer les stack traces d'utilisateurs équipés de téléphones introuvables, quand on n'a que cinq modèles au bureau, change tout. L'équipe est même allée jusqu'à acheter le téléphone d'un utilisateur — les fermes de devices cloud ne répondent pas quand on teste du Bluetooth.

Autre angle mort : les tailles de police. Forcer la fonte pour que la mise en page n'explose pas est confortable pour le dev et pénible pour l'utilisateur, qui n'ouvrira plus l'app. Restent les diffs de plateformes : background location fiable sur iOS et aléatoire sur Android, permissions à gérer version de SDK par version de SDK.

---

## Conclusion

Ce que raconte ShareLock, ce n'est pas une stack idéale, c'est une stack tenue. Le choix de React Native n'a jamais été un pari technologique mais un arbitrage économique : une équipe, deux plateformes, un SDK partagé avec le web. Le prix est visible — une 0.71 à rattraper, une librairie UI à remplacer, une navigation à remettre à plat — mais il reste inférieur au coût de deux apps natives maintenues en parallèle. Le vrai fil rouge est ailleurs : livrer des features incomplètes et volontairement cachées, puis itérer jusqu'à ce que ça marche.

---

## Key Takeaways

- **Le Bluetooth en React Native ne garantit pas l'ordre d'envoi des paquets** : sur un device propriétaire qui ne réordonne rien, un payload chiffré découpé arrive dans le désordre.
- **Redux Toolkit ne sert pas qu'au state management** : les interactions Bluetooth sont des actions Redux, ce qui sort 95 % de l'asynchrone des composants React.
- **Un SDK maison entre web et mobile évite de mutualiser le store** : quand une route change, on modifie le SDK, pas les actions ni les reducers.
- **Splitter la navigation en plusieurs navigateurs coûte plus qu'il ne rapporte** : détricoter puis restituer la pile pour gérer un `go back` fait plus de dégâts qu'une navigation à plat.
- **Une CI iOS tient sur un Mac mini d'occasion** avec GitLab Runner et Fastlane, au prix d'un MFA Apple à valider à la main chaque semaine.
- **La dette de version se paie en semaines** : 0.68 vers 0.71 a pris un mois, et la tentative vers 0.74 a buté sur un conflit Reanimated / React Native Screens.
- **Les cas limites utilisateurs cassent plus d'apps que les frameworks** : polices géantes, background location Android capricieuse, permissions SDK par SDK.
