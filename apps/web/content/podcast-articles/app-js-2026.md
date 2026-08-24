# React Native 2026 : le débrief d'App.js sans filtre

React Native est-il en train de devenir le framework le plus important de la décennie, ou l'IA va-t-elle le rendre obsolète avant qu'on ait fini de débattre ? C'est la question qu'ont posée les 500 développeurs réunis à Cracovie pour App.js. Dans cet épisode du Cross Platform Show, David Leuliette réunit Gabriel Hofman et Matthys Ducrocq pour un débrief que vous ne trouverez nulle part ailleurs : ce que la sixième édition a vraiment raconté sur **React Native 2026**, au-delà des slides. Dix jours de recul, aucune langue de bois. Vous allez comprendre pourquoi la vraie tendance n'est plus l'annonce fracassante mais la stabilisation, comment l'IA a transformé le rôle du développeur en manager d'agents, quelles librairies installer dès demain, et pourquoi CocoaPods vit ses derniers mois. Bref, le terrain, pas le marketing.

## App.js 2026 : la stabilisation, vraie tendance React Native 2026

Si Matthys devait résumer les trois jours en un mot-clé, ce serait « performance » — le terme est revenu talk après talk, à la manière des « Wonderful, Gorgeous, Awesome » d'une keynote Apple. Mais l'impression dominante des invités est ailleurs : l'écosystème se calme.

Fini l'enchaînement d'annonces qui partent en production buggées pendant six mois. Le SDK 56 est bien sorti, mais sans nouvelle feature folle. À la place, on écrit du code propre, on l'optimise, on stabilise. Cette maturité se ressent jusque dans les ateliers. Au workshop React Native Web, Matthys retient surtout le bon usage de `useDOM` : plutôt que d'encapsuler une WebView à la main, on déclare les directives en haut du composant et on l'importe — terminé, surtout dans un monorepo déjà bien câblé côté CI et tests.

> "Avant c'était annonce sur annonce et maintenant c'est plus on fait du code propre, on l'optimise et on arrête de sortir des grosses features qui sont buggées pendant six mois." — Matthys Ducrocq

## L'IA va-t-elle tuer React Native ? Le vrai débat

Le talk qui a lancé le débat frontalement : « Is AI making React Native obsolete? », par Perttu de RevenueCat. Son protocole : coder la même app mobile en Swift, en Kotlin et en React Native pour voir qui est le plus rapide à shipper.

Le résultat qui a marqué les invités : de 0 à 80 %, tout va vite. Ce sont les derniers 20 % qui coincent. En natif, il a brûlé trois fois plus de tokens, parce qu'à chaque changement sur une plateforme il devait re-prompter l'autre, avec des divergences de code base qui ne convergeaient jamais vers le résultat voulu. La conclusion des trois compères est nette : l'IA réduit le codage, pas la coordination. L'avantage de React Native, c'est une seule code base à maintenir, donc on ship plus vite sans synchroniser deux stacks. Gabriel nuance : RevenueCat étant juge et partie — leur State of Paid Apps place React Native en tête des revenus — l'analyse reste un peu orientée. Jean-Baptiste Kempf, le créateur de VLC, poussait la logique jusqu'à l'absurde sur scène : avec l'IA, autant coder en binaire et en assembleur, c'est hyper optimisé.

## Le développeur devient manager d'agents

Le talk de Gant Laborde, d'Infinite Red, a fait un tour de magie en live avec une app Expo et Supabase. Son vrai message : les rôles éclatent. Il propose trois profils — l'Integrity Engineer, qui a le droit de dire non et interdit de casser ; le Product Experience Architect, qui pousse les features ; et le System Engineer, qui vérifie. Dans plein de boîtes, ce sont désormais les gens du produit ou du marketing qui shippent en prod.

Matthys va plus loin avec sa « triforce AI » : le prompteur, le builder et le reviewer. Il l'orchestre avec des skills, de bonnes règles et, maintenant, les workflows.

> "On est plus AI manager qu'integrity engineer." — Matthys Ducrocq

Côté revue de code, Gabriel a industrialisé la boucle : CodeRabbit (sponsor de la conf) poste ses feedbacks en CI, un agent écoute l'événement de review et corrige jusqu'à ce qu'il n'y ait plus rien à redire. Il ne merge jamais en aveugle pour autant — il relit toujours l'archi, qui part parfois en vrille. Sur les tests, la génération d'après ne se décrit plus clic par clic à la Maestro : Test Army et Autosana lancent des tests end-to-end non déterministiques, où l'IA cherche seule comment créer un compte et déclenche les cas tordus qu'un vrai utilisateur provoque — revenir en arrière, aller sur le profil, et voir la modale disparaître.

