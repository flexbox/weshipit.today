# React Native vs Kotlin Multiplatform : avis d'un dev natif

Il y a des invités qui arrivent avec un post LinkedIn énervé. Développeur depuis ses 10 ans — il a commencé sur le navigateur de sa 3DS, sur OpenClassrooms — puis natif iOS et Android pendant des années, Nathan Fallet a rejoint il y a six mois un associé qui construisait ControlResell, en React Native. De quoi transformer le débat React Native vs Kotlin Multiplatform en expérience quotidienne, les deux stacks en production.

Dans cet épisode du Cross Platform Show, David Leuliette dissèque avec lui la stack de ControlResell : un build de staging envoyé par erreur sur les stores, 2000 erreurs TypeScript dans une app déjà en prod, et trois librairies qui ont sauvé le projet.

---

## ControlResell : tout automatiser sauf les photos

ControlResell s'adresse aux personnes qui vivent de la vente en ligne de seconde main. L'objectif : réduire au minimum le temps entre « j'ai un article » et « il est en vente partout ». L'utilisateur prend ses photos — seule étape encore manuelle. Ensuite l'app génère la description, prend les mesures, publie l'annonce sur Vinted, Le Bon Coin, Shopify ou Vestiaire Collectif, répond aux messages de négociation, et crope automatiquement le bordereau d'expédition en y ajoutant un repère dans le coin — pour savoir, à l'impression, quel bordereau va avec quel article. Chaque compte plateforme appartient au vendeur : il le connecte, et le serveur fait le travail.

> "Notre ambition c'est vraiment de tout automatiser pour que quand tu vends un article, tu prennes quelques photos, tu imprimes ton bordereau, et c'est fini." — Nathan Fallet

Ce n'était pas le produit de départ. À l'origine, ControlResell était une app de gestion de stock. C'est la recherche utilisateur qui a provoqué le pivot : les vendeurs en avaient assez de tout ressaisir à la main sur chaque plateforme. Les nouveaux clients se fichent un peu de la partie stock et statistiques — ce qui les intéresse, c'est l'intégration multiplateforme.

Autre choix assumé : aucune expérience web. Tout tient dans le téléphone.

> "Si ça rentre pas dans le téléphone, c'est que nous on a raté quelque chose sur l'expérience utilisateur." — Nathan Fallet

---

## Du natif à React Native : 2000 packages et 2000 erreurs

Le premier choc n'est pas technique, il est mental : la façon de penser son code en React Native vient du web, pas du natif. Le deuxième, c'est le langage. Venant de langages compilés et statiquement typés, Nathan découvre une catégorie de bugs qui, chez lui, n'existent pas. Son exemple préféré : un `state` qui contenait le numéro d'étape d'un écran, `null` quand l'A/B test était désactivé, un entier sinon. Un `if (step)` innocent, et l'étape 0 devient `false`. Le genre de raccourci qui économise quelques caractères et coûte une soirée de debug.

Le troisième choc est arrivé en lançant `tsc` : environ 2000 erreurs remontaient — sur une application déjà en production.

> "T'envoies un truc qui a des erreurs de partout en production, et après il y a des bugs partout dans l'appli. Faut pas s'étonner." — Nathan Fallet

Depuis, l'équipe a durci la configuration TypeScript au maximum, ajouté ESLint, et réduit énormément le nombre d'erreurs. Sur le nouveau code, les bugs ont chuté. Il reste des zones où corriger l'erreur imposerait de repenser tout le morceau, construit sur des acrobaties borderline du langage.

Le dernier point de friction est structurel : un `npm install` installe environ 2000 packages, pour une app qui ne fait pourtant pas tant de choses. En Kotlin Multiplatform ou en natif, on est plutôt sur 10 à 20 dépendances.

> "Tu dépends de 2000 librairies, et 2000 librairies c'est beaucoup de points potentiels où il peut y avoir des bugs." — Nathan Fallet

---

## Zustand, Zod et injection de dépendances

Quand Nathan arrive, tout est mélangé dans les écrans : states, fonctions, logique métier. Il tente d'abord des contextes et des providers, mais le problème reste entier : `useState` impose d'attendre un re-render pour lire la valeur, `useCallback` capture d'anciennes valeurs — les filtres de l'écran d'accueil étaient appliqués avec un cran de retard — et les `useEffect` bouclent à l'infini dès qu'on ajoute la bonne dépendance.

**Zustand** a été le soulagement. Un store est un objet externe : les fonctions ne sont pas recréées à chaque rendu et on y accède toujours à la dernière valeur du state. Pour quelqu'un qui vient du natif, c'est très proche d'un viewmodel. Le découpage est volontairement fin : un store par section, plus des stores créés à la volée et scopés à un écran — une conversation de messagerie a le sien, détruit au retour arrière.

