# Application React Native en marque blanche : le retour d'Ilévia

Construire une application React Native en marque blanche, c'est écrire une seule codebase et la livrer sous une vingtaine de marques — chacune avec ses couleurs, son périmètre géographique, son compte App Store et ses validations internes. Maxime Thirouin, alias MoOx, développeur front-end toulousain depuis une quinzaine d'années, a vécu ce projet de bout en bout : l'app de transport en commun qui tourne aujourd'hui à Lille sous le nom d'Ilévia, déployée jusqu'au Brésil et au Canada.

Dans cet épisode du Cross Platform Show, il détaille avec David Leuliette la stack complète — Redux, React Navigation, Flow, Animated, Fastlane — et ce qui a réellement coûté du temps. Spoiler : ce n'était pas React Native.

---

## Une application React Native en marque blanche pour 20 villes

Le produit est édité par Kisio Digital, une filiale de la SNCF. Le principe : une app de transport public — horaires de métro, de bus, de vélos en libre-service, itinéraires piétons — déclinable pour n'importe quelle collectivité. Rien de révolutionnaire fonctionnellement, mais une mécanique de données solide : chaque client dispose d'un « coverage », un périmètre géographique au-delà duquel l'app ne cherche pas. Les données viennent de l'open data ou de la ville cliente, normalisées derrière une API REST unique.

Max arrive sur le projet par un enchaînement typique : un audit chez Molotov TV, un contact, et le voilà chargé de former une équipe à React Native — qu'il ne pratiquait pas encore.

> "J'avais vendu que je savais faire du React Native. J'avais fait un POC de 20 minutes et je me suis dit : c'est bon, je peux le faire." — Maxime Thirouin

Le pari tient. L'équipe démarre à 5-6 développeurs, monte jusqu'à 10 au moment du plus gros client, et sort le gros de l'application en 3 à 4 mois. Tout ce qui suit relève des retouches et des particularités métier.

---

## Redux partout : la leçon la plus coûteuse du projet

C'est l'époque des débuts de Redux, et l'équipe s'y jette : Redux Thunk pour l'asynchrone, puis Redux Saga pour orchestrer les effets. Sur le papier, l'architecture est belle. En pratique, elle devient un piège.

> "On n'avait pas tant besoin de Redux. Tous les devs voulaient tout foutre dans Redux et très vite : bottleneck de performance." — Maxime Thirouin

Le problème n'est pas Redux mais son usage systématique. Une app de transport a peu d'état global — quelques favoris, guère plus. Quand les champs de recherche eux-mêmes finissent dans le store, l'app devient un enfer à faire tourner. S'ajoute le boilerplate : ajouter un simple état demandait une quantité de fichiers phénoménale, là où un `useState` aurait suffi. Saga, en particulier, laisse un souvenir amer : élégant à écrire, infernal à débugger, beau en théorie et ni performant ni pertinent en pratique.

La règle que Max applique encore aujourd'hui découle de ce traumatisme : `useState` par défaut, et on ne sort l'artillerie que quand le besoin est démontré.

---

## Navigation, styling, types : une stack volontairement minimale

