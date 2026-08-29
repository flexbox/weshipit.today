# React Native web : une app sport sur iOS, Android et web

Une app mobile qui tourne aussi dans le navigateur, ça reste souvent une promesse de slide. Baptiste Lecocq, développeur indépendant et créateur de **Pacevisor**, en a fait son canal de distribution : grâce à React Native web et Expo, un seul écran de son app est embarqué en widget sur plus d'une centaine de sites de courses à pied.

Dans cet épisode du Cross Platform Show, David Leuliette reçoit Baptiste pour décortiquer la stack d'une plateforme d'analyse sportive qui dépasse les 30 000 utilisateurs — construite seul, sur Ignite, avec un budget d'hébergement proche de zéro. Au programme : pourquoi il a tout rebooté après quatre ans, comment il a sorti sa logique métier de MobX, et quelles librairies font le travail sur du GPX.

---

## De convertisseur d'allure à plateforme d'analyse de course

Pacevisor n'a pas commencé comme une plateforme. En 2020, c'est une app de conversion : trois écrans, un par sport — course, vélo, natation. On saisit 12 km/h, l'app affiche 5 minutes au kilomètre ; 4 km/h en nage, elle traduit en minutes aux 100 mètres. Deuxième feature : les tableaux de passage, qui donnent le temps au 5e, au 10e, au 21e kilomètre.

Rustique mais utile : 5 à 6 000 utilisateurs dans le nord de la France, sans marketing. L'app s'appelait alors « convertisseur course à pied » — des mots-clés toujours dans le top des recherches Google, et Baptiste a gardé les noms de domaine, qui lui génèrent encore du trafic.

Ce sont les clubs de triathlon et d'athlétisme du coin qui déclenchent la suite : l'app est bien, mais elle n'évolue plus. En janvier 2024, Baptiste repart de zéro.

La V2 change de nature. Elle croise le poids du coureur, sa capacité à monter et descendre, son allure de croisière et les données de pluie et de vent, puis recommande une allure kilomètre par kilomètre : « les dix premiers kilomètres sont roulants, mais le onzième a 200 mètres de dénivelé positif, ralentis ». À vélo, elle prévient qu'au 60e kilomètre le vent sera de face. Avec, en amont, des plans d'entraînement et du travail de zones cardio.

---

## Ignite : le boilerplate qui a survécu à deux versions

La V1 comme la V2 sont scaffoldées avec **Ignite**, le boilerplate React Native d'Infinite Red. Baptiste n'en est pas parti, il l'a repris — mais pas via une mise à jour. Sa méthode : créer un projet Ignite neuf à côté, faire le diff à la main, et récupérer ce qui l'intéressait de la nouvelle infra — une approche que les agences pratiquent aussi sur les projets restés silencieux plusieurs années.

> "La stack est exceptionnelle. Tout est branché : la navigation, le state, etc. Mais la mise à jour, c'est un peu galère." — Baptiste Lecocq

L'autre douleur, c'est le code de démo livré par défaut : sympa quand on débute, encombrant à maintenir ensuite. Le flag de suppression du code de démo répond aujourd'hui à ce point.

Ce qu'il a gardé du boilerplate : **MobX** pour le state, qu'il préfère à Redux pour son système d'observers, et **React Navigation** — Expo Router n'étant pas encore assez mûr au moment du reboot. Et une pépite : le typage TypeScript des clés de traduction, qui infère l'arborescence complète d'un `fr.json` imbriqué et signale au build les traductions manquantes.

Côté styling, pas de librairie UI : du StyleSheet à la main, ses propres composants, un dark mode géré via le thème React Navigation. Le design vient d'une agence externe, l'UX d'un autre prestataire. Le responsive iPad tient dans quelques hooks d'orientation, pour les utilisateurs sur home trainer.

---

## Le widget React Native web qui distribue l'application

La partie la plus maligne de l'histoire repose entièrement sur React Native web : l'app Expo est aussi buildée pour le navigateur. Baptiste a écrit un petit `embed.js` — « comme si on intégrait un bouton Facebook » — que les organisateurs collent où ils veulent dans leur page. Ce script embarque **un seul écran** de la stack Expo, celui de l'analyse de parcours.

> "J'essaye de ne pas trop immiscer la marque Pacevisor. On a accès à toute l'analyse, le téléchargement du tracé, tous les algorithmes de prédiction sont embarqués côté client." — Baptiste Lecocq

Résultat : sur le site d'une course, un coureur ouvre le parcours 21 km et obtient l'analyse complète sans rien installer. Plus d'une centaine de courses ont intégré le widget, et comme tous les calculs tournent côté client, l'expérience égale celle de l'app native.

Le SEO complète le dispositif : qui cherche le GPX d'une course tombe sur le site Pacevisor, avec ce même widget. La partie site est un **Next.js** qui intègre l'app web en iframe — Next construit statiquement les assets et les meta tags, le reste s'affiche en JS. Le tout dans un monorepo Yarn, qui partage les entités métier entre le Next et l'app Expo.

