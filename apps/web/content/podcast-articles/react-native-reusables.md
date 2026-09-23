# Design system React Native : le vrai coût du fait maison

Aucun CTO ne signe une ligne « design system React Native » dans son budget annuel. Le coût existe pourtant : il est réparti dans les sprints de toute l'équipe, un composant à la fois, et personne ne le voit passer. Pour le chiffrer, David Leuliette reçoit dans le Cross Platform Show Zach Nugent, créateur de **React Native Reusables**, le portage de la philosophie shadcn/ui sur mobile — 8 700 étoiles sur GitHub, aujourd'hui sous Founded Labs.

L'exercice est simple : une équipe de huit développeurs, une app en production, quarante composants maison — boutons, inputs, select, date picker, toasts — tous accessibles et testés. Combien de temps ? La réponse de Zach, et surtout la façon dont il y arrive, explique pourquoi un design system React Native déraille si souvent. On verra le calcul, la couche d'accessibilité que personne ne chiffre, ce que change vraiment le modèle copier-coller, et pourquoi tout ça devient un sujet d'agents IA en 2026.

## Design system React Native : six mois pour huit développeurs

Zach commence par refuser la question, ce qui est déjà une réponse : « Je ne sais pas comment une équipe sans design system du tout peut travailler à huit personnes en même temps sur quelque chose qui n'est pas clair. Mais ça monte vite. »

Poussé à donner un ordre de grandeur, il tranche.

> « Moi, je verrais six mois. Je dirais même plus longtemps s'ils n'ont pas de design system : à huit personnes dessus en même temps, ils vont être obligés de refaire des choses. » — Zach Nugent

Le point important n'est pas le nombre, c'est le mécanisme qui le produit : sans base commune, huit personnes écrivent huit interprétations du même bouton. Le temps ne part pas dans la construction, il part dans la reconstruction.

## Le date picker, l'exemple qui fait exploser les estimations

Pour comprendre d'où viennent les six mois, il suffit de prendre le composant que tout le monde estime à une journée. Un select, puis un date picker qui s'ouvre derrière. Zach et David déroulent la liste de ce qu'il faut réellement couvrir : iOS **et** Android, light mode **et** dark mode, left-to-right **et** right-to-left, le multilingue — parce que les États-Unis n'affichent pas la date comme la France — et le cas du date picker d'anniversaire, qui n'a rien à voir avec un date picker standard.

L'estimation passe d'une journée à trois semaines. Pour un seul composant. « Date, c'est vraiment le pire », concède Zach.

Le même effet joue sur les écrans. Un écran n'est jamais un écran : chargement, erreur, données, donnée unique, gros volume. Quatre ou cinq variations par écran, quarante composants, autant d'états à multiplier. Chaque « c'est juste un » du sprint planning est une semaine-homme qui n'apparaîtra nulle part.

## L'accessibilité, la couche que personne ne chiffre

C'est la partie la plus sous-estimée du calcul. React Native Reusables ne doit pas son adoption à ses styles mais à la bibliothèque qui vit en dessous : **RnPrimitives**, l'équivalent React Native de Radix UI. Trente-deux packages distincts, un peu moins de 4 millions de téléchargements par semaine au total, jusqu'à un demi-million pour le plus populaire d'entre eux.

Son rôle : le VoiceOver, les attributs d'accessibilité, et le comportement des overlays — qui diffère entre iOS et Android. « RnPrimitives, c'est là pour l'accessibilité », résume Zach. Une équipe qui construit ses quarante composants sans cette couche repart de zéro sur chacun d'eux, avec les mêmes bugs à découvrir un par un.

Zach pose une règle au passage : pas de modale dans une modale. Un seul niveau — le genre de contrainte qui évite le ticket « ça ne marche pas sur Android » trois semaines plus tard.

## Copier-coller n'est pas vraiment du copier-coller

La décision structurante de React Native Reusables vient de shadcn/ui : le composant atterrit dans votre dépôt, pas dans vos dépendances. Zach nuance immédiatement le terme, qui prête à confusion.

> « À la place de le mettre dans tes node_modules, tu l'installes dans un autre dossier. Tu peux le modifier tout de suite, c'est ça la puissance. » — Zach Nugent

Concrètement, un CLI télécharge le code dans le projet. Vous prenez le `card` sans le `card body` si vous n'en avez pas besoin. Vous déplacez l'icône avant le titre sans tordre l'API d'une bibliothèque. Vous n'êtes pas bloqué en attendant qu'un mainteneur accepte votre patch — à force de tordre une lib qui ne fait pas tout à fait ce qu'on veut, note David, on finit avec un assemblage immaintenable.

