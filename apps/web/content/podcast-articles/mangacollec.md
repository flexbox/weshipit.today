# ReScript React Native : 8 ans d'une app mobile en solo

Chercher "ReScript React Native" renvoie surtout de la documentation et des repos GitHub, presque jamais un retour d'expérience de production. Freddy Harris, lui, fait tourner [Mangacollec](https://www.mangacollec.com/) — une app de collection de mangas, 200 000 comptes inscrits — sur cette stack depuis 2019. Seul. Avec un data layer maison, un mode offline complet, un premium qui le fait vivre, et zéro CI.

Dans cet épisode du Cross Platform Show, David Leuliette lui fait dérouler la stack : pourquoi ReScript plutôt que TypeScript, comment tenir un store qui survit à la perte de réseau, et ce qui arrive quand un ayant droit fait disparaître votre app du Play Store.

---

## De projet de fin d'études à 200 000 comptes

Freddy sort d'un IUT SRC puis d'un master multimédia — un cursus à un tiers designers, un tiers chefs de projet, un tiers développeurs. Mangacollec y naît comme projet de fin d'études, et existe d'abord comme site web en Ruby on Rails. Responsive, mais pas ce qu'il veut : lui veut une vraie app mobile, avec l'offline et le scan de codes-barres. Le problème classique du side project, c'est le temps. Sa solution en 2016 : passer freelance.

> "En travaillant six mois, je gagnais autant qu'en étant salarié avant. Et donc j'avais six mois de libre pour faire l'appli." — Freddy Harris

L'app sort en 2017, juste avant la Japan Expo. Trois jours de flyers distribués à la sortie du RER, en t-shirts faits maison : 5 000 flyers pour arracher les 1 000 premiers inscrits. La bascule arrive en 2021, quand le boom du manga post-confinement lui fait passer la barre des 100 000 puis 200 000 comptes dans la même année.

---

## Pourquoi ReScript React Native plutôt que TypeScript

La V2 de 2019 apporte le dark mode et un changement de langage. Freddy manipulait déjà ses données en immutable avec Immutable.js — parfait pour les maps et les sets, mais lent. En découvrant que ReasonML (devenu ReScript) offrait des maps et sets natifs bien plus rapides, il benchmarke, migre, et l'app accélère.

Son grief contre TypeScript à l'époque : il annotait pour la machine sans que la machine lui rende grand-chose. ReScript inverse le rapport — tout est strictement typé, mais l'inférence est telle qu'on ne type presque rien soi-même.

> "Tu peux refactorer tout un truc dans ton train, sans réseau, juste avec le compilateur. Tu sais que si ça compile, ça tourne." — Freddy Harris

Écrire des bindings vers une librairie JavaScript y est aussi plus simple qu'en TypeScript, sans obligation de tout typer : deux fonctions utilisées dans une lib, on binde ces deux-là et c'est réglé. Il maintient d'ailleurs `rescript-react-native`.

---

## Le data layer ReScript React Native : pattern matching et zéro null

Là où la plupart des équipes empilent des librairies, Freddy a construit son propre Redux-like. Le pattern matching rend les reducers agréables à écrire — sans commune mesure avec un `switch` JavaScript — et les maps et sets étant natifs, il n'a aucune dépendance pour son state management.

Pour les side effects, il abandonne Redux Saga — puissant mais compliqué à debugger — au profit de `react-update`, créée par Mathias Le Brun, qui permet de déclarer un side effect à la fin d'une action de reducer. Réécrire cette couche a rendu le code simple à écrire, et surtout à comprendre plusieurs semaines plus tard.

Le fetching s'appuie sur deux idées propres au langage. D'abord l'absence de `null` et d'`undefined` : on manipule des types `option` (`None` / `Some`) et un type `result`. Ensuite les **futures**, via `rescript-future` : ça ressemble à une promise, mais au lieu d'un type résolu et d'un type rejeté, un seul type à plusieurs états.

> "Souvent tu peux récupérer data et erreur en même temps. Mais lequel est à jour ? Là, vu que c'est encapsulé dans un type, tu ne peux pas être dans deux états différents en même temps." — Freddy Harris

C'est aussi ce qui lui évite de semer des `try/catch` partout, comme le fait `async`/`await`.

---

## Offline-first : le store normalisé qui fait toute la différence

Le besoin est limpide : être en librairie, sans réseau, et savoir si on a déjà le tome 32 chez soi pour ne pas l'acheter en double.

Le mécanisme est volontairement simple. Toutes les vues sont branchées sur un store normalisé — peu importe quelle requête a mis la donnée à jour. Ce store se construit au fil de la navigation et se sérialise en JSON sur le disque à chaque update. Même un écran jamais visité hors ligne affiche donc les données déjà chargées, complétées par des skeletons.

> "L'offline, je l'ai depuis le début. C'est le truc que les gens ne remarquent pas, mais quand ça marche, ça marche — et du coup ils ont confiance quand ils ouvrent l'application." — Freddy Harris

Bonus pour un solo : cette logique métier côté client économise beaucoup de frais serveurs, l'API n'étant presque qu'un sync de données.

---

## Navigation, styling et React Native Web dans un monorepo