**Zod** couvre l'autre angle mort, le typage dynamique. TypeScript affirme qu'une réponse d'API a telle forme, et trois écrans plus loin on récupère un `undefined`. Toutes les entrées et sorties passent donc par Zod. Comme les modèles sont définis côté backend en Kotlin, Nathan a écrit un plugin qui génère les schémas Zod depuis ces modèles : un `npm install` et tout est à jour. Le générateur alimente aussi les modèles Python, utilisés pour l'IA et l'analyse d'images.

**L'injection de dépendances**, enfin, a été mise en place un peu partout. En natif c'est un standard ; en React Native, il a trouvé très peu de monde qui pratiquait. L'enjeu est le test : quand tout est imbriqué, tester une brique revient à tester la grappe entière, et le nombre de cas se multiplie au lieu de s'additionner.

---

## Le jour où le staging est parti en production

Le pire souvenir du projet porte un nom : la mise à jour d'Expo SDK 51 vers 52.

L'app a une build de staging et une build de production dont la seule différence est une variable d'environnement. Après la mise à jour, un problème de cache a fait que la production embarquait la configuration de staging. Personne n'a vérifié : la CI n'avait pas bougé. Jusqu'aux messages d'utilisateurs expliquant que leurs données avaient disparu.

Nathan a téléchargé l'IPA depuis l'App Store et l'a décompilé pour lire le `bundle.js` et comprendre où tapaient les requêtes. Correctif d'urgence : faire pointer le DNS du domaine de staging vers la prod, puis réparer la CI. Aujourd'hui, vider le cache dans la CI se fait en lançant `--reset-cache` en tâche de fond, en attendant cinq secondes, puis en tuant le process.

Même mise à jour, deuxième surprise : le splash screen s'est retrouvé minuscule au milieu de l'écran — sur iOS **et** sur Android. La documentation annonçait une configuration identique une fois déplacée vers le plugin `expo-splash-screen`. Elle ne l'était pas. La solution, une clé `legacy` non documentée, est venue d'un membre de l'équipe Expo sous un post Reddit.

> "Tu changes la mineure d'Expo, et ça y est, il y a tout qui est cassé." — Nathan Fallet

Sa comparaison est brutale : au passage de Kotlin 1 à Kotlin 2, avec un changement complet de compilateur, il a modifié un numéro de version et ajouté une clé dans son fichier Gradle. Rien d'autre.

---

## Tester sur de vrais devices, toujours

Le reste de la stack est sobre : React Navigation (avec la friction des navigateurs imbriqués, sensible sur le deep linking où le bouton retour ne ramène pas où on croit), un mélange de Tailwind et de `StyleSheet`, une librairie de composants maison tirée des maquettes Figma qui font office de source de vérité, Reanimated sur la caméra et les bottom sheets. Pas d'animations décoratives : l'utilisateur doit passer le moins de temps possible dans l'app.

Nathan, lui, ne développe plus sur simulateur depuis des années — trop de choses n'y existent pas, caméra et notifications en tête. Il a une flotte de téléphones, dont un connecté au compte d'un client pour reproduire ses bugs à l'identique. D'autant que l'équipe teste surtout sur iPhone : dernier bug en date, la sélection de photos renvoyait une URI préfixée `file://` sur iOS, et le chemin nu sur Android. Un seul client est sur Android, et c'est lui qui l'a trouvé.

---

## React Native vs Kotlin Multiplatform : le verdict de Nathan

Pour une nouvelle app, il partirait sur Kotlin Multiplatform — son associé, lui, défendrait React Native. Ses arguments ne sont pas ceux qu'on attend : les grosses librairies Android sont déjà compatibles, un développeur Android natif est immédiatement opérationnel, et la légèreté de la stack se paie en stabilité.

Ce que l'épisode raconte surtout, c'est ce qu'un regard natif fait à un projet React Native : typage strict non négociable, logique séparée de la vue, injection de dépendances pour rendre les tests possibles, validation à chaque frontière, vérification de la build de production même quand rien n'a bougé. Aucune de ces pratiques n'est spécifique à Kotlin — elles sont simplement plus faciles à oublier quand l'écosystème ne les impose pas.

---

## Key Takeaways

- **ControlResell automatise tout sauf les photos** : description, mesures, publication multiplateforme, négociations et découpe des bordereaux d'expédition.
- **Le pivot vient de la recherche utilisateur** : de la gestion de stock à l'intégration multiplateforme, réclamée par les vendeurs.
- **Un `tsc` qui remonte 2000 erreurs en production est un signal, pas un détail** : durcir TypeScript et ajouter ESLint a fait chuter les bugs.
- **Zustand règle les problèmes de `useState` et `useCallback`** : store externe, fonctions stables, dernière valeur du state toujours accessible.
- **Générer les schémas Zod depuis les modèles du backend Kotlin** supprime les désynchronisations client/serveur — le même générateur alimente les modèles Python.
- **Une mise à jour d'Expo peut expédier votre build de staging en production** : vérifier la build de prod même quand la CI n'a pas bougé.
- **Tester sur de vrais devices et sur les deux plateformes** : le même appel d'API renvoie une URI `file://` sur iOS et un simple chemin sur Android.
