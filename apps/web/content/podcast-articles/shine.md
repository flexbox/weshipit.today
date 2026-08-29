# Optimiser les performances React Native : le cas Shine

Lancer une app bancaire, regarder un spinner, appuyer sur un bouton, regarder un deuxième spinner, faire son Face ID, regarder un troisième spinner. Quinze secondes plus tard, enfin le solde. C'est sur cette démonstration au chronomètre que David Leuliette ouvre cet épisode du Cross Platform Show — et c'est exactement le problème que Corentin André, Head of Frontend chez [Shine](https://www.shine.fr/), a attaqué de front.

Optimiser les performances React Native d'une app de plus de cent écrans, maintenue par plusieurs dizaines de développeurs, ça ne se joue pas sur un `React.memo` bien placé. Ça se joue sur la mesure, sur l'architecture de navigation, et surtout sur l'organisation. Voici comment une task force de trois développeurs a divisé le temps de chargement de la home, et ce qui reste en place une fois l'équipe dissoute.

---

## Créer du lien entre le web et le mobile

Corentin arrive chez Shine il y a un peu moins de deux ans comme Staff Engineer, après six ans chez Ornikar où il a fait ses armes sur le mobile. Depuis le rachat par Ageras, il est Head of Frontend Ops.

Son constat en arrivant : l'app marchait, des dizaines de développeurs y avaient contribué, mais il manquait une culture mobile. Le design system était visuellement identique sur les deux plateformes, mais les composants n'avaient ni les mêmes noms, ni les mêmes props, ni les mêmes variantes. Chakra sur le web, styled-components sur le mobile.

> "Les devs qui étaient plutôt web étaient soûlés de faire du mobile parce qu'il fallait réapprendre des trucs. Et les devs plutôt mobile étaient soûlés de faire du web." — Corentin André

Le vrai coût n'était pas technique, il était humain.

---

## Une task force de deux mois pour optimiser les performances React Native

Le format de travail retenu mérite d'être copié. Plutôt que d'attendre des ressources pérennes, Corentin identifie les deux plus gros problèmes — design system et performances mobiles — puis monte une task force de trois développeurs empruntés à d'autres équipes, avec un objectif chiffré : diviser par deux le temps de chargement sur des pages précises.

Première étape, mesurer. L'équipe branche Sentry sur les parcours critiques et découvre que l'indicateur n'existait pas. Le résultat est brutal : sur le core parcours — ouvrir l'app, faire son Face ID, voir le solde de son compte, celui qu'empruntent 100 % des utilisateurs — le P75 était autour de 10 secondes. Soit dix secondes d'attente pour trois utilisateurs sur quatre.

Deuxième découverte, moins connue : **Apollo batche les queries par défaut** et attend le retour de toutes avant de rendre la main. Il suffisait d'une seule query lente — une qui interrogeait une API externe, La Poste en l'occurrence — pour plomber tout l'écran. La sortir du lot a fait gagner près de trois secondes.

Le reste a été un travail d'itération et de bon sens : supprimer des champs inutiles, dédupliquer des queries, retirer du chemin critique tout ce qui pouvait attendre. Les notifications in-app, par exemple, étaient bloquantes : l'app attendait leur retour — agrégé depuis plusieurs sources — avant d'afficher la home. Deux mois plus tard, les objectifs sont atteints et l'équipe est dissoute.

---

## Aplatir la navigation : le gain de performance invisible

L'app Shine compte plus de cent écrans, et son architecture historique empilait navigateur dans navigateur dans navigateur. Aujourd'hui, la quasi-totalité des routes sont au même niveau.

Pour justifier ce chantier auprès du business, Corentin est allé chercher des chiffres. Avec [Flashlight](https://flashlight.dev/), il a construit deux repros identiques — l'une avec trois navigateurs imbriqués, l'autre à plat — et mesuré FPS, heap et mémoire. Verdict : jusqu'à **40 à 50 % de RAM en moins** sur les mêmes flows, et un gain de frames par seconde qu'il qualifie d'impressionnant.

Le prérequis, c'était la migration de React Navigation 4 vers 5, qui supprime la possibilité de naviguer vers une route nested sans déclarer son parent. Distribuée dans les équipes, elle avait échoué trois fois avant son arrivée.

> "Ça n'a jamais marché parce qu'en fait, tu as besoin qu'il y ait une personne qui coordonne. Il n'y avait pas ce rôle-là." — Corentin André

La stratégie : aucun `@deprecated`, parce qu'un deprecated finit toujours par sauter. À la place, deux branches en parallèle — la prod qui marche, la migration qui casse — avec un merge systématique sur les deux et des comparatifs écran par écran, chaque équipe passant ses navigateurs un par un. Long et laborieux, mais sorti sans casser la prod.

---

## Une navigation typée à 100 %, sans passer par les types de React Navigation

Le vrai danger d'une app à cent écrans faiblement typée, ce sont les navigations impossibles : une route pas montée, un parent non spécifié, un écran déplacé sans mise à jour des appels — et aucune erreur au build. Plutôt que de s'appuyer sur l'augmentation d'interface de React Navigation, Corentin est parti de la **linking config**, la collection de deep links de l'app, avec une nouvelle règle : toute route doit y être déclarée. Puis il a reproduit l'algorithme d'Expo Router côté React Navigation — cette résolution récursive de l'arbre qui trouve le chemin le plus court vers un écran à partir de son nom.

Résultat : un composant `ShineLink` où l'on écrit `to="account-details"` et où TypeScript exige le `bankAccountId`, parce que l'URL déclare ce paramètre comme obligatoire. Type safety à 100 % sur les routes et leurs paramètres — décisif pour une app bancaire, où le deep linking depuis une notification est un enjeu produit.

---

## Tamagui : un design system universel pour le web et le mobile

Le rebranding — le passage du Shine coloré et joyeux à une identité plus sobre, pensée pour une clientèle premium — a servi de fenêtre de tir pour réimplémenter le design system en universel, avec [Tamagui](https://tamagui.dev/).

Pourquoi Tamagui plutôt que Tailwind ? Pour ne pas introduire une troisième syntaxe de styling après les styled-components et les props de Chakra. Native Base périclitait, Gluestack manquait de maturité : Tamagui l'était juste assez.

Deux détails pèsent au quotidien. Les animations d'abord : Reanimated est subtil quand on vient du web, alors que Tamagui permet de déclarer ses animations dans le thème et de les appliquer avec une simple prop `animation`. Le garde-fou ensuite : Corentin a réécrit des exports de types pour n'autoriser que les props que le design system accepte — pas question d'ajouter du padding à un bouton dont l'espacement est déjà défini. L'adoption se mesure avec la CLI [Omlet](https://omlet.dev/).

---

## Automatiser pour tenir les performances React Native dans la durée

C'est la partie la plus transposable de l'épisode. Une task force de deux mois améliore les chiffres ; ce qui les maintient, c'est l'outillage. Chez Shine : des alertes Sentry sur Slack dès que le P90 d'une transaction dépasse un seuil, des CODEOWNERS posés sur les fichiers critiques — la query GraphQL de la home, son hook — pour qu'aucune équipe n'y rajoute un champ sans validation, et des règles encodées en ESLint ou en CI plutôt que dans une doc que personne ne relit.

> "Si ce n'est pas automatisable, ça n'a pas vraiment de sens que ce soit une règle. Si tu comptes sur la surveillance de chacun, ça ne marche pas." — Corentin André

Même logique côté release. L'app sort toutes les semaines : cut en milieu de semaine, deux jours de QA, production le lundi matin. Sur chaque PR, un label GitHub déclenche un check qui s'appuie sur le fingerprint Expo pour décider s'il faut régénérer un build natif complet ou simplement publier une update ; le QR code atterrit en commentaire, et une synchro avec Linear le remonte sur le ticket, pour qu'un PM puisse tester sans ouvrir GitHub. Les OTA updates, elles, restent manuelles et réservées aux bugs critiques.

---

## Conclusion

Ce qui ressort de l'épisode avec Corentin, c'est que la performance mobile est autant un problème d'organisation que de code. Les gains les plus spectaculaires — trois secondes sur une query batchée, la moitié de la RAM sur une navigation aplatie — ne viennent pas de micro-optimisations mais de décisions d'architecture qu'il faut d'abord mesurer pour les défendre, puis coordonner pour les livrer. Son mantra tient en deux temps : make it right, puis make it fast. Et entre les deux, une conviction : ce qui n'est pas automatisé finit par être oublié.

---

## Key Takeaways

- **Mesurer avant d'optimiser** : Shine pilote ses parcours critiques au P75/P90/P99 via des transactions Sentry, pas au ressenti.
- **Apollo batche les queries par défaut** : une seule query lente bloque tout l'écran. La sortir du lot a fait gagner près de trois secondes sur la home.
- **Aplatir les navigateurs imbriqués** fait gagner 40 à 50 % de RAM et des FPS — un chiffre mesurable avec Flashlight, donc défendable auprès du business.
- **Une migration transverse a besoin d'un coordinateur** : distribuée dans les équipes, la migration React Navigation 4 → 5 a échoué trois fois.
- **Typer la navigation via la linking config** donne une type safety à 100 % sur les routes et leurs paramètres.
- **La task force temporaire est un format efficace** : objectif chiffré, trois devs, deux mois, puis dissolution.
- **Ce qui n'est pas automatisable ne devrait pas être une règle** : CODEOWNERS, alertes Slack et lint tiennent la qualité mieux que la vigilance de chacun.

---

## Ressources mentionnées

- [Shine — la banque des indépendants](https://www.shine.fr/)
- [Tamagui](https://tamagui.dev/)
- [Omlet — suivi d'adoption de design system](https://omlet.dev/)
- [Flashlight — mesure de performance mobile](https://flashlight.dev/)
- [Sentry — transactions et instrumentation](https://docs.sentry.io/product/insights/overview/transaction-summary/)
- [React Navigation — deep linking](https://reactnavigation.org/docs/deep-linking/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) et [XState](https://xstate.js.org/)
- [L'article de Shine sur sa note dans les stores](https://medium.com/@ababol/how-weve-increased-our-store-rating-to-4-8-4ee8308641f4)

**David Leuliette** → [Twitter](https://x.com/flexbox_) · [BlueSky](https://go.bsky.app/6QQemwz) · [weshipit.today](https://weshipit.today/)

**Corentin André** → [LinkedIn](https://www.linkedin.com/in/corentin-andr%C3%A9-b32526101/)