La contrepartie est réelle : pas de mise à jour automatique. Zach la relativise. Ce qui doit être mis à jour, ce sont les primitives, où il s'impose très peu de breaking changes — le plus gros depuis le début a été la suppression du composant Calendar pour réduire la surface du projet. Le reste — View, Text, bouton — suit les mises à jour de React Native lui-même. « Si tu es inquiet par rapport à ça, tu ne l'utilises sûrement pas comme il faut. »

## Un design system React Native tient sur sa base, pas sur ses styles

Au-delà des chiffres, l'argument de fond de Zach est architectural. Il distingue deux niveaux : le primitive, headless, dont le seul rôle est de fournir des styles par défaut qu'on écrase facilement ; puis vos composants métier, construits par-dessus. Confondre les deux, ou empiler des composants les uns sur les autres sans savoir à quel niveau on se trouve, produit du prop drilling à l'infini.

Même logique sur la cohérence des API : si `badge` accepte `destructive` et `primary`, `button` doit accepter exactement la même chose. Quand plusieurs personnes passent sur le projet et posent chacune sa convention, assembler une carte, un bouton et un badge devient un exercice d'archéologie.

Cette incohérence a pris un coût supplémentaire avec les agents. Sur une codebase sans consistance, un LLM s'empoisonne lui-même : il reproduit les patterns existants en croyant bien faire, y compris les mauvais. Un design system n'est plus seulement une affaire de vitesse humaine, c'est le contexte que lisent vos outils.

## Ce que ça change pour les agents : l'annonce catalogs.dev

C'est le prolongement logique du modèle. Un agent ne modifie pas ce qui est dans `node_modules` ; il modifie ce qui est dans votre dépôt. Posséder le code de ses composants, c'est lui donner prise.

Zach profite de l'épisode pour annoncer **catalogs.dev**, sa plateforme de découverte de composants pensée pour les agents.

> « Un agent est beaucoup meilleur à faire du UI s'il a une référence en code. » — Zach Nugent

Le fonctionnement : depuis votre projet, vous demandez à votre agent de chercher sur la plateforme ; il revient avec un lien et des suggestions ; vous validez, vous refusez, vous ajoutez une note par composant — « enlève le rouge en haut à gauche » — et l'agent intègre le code dans le projet en tenant compte de vos contraintes. L'intérêt, selon Zach, est autant économique que qualitatif : chercher du code en ligne coûte énormément de tokens, et partir d'une image fait perdre ce qui ne se voit pas, l'accessibilité en tête. La plateforme se veut agnostique : d'une référence SwiftUI vers un projet Expo, ou d'une base Tailwind v3 vers une autre stack.

## En résumé

Le coût d'une couche UI maison ne se cache pas dans la difficulté technique d'un bouton, mais dans l'accumulation : les variations de plateforme, les états d'écran, l'accessibilité, puis la reconstruction de ce qui a été fait huit fois différemment. Six mois pour une équipe de huit, c'est le plancher, pas le pire scénario. Le modèle copié dans le dépôt ne supprime pas ce travail — il en déplace la propriété, et rend enfin visible une ligne budgétaire que personne n'avait jamais écrite.

## Key Takeaways

- Une équipe de huit développeurs qui construit quarante composants maison accessibles y passe **six mois au minimum**, davantage sans base commune.
- Un date picker réellement complet — iOS/Android, light/dark, RTL, formats de date localisés, cas anniversaire — prend **trois semaines**, pas une journée.
- Un écran se décline en quatre ou cinq états (chargement, erreur, données, donnée unique, volume) : le coût se multiplie avant même d'être estimé.
- **RnPrimitives** porte l'accessibilité de React Native Reusables : 32 packages, près de 4 millions de téléchargements hebdomadaires, VoiceOver et overlays iOS/Android inclus.
- Le modèle copier-coller installe le code dans le dépôt plutôt que dans `node_modules` : modification immédiate, aucun verrouillage, mais pas de mise à jour automatique.
- Distinguer le primitive headless de ses propres composants métier évite le prop drilling ; une API cohérente entre `badge`, `button` et consorts évite la dette.
- Sur une codebase incohérente, un LLM reproduit les mauvais patterns : le design system est devenu le contexte que lisent aussi les agents.