Freddy utilise React Navigation depuis le début — il pousse même des PR upstream — et maintient une dizaine de patches via `patch-package`. Côté styling, pas de librairie UI : `StyleSheet` à la main. Il refait ses composants plutôt que de dépendre d'un design system tiers dont chaque mise à jour casse les customisations. Il suit en revanche StyleX et React Strict DOM.

Le monorepo contient le design system, l'app React Native, l'app React Native Web et le datastore. Le web réutilise massivement les composants mobiles, mais pas la navigation : React Navigation, malgré sa compatibilité annoncée, ne lui convient pas là — il a donc abstrait ses hooks de navigation par plateforme. Solito et Next.js ont été écartés : 85 % de l'usage est sur mobile, et il ne voulait pas que son architecture dépende du web. Le SSR est fait à la main, sur quelques pages, pour le SEO.

---

## Builds sans Expo, mémoïsation et commission à 15 %

Quand Freddy démarre, Expo n'existe pas : il s'est tapé toutes les migrations depuis la 0.13. Il reconnaît qu'Expo est aujourd'hui la façon la plus courante de démarrer, mais l'intégrer dans un projet aussi ancien, aux fichiers natifs bidouillés, n'a jamais fonctionné chez lui. Sa release, une fois par mois : archive Xcode, une journée de test sur son téléphone, TestFlight, envoi. Le `.aab` en ligne de commande, puis drag and drop sur le Play Store. Pas de CI — une dépendance native qui casse, il la voit immédiatement.

Pour la performance, tout se joue sur la mémoïsation, implacable sur Android. Il écrit lui-même ses fonctions de comparaison pour `React.memo`, et donne un ordre de priorité : commencez par les composants feuilles, ceux qui reçoivent deux ou trois props. Le contrôleur en haut de l'arbre peut se re-rendre souvent, tant que l'UI en dessous ne bouge pas.

Le premium sort début 2022, après des demandes répétées d'utilisateurs qui voulaient littéralement lui envoyer de l'argent : mille abonnés en moins d'une semaine. Sur 1,99 € par mois, il touche environ 1,40 € une fois la TVA et les 15 % de commission déduits. Pas de version web avec Stripe : moins de sécurité à gérer, aucune relance de carte bancaire, et une confiance déjà acquise sur les stores.

---

## Le jour où l'app a disparu du Play Store

Le pire moment n'a rien de technique. Un ayant droit coréen, via une société allemande, a claimé l'application comme illégale. Catalogué app pirate, retrait immédiat : le Play Store fonctionne comme les claims DMCA de YouTube — on supprime d'abord, on discute après.

Dix jours ouvrés, soit deux semaines. Pendant ce temps l'app n'existe plus, mais ses API non plus : les renouvellements d'abonnement s'arrêtent. Freddy doit hardcoder son backend pour ne pas couper le premium à ceux qui payaient — puis retirer ce hack, parce qu'il empêchait les nouveaux de s'abonner. Ses arguments — il n'héberge que des visuels, via l'API Product Advertising d'Amazon — finissent par suffire : le plaignant ne se manifeste jamais.

---

## Conclusion

Ce que raconte Mangacollec, ce n'est pas qu'il faut absolument écrire du ReScript. C'est qu'un développeur seul peut tenir une app de production depuis huit ans en refusant méthodiquement la complexité qu'il n'a pas choisie : pas de librairie UI, pas de CI, pas de state management importé. Les seuls investissements lourds — typage strict, offline-first — sont ceux qui lui font gagner du temps chaque semaine.

> "C'est compliqué de faire quelque chose de simple. Quand une interface vous semble évidente, c'est qu'on s'est beaucoup pris la tête pour qu'elle le soit." — Freddy Harris

---

## Key Takeaways

- **ReScript React Native tient la production** : Mangacollec tourne dessus depuis 2019, avec 200 000 comptes inscrits.
- **L'inférence de types est le vrai argument face à TypeScript** : tout est strictement typé sans avoir à annoter — décisif sur un projet repris tous les six mois.
- **Les types `option`, `result` et les futures suppriment des classes entières de bugs** : pas de `null`, pas d'état data-et-erreur simultané, pas de `try/catch`.
- **Un store normalisé sérialisé sur disque suffit à faire de l'offline-first** : les vues lisent le store, jamais la requête.
- **Écrire ses propres composants UI coûte moins cher que maintenir une lib tierce** quand on customise beaucoup.
- **Optimisez la performance en partant des composants feuilles** : ce sont eux qui cumulent le plus de renders.
- **La compliance store est un risque produit** : un claim d'ayant droit peut couper l'app et ses API d'abonnement pendant deux semaines.

---

## Ressources mentionnées

[Mangacollec](https://www.mangacollec.com/) · [ReScript](https://rescript-lang.org/) · [ReScript React Native](https://rescript-react-native.github.io/) · [rescript-future](https://www.npmjs.com/package/@jvlk/rescript-future) · [StyleX](https://stylexjs.com/) · [Reassure](https://github.com/callstack/reassure)

**David Leuliette** → [Twitter](https://x.com/flexbox_) · [BlueSky](https://go.bsky.app/6QQemwz) · [weshipit.today](https://weshipit.today/)

**Freddy Harris** → [Twitter](https://x.com/HarrisFreddy) · [BlueSky](https://bsky.app/profile/freddyharris.com) · [LinkedIn](https://www.linkedin.com/in/freddy-harris-03bb9935/)
