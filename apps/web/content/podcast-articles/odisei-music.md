# React Native Audio API : le pari musical d'Odisei Music

Jouer du saxophone dans un avion, un train ou une réunion — discrètement. C'est la promesse d'Odisei Music, une entreprise espagnole qui fabrique un saxophone électronique de la taille d'une petite bouteille d'eau. Kim Chouard, son CTO, construit l'app qui va avec : Odisei Play, un jeu d'apprentissage musical où 10 millisecondes de latence suffisent à tout casser. Dans cet épisode du Cross Platform Show, David Leuliette décortique avec lui une stack React Native poussée dans ses retranchements : Supabase, Expo Router, Legend State, NativeWind, React Native Skia — et surtout React Native Audio API, la librairie de Software Mansion qui apporte enfin la Web Audio API sur mobile.

---

## Du Site du Zéro à CTO d'Odisei Music

Kim Chouard a grandi à Aix et a commencé à coder très tôt, sur le Site du Zéro, en PHP. Après l'INSA Lyon, il décroche un stage chez Adobe à San Francisco, dans l'équipe cloud.

Un hackathon Salesforce (terminé à la quatrième place) l'amène ensuite chez le géant du CRM comme Product Manager. En bénévolat interne, il crée un jeu pour initier les enfants à la technologie. L'effet boule de neige remonte jusqu'aux cofondateurs : un poste est créé pour lui dans l'équipe philanthropique et le projet devient international, avec Will.i.am parmi les juges d'une finale pendant le Covid.

De retour en France, il se recentre sur la technologie et la musique, et s'associe avec Odisei Music.

---

## Odisei Play : un Duolingo de la musique à la milliseconde près

Le problème du saxophone tient en une phrase :

> « Ce qui est vraiment cool avec les saxos, c'est que ça fait du bruit. Et ce qui est un peu chiant avec les saxos, c'est que ça fait du bruit. » — Kim Chouard

Quand Kim achète le produit, il constate qu'il manque l'essentiel : l'apprentissage. L'entreprise n'avait alors qu'une petite app React Native de configuration. Le fondateur avait la vision, il fallait quelqu'un pour l'exécuter.

Odisei Play est né il y a deux ans et demi : « comme si Duolingo et Guitar Hero faisaient un enfant qui tombe amoureux des instruments à vent ». Comme l'instrument sait exactement quelles touches sont pressées, l'apprentissage est décomposé : d'abord le doigté et la rythmique, ensuite le souffle sur le vrai instrument. Résultat : une première chanson en quelques minutes, toutes les notes naturelles en une demi-heure. L'app est en bêta sur le web, arrive sur TestFlight dans quelques semaines, et vise l'App Store iOS d'ici la fin de l'année.

La contrainte technique, elle, est extrême : « Si j'ai 10-20 ms de délai, tout est désaligné et c'est mort. »

---

## Supabase et Expo Router : une stack universelle, des clés côté serveur

Pour le data layer, Kim a choisi Supabase : base PostgreSQL, storage pour les backing tracks, et Supabase Auth pour les comptes. Un backend as a service assumé pour une petite équipe — « ce n'est pas là qu'on fait la différence, c'est sur l'interface et l'expérience de gamification ». Avec un trade-off connu : un coût à l'échelle, et une auth moins mature que Firebase dès qu'il faut la lier à d'autres systèmes.

Côté navigation, Expo Router était tout jeune quand l'app a été bootstrappée. File-based routing, deep linking automatique entre web et mobile, protected routes pour les pages derrière un login, et surtout les API routes. Venant du web, Kim refusait d'embarquer ses clés côté client — une app se décompile. Toutes les clés vivent donc côté serveur, derrière une petite API construite avec Expo Router entre l'app et Supabase. Prochaine étape sur sa liste : le server side rendering pour le SEO des pages de chansons.

Le data fetching reste le point qu'il assume ne pas avoir optimisé : le SDK Supabase utilisé à la main, sans lien avec TypeScript. TanStack Query est la prochaine migration — qu'il compte confier en partie à Claude Code.

---

## De Redux à Legend State : la chasse aux millisecondes

Héritage de sa période extension Chrome, Kim était parti sur Redux Toolkit. Jusqu'à taper les limites : sur mobile, un délai apparaissait entre l'appui sur play et le démarrage du son — le thread JavaScript y est moins disponible que sur le web. Pour une app musicale, c'est rédhibitoire.

Sa rencontre avec Jay — créateur de Legend List, ancien développeur de jeux vidéo, « performance first » — le décide à migrer vers Legend State : un state management atomique proche de Jotai, avec des optimisations spécifiques sur les arrays. Or l'interface de jeu peut afficher des milliers de notes, dont chacune doit être mise à jour de façon ultra ciblée quand elle est jouée.