## Les annonces qui changent le quotidien React Native 2026

Plusieurs releases visent directement les intégrateurs web devenus ingénieurs mobiles.

### Reanimated, worklets et animations CSS

Reanimated ouvre les transitions et animations CSS, et React Native Worklets devient un package indépendant pour le multithreading au-delà des animations. Pour Matthys, obsédé de perf, c'est un gain rapide sur un écran qui lague : on split les threads sans réécrire toute la logique. Les animations restent un métier — vérifier qu'elles ne cassent pas sur de vieux Android à faible RAM sans vider la batterie peut occuper quelqu'un à plein temps, à la Katalin Miron.

### React Native Teleport

Le créateur de React Native Keyboard Controller a présenté « The Illusion of Portals in React Native ». Teleport affiche une native view au-dessus de l'écran sans la re-render quand on change la position du nœud. Les cas d'usage sont concrets : une vidéo inline dans un feed LinkedIn qui passe en plein écran en gardant le contexte du player, ou les réactions de chat où l'on n'unmount plus le message, évitant de recharger les photos en boucle.

### CocoaPods est mort, vive Swift Package Manager

Ricardo (Meta) et Christiane (Expo) ont annoncé React Native sans CocoaPods, via Swift Package Manager — disponible depuis un moment et jusqu'à 40 % de build time en moins. Ceux qui passent par Expo ne gèrent pas cette couche, mais l'échéance est ferme : CocoaPods sera déprécié en décembre. Les libs qui updatent après ne publieront plus leurs versions natives.

> "Tu migres ou tu meurs." — Gabriel Hofman

Charlie Cheever a aussi présenté Expo Desktop, l'outil non officiel de Jamie Birch pour lancer des apps Expo sur macOS et Windows — React Native consommant bien moins de RAM qu'Electron. La réserve de Gabriel : c'est une plateforme de plus à tester, à réserver aux vrais besoins desktop.

## Les outils React Native 2026 à installer dès demain

Avec 500k de budget, Gabriel investirait peu en tech — le coût des features a fondu — et beaucoup en design et marketing UGC pour se démarquer sur les stores.

Le must-have de Matthys, c'est **Expo Observe**, sorti le jour de la conf après une bêta en avril. Il mesure le time to interactive, les cold et warm launches — des indicateurs que les stores utilisent pour ranker une app, donc pour la visibilité et les revenus. Là où Expo Insight donne la population, Observe donne la performance, en wrapper autour de l'app. Les 10 000 premiers utilisateurs actifs mensuels sont gratuits. À réserver au monitoring de démarrage en prod et à la comparaison entre releases et OTA updates, pas au crash reporting — Sentry garde ce terrain.

Autre pépite : SimCam, de Software Mansion, qui ajoute une caméra au simulateur iOS pour tester un QR code en local depuis sa webcam ou son écran. Gabriel, lui, installe Teleport. Le tout dans un écosystème où chaque librairie ouvre son MCP — Expo, Software Mansion, Callstack, Margelo — au point qu'il faudrait un skill pour choisir quel skill utiliser.

## Conclusion

App.js 2026, c'est cinq étoiles pour les deux invités : workshops denses, talks variés de la release à l'accessibilité, et French Team au premier rang des photos officielles. La vraie histoire de React Native 2026 n'est pas une révolution de plus, mais une consolidation — l'IA qui déplace le dev vers le pilotage, la perf érigée en réflexe, et un outillage qui se plugge en minutes.

## Key Takeaways

- La tendance dominante de React Native 2026, c'est la stabilisation : moins d'annonces fracassantes, plus de code propre et optimisé, avec le SDK 56 sans feature folle.
- L'IA réduit le codage mais pas la coordination : l'atout de React Native reste une seule code base, quand le natif brûle jusqu'à 3× plus de tokens sur les derniers 20 %.
- Le rôle du développeur bascule vers le management d'agents — « triforce » prompteur / builder / reviewer, avec CodeRabbit et une boucle d'auto-correction en CI.
- Reanimated ouvre les animations CSS et React Native Worklets devient un package indépendant pour le multithreading.
- React Native Teleport affiche des native views au-dessus de l'écran sans re-render : vidéo plein écran, réactions de chat, transitions fluides.
- CocoaPods sera déprécié en décembre : la migration vers Swift Package Manager (jusqu'à -40 % de build time) n'est plus optionnelle.
- Trois outils à tester dès demain : Expo Observe (perf de démarrage et ranking stores), SimCam (caméra du simulateur), et Teleport.