L'hébergement suit la même sobriété : l'app web sur Cloudflare (meilleure gestion du routing sur les sous-chemins que GitHub Pages), le Next sur Vercel en offre gratuite, les données sur MongoDB Atlas. Plus de 30 000 utilisateurs, une facture d'infra quasi nulle.

---

## Sortir la logique métier de MobX avec du DDD

Le moment difficile du projet, c'est la gestion des unités. Système métrique côté français, système impérial pour les nombreux utilisateurs britanniques — et des yards qui ne se convertissent pas comme des mètres. Éparpillé en fonctions et constantes, ce code devenait intestable.

La réponse vient du **Domain Driven Design**. Baptiste écrit des classes TypeScript pures — une classe `Race` dont les méthodes savent rendre une distance dans le bon système d'unités. MobX ne sert plus qu'à stocker : une méthode `toDomainObject()` en tire un objet JavaScript peuplé, et c'est lui qui est utilisé dans les vues.

> "Le cœur du business, c'est bien s'il est dans une techno agnostique, qui n'est pas liée à MobX, qui n'est pas liée à quoi que ce soit." — Baptiste Lecocq

L'effet de bord est immédiat : du code sans dépendance se teste unitairement. Et pour Baptiste, le test unitaire est le meilleur outil de debug sur une app remplie de conversions non visuelles. Il complète avec **Quokka.js** et **Wallaby**, qui affichent variables et lignes en erreur dans l'éditeur.

---

## Les librairies qui tiennent le mobile et le React Native web

- **@gorhom/bottom-sheet** — sa librairie numéro un. Gestures fluides, scroll interne, et la sheet qui se relève quand un champ passerait sous le clavier.
- **Turf.js** — indispensable pour manipuler du GPX (latitude, longitude, élévation). Distance entre deux points GPS sans sortir les radians, et surtout le _snapping_ : repositionner un coureur qui s'écarte sur le vrai segment de course.
- **react-native-chart-kit** + une librairie de line chart responsive superposée — l'une pour le graphe d'élévation, l'autre pour la ligne et les métadonnées sous le curseur.
- **expo-leaflet** — un hack qui génère une WebView avec Leaflet dedans, évite les rate limits de Google Maps et tourne sur les trois plateformes. La directive `use dom` d'Expo devrait le rendre obsolète.
- **react-native-onboarding-swiper** — la seule animation de l'app, indispensable quand les utilisateurs vont du comptable de 40 ans à l'étudiante cycliste de 20 ans.

Côté CI/CD, tout passe par GitHub Actions : linting, formatting, tests Jest, et des tests d'intégration en Playwright et Testing Library exécutés sur la version web — puisque la majorité des calculs y vivent. Le build passe par EAS, la soumission aux stores reste manuelle.

---

## Un produit gratuit financé par les organisateurs

Pacevisor est gratuit, sans publicité, sans tracking et sans création de compte. Le revenu vient des organisateurs qui paient pour y référencer leur épreuve, avec des exceptions pour les courses associatives.

Le pilotage produit suit la même proximité : un groupe WhatsApp de contributeurs à qui Baptiste soumet chaque demande d'organisateur avant de la développer. C'est comme ça qu'est née l'annotation des kilomètres sur le tracé — et qu'a été corrigé son effet de bord sur une course de 160 km, où les marqueurs saturaient l'écran.

---

## Conclusion

Pacevisor est un contre-exemple utile : un développeur seul, un boilerplate scaffoldé deux fois, une logique métier isolée dans des objets TypeScript purs, et React Native web utilisé non pas comme une case à cocher mais comme le canal de distribution du produit. Ce que l'épisode montre surtout, c'est la cohérence entre les contraintes et les choix : pas d'équipe, donc pas de stack à documenter pour d'autres ; peu de budget, donc Cloudflare, Vercel gratuit et Atlas ; beaucoup de calculs invisibles, donc des tests unitaires plutôt qu'un outillage sophistiqué.

---

## Key Takeaways

- **React Native web peut devenir un canal de distribution** : un `embed.js` chargeant un seul écran Expo permet à plus de cent sites de courses d'héberger l'analyse de parcours.
- **Rebooter un projet Ignite se fait souvent par diff manuel** : créer un projet neuf à côté et reprendre la nouvelle infra à la main, plutôt que de mettre à jour le boilerplate.
- **Isoler le domaine métier de MobX rend tout testable** : une classe TypeScript pure et une méthode `toDomainObject()` suffisent à rendre les conversions d'unités testables.
- **Le test unitaire est un outil de debug** : sur une app pleine de calculs invisibles, il bat le `console.log`, avec Quokka.js et Wallaby en complément.
- **Turf.js est incontournable dès qu'il y a du GPX** : distances GPS, manipulation de tracés, snapping d'un point sur le vrai segment de course.
- **Next.js reste le meilleur choix pour la couche SEO** : meta tags et assets construits statiquement, avec l'app React Native web intégrée en iframe.
- **Un produit gratuit peut se financer par l'offre** : ici, les organisateurs paient, pas les coureurs — l'app reste sans compte, sans tracking et sans publicité.