La migration, menée par étapes sur les seuls states de l'interface de jeu, a été un mur pendant une semaine :

> « Tant que t'as pas le truc qui marche, t'as un mur devant toi. Vendredi à 16h j'avais envie de me pendre, à 21h c'était la fête. » — Kim Chouard

En migrant la partie du state qui gère le son, le délai a disparu. Bonus élégant : Legend State se connecte à TanStack Query pour le data layer et à MMKV pour la persistence — de quoi obtenir un offline first « quasi gratuit », pour s'entraîner sans réseau, façon Spotify.

---

## NativeWind, Storybook et React Native Skia pour l'interface

Pour le styling, StyleSheet ne le convainquait pas, et Tamagui — « une usine à gaz » très opinionated — ne collait pas à un projet qui avait déjà sa direction artistique. Le choix s'est porté sur NativeWind, le portage universel de Tailwind : rapide, clair, et malin sous le capot — pour les animations, il crée en coulisses des shared values Reanimated afin que tout reste performant sur le thread UI. Avec quelques subtilités qui piègent les développeurs venus du web, comme l'absence de `flex-row` par défaut.

Les composants vivent dans Storybook, dont la version 9 unifie enfin les releases web et React Native — big up à Dani, quasi seul mainteneur de la partie React Native. Chromatic a été testé, puis abandonné : trop cher tant que l'app ne génère pas de revenus.

L'interface de jeu, elle, repose sur React Native Skia, la librairie de William Candillon qui expose le moteur de rendu open source de Google via des APIs élégantes, intégrées à Reanimated et Gesture Handler. Les menus restent des views classiques ; Skia sert là où ça compte : la partition façon Guitar Hero, les polar gauges à la Apple Watch, et les animations Lottie via Skottie, désormais supporté nativement. « S'il n'y avait pas eu ça, je ne sais pas ce que j'aurais fait. »

---

## React Native Audio API : la Web Audio API devient universelle

L'audio était le dernier gros point de friction — Kim l'avait dit sur scène à App.js, et des librairies sont nées depuis. Expo AV imposait des délais incompressibles de 20 à 50 ms. Expo Audio a amélioré les choses. Mais la vraie révolution, c'est React Native Audio API de Software Mansion : la Web Audio API portée universellement sur iOS, Android et web.

Le paradigme est celui d'un studio : des blocs audio qu'on connecte comme des câbles. Plus long à prendre en main, mais ultra performant. Le pitch shifting en est un bon exemple : ralentir une chanson pour s'entraîner, sans transformer les notes en voix de chipmunk.

---

## Le futur de React Native Audio API : des shared values pour l'audio

Kim travaille directement avec l'équipe de Software Mansion sur la suite : apporter le concept de shared values de Reanimated à l'audio, pour que les trois univers — JavaScript, UI et audio — communiquent. Imaginez un vinyle à l'écran dont le scratch au doigt contrôle réellement le son, ou des multitracks alignés sur une même valeur partagée. Même logique pour le moteur maison qui transforme l'audio du micro en MIDI : du C++ compilé en WebAssembly, bientôt en natif.

---

## Conclusion

Le parcours d'Odisei Play illustre une bascule : React Native n'est plus seulement « suffisant » pour une app exigeante, il devient l'endroit où les paradigmes du web — Tailwind via NativeWind, la Web Audio API via React Native Audio API — sont portés universellement, parfois plus performants que du code natif écrit à la main. Kim en retient une leçon :

> « S'il n'y avait eu que la tech, je ne serais allé nulle part. Le plus gros apprentissage, c'est vraiment la puissance d'une communauté. » — Kim Chouard

---

## Key Takeaways

- **Odisei Play décompose l'apprentissage du saxophone** : d'abord le doigté et la rythmique sur l'instrument électronique connecté, ensuite le souffle — une première chanson en quelques minutes.
- **10 à 20 ms de latence tuent une app musicale** : cette contrainte temps réel doit guider chaque choix de stack, du state management à l'audio.
- **Ne jamais embarquer ses clés côté client** : les API routes d'Expo Router gardent les variables d'environnement côté serveur, même pour une app mobile.
- **Redux peut devenir le goulot d'étranglement** : migrer les states critiques vers Legend State a éliminé le délai entre l'appui sur play et le son.
- **Legend State + TanStack Query + MMKV** : le trio qui donne un offline first quasi gratuit, sans black box.
- **React Native Audio API apporte la Web Audio API sur mobile** : paradigme de blocs connectés façon studio, pitch shifting, et bientôt des shared values partagées entre JavaScript, UI et audio.
- **La communauté fait la stack** : Skia, Reanimated, NativeWind, Storybook — chaque verrou d'Odisei Play a sauté grâce à des mainteneurs réactifs.