**[React Navigation](https://reactnavigation.org/)** dès le départ, en version 1. La migration de la v2 vers la v3 a fait un peu mal, mais le résultat est là : onglets en bas, stacks, gestes natifs. Rien d'exotique — les problématiques du projet n'étaient pas là.

**Le styling est fait entièrement à la main**, sans librairie. Une `StyleSheet` par composant, une config rudimentaire qui centralise quelques tailles, couleurs et espacements — et c'est là que se joue la marque blanche : les couleurs sont modifiables par client. Pour le reste, les composants restent autonomes, avec une règle simple : dès qu'un style devient redondant, il part dans un composant qui l'encapsule.

**Côté types, c'est [Flow](https://flow.org/)** — avant que TypeScript ne devienne la norme. Première expérience de Max avec le typage en front, et une révélation : 95-96 % de coverage sur toute la codebase, styles compris, avec une commande CI qui bloquait dès que le pourcentage redescendait. Les refactorings devenaient sereins, les mauvaises props remontaient immédiatement. Son verdict sur la fin de Flow est sans détour : l'outil était bon, mais il n'a jamais eu de communauté ni de communication, là où TypeScript a été poussé et outillé.

**Pour les animations**, `Animated` a suffi : quelques ressorts, quelques transitions — une habitude si ancrée que Max a continué à l'utiliser sur des projets React Native Web ultérieurs.

**Côté debug enfin**, un crash reproductible en dev donne une stack trace pointant le composant fautif : `console.log` a fait le travail, et la partie la plus pénible à tracer restait Redux, pas React. Les seuls vrais problèmes sont venus du natif — des beacons installés aux arrêts pour déclencher une notification à l'approche, avec des crashes traqués à coups de logs maison.

---

## Releaser une application React Native en marque blanche pour 20 clients

C'est le morceau dont Max est le plus fier — et celui qui révèle les vraies difficultés de la marque blanche.

Le pipeline repose sur **Fastlane** piloté par **Jenkins**, avec du semver en interne. Chaque pull request déclenche un build accessible en moins de cinq minutes, annoncé par un commentaire automatique : la QA comme les devs cliquent et téléchargent. La flotte de devices autorisés tient dans un fichier texte — un développeur arrive, on ajoute son nom et son numéro d'iPhone. Pour une release, on sélectionne le client, le mode dev ou prod, la version, et ça part en TestFlight sur iOS et Android. Le setup a demandé une à deux semaines, et contre toute attente le point douloureux n'a pas été Fastlane mais Jenkins, à maintenir sur des machines internes.

Le vrai goulot d'étranglement est ailleurs : chaque ville cliente possède son propre compte développeur Apple et Google, sur lequel l'équipe est invitée.

> "Il y avait les CGU à accepter sur l'App Store. Des fois, c'était un mois pour qu'un mec se connecte sur le compte développeur Apple et fasse OK." — Maxime Thirouin

Même logique côté produit : faire valider un changement de couleur pouvait prendre deux à trois semaines d'aller-retours. Une super PO, des tests utilisateurs menés au pied des abribus, et malgré ça des process qui bloquaient tout. Seule exception : le Covid. Il a fallu shipper très vite des écrans de distanciation, et là, les clients ont été d'un coup extrêmement réactifs.

---

## Ce que le mobile a appris à un développeur web

L'apport le plus durable de React Native, pour Max, n'est pas technique : c'est l'UX. Travailler sur un tout petit écran inverse la logique du web, où l'on part du desktop pour retirer des choses ensuite.

> "Aujourd'hui, quand je dev, je pars mentalement des petits écrans et après je décline sur un endroit où tu as plus d'espace." — Maxime Thirouin

Avec un réflexe concret : face à une question d'affichage, il ouvre son iPhone, regarde comment une app système d'Apple résout le problème, et copie le modèle d'accès à l'information. David lui oppose [Mobbin](https://mobbin.com/), qui indexe les screenshots d'apps par composant.

---

## Ses recommandations aujourd'hui : Expo, Reanimated, React Strict DOM

Sur du React Native en 2025, la position de Max est nette : **[Expo](https://expo.dev/) par défaut**. Longtemps réticent — modèle économique flou, gestion des licences discutable — il a changé d'avis pour une raison simple : tout y est. Le router, React Native for Web, l'edge-to-edge, l'outillage. **[Reanimated](https://docs.swmansion.com/react-native-reanimated/)** vient ensuite, avec les keyframes de la V4 — l'équivalent des animations et transitions CSS. Sur le styling, il assume le verbeux : avec des outils typés et des agents d'IA qui écrivent une partie du code, l'explicite est un avantage, et Tailwind le dérange parce qu'il compresse tout dans une string.

Son terrain d'expérimentation actuel, c'est **[React Strict DOM](https://facebook.github.io/react-strict-dom/)**. Le constat qui le motive : React Native for Web calque l'API mobile sur le web, et cette abstraction n'est pas la meilleure. React Strict DOM prend le chemin inverse — des primitives DOM contraintes (`div`, `span`, `image`), StyleX pour les styles, media queries et pseudo-états, le tout mappé vers React Native. On écrit du web, on compile vers iOS et Android.

Sa veille suit la même logique : un tiers de flux RSS à l'ancienne, une bonne moitié sur GitHub, dans les issues et les docs de projets expérimentaux — là où l'on croise des gens « un peu dans le futur » — et le reste en side projects.

---

## Conclusion

L'histoire d'Ilévia est un contre-exemple utile au discours technique ambiant. La stack — Redux, React Navigation, StyleSheet, Flow, Animated, Fastlane — a sorti une application multi-villes en trois mois. Ce qui a ralenti le projet, ce sont des CGU non acceptées, des validations de couleur et des allers-retours humains. Ce que Max en tire pour aujourd'hui est cohérent : prendre l'outil qui a une communauté, écrire le code le plus simple possible, ne sortir l'abstraction que quand le besoin est prouvé — et garder les fondamentaux, à l'heure où commiter du code qu'on ne comprend pas se paie en dette technique.

---

## Key Takeaways

- **Une app React Native en marque blanche tient sur une config minimale** : quelques couleurs et espacements centralisés suffisent quand les composants encapsulent leur style.
- **Redux systématique = bottleneck de performance** : sur une app à faible état partagé, `useState` par défaut, escalade uniquement si le besoin est prouvé.
- **Flow a démontré la valeur du typage avant TypeScript** : 95-96 % de coverage et un seuil bloquant en CI rendent les refactorings sereins.
- **Le coût réel du multi-clients est administratif** : 20 comptes App Store, des CGU à faire accepter, jusqu'à un mois d'attente pour un clic.
- **Penser mobile first forme à l'UX** : partir du petit écran et s'inspirer des apps système d'Apple donne des patterns éprouvés.
- **En 2025 : Expo par défaut, Reanimated pour les animations**, React Strict DOM à surveiller pour du vrai cross-platform.
