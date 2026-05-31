# React Native Skia et WebGPU : le futur du rendu graphique mobile

Imaginez une librairie graphique née d'une frustration de YouTubeur. C'est exactement l'histoire de React Native Skia. Dans cet épisode du Crossplatform Show, David Leuliette reçoit William — créateur de React Native Skia et contributeur majeur sur WebGPU — pour une plongée technique sans filtre dans les entrailles du rendu graphique mobile.

Comment passe-t-on d'OpenGL, avec son état global ingérable, à WebGPU et ses compute shaders révolutionnaires ? Comment React Native Skia communique-t-il avec Hermes sans sacrifier les performances ? Et surtout : à quel moment un développeur mobile doit-il sortir les primitives graphiques avancées plutôt que rester sur des vues React Native classiques ? Ce sont les questions auxquelles William répond avec une clarté remarquable — et une passion communicative.

---

## De YouTube à l'open source : comment React Native Skia est né

William n'a pas commencé par vouloir créer une librairie. Après un premier job en back-end à Zurich, il découvre React Native à sa sortie et y voit immédiatement un parallèle fascinant avec les bases de données sur lesquelles il travaillait : le modèle de snapshots et de diffs de React ressemble, structurellement, à ce qu'il faisait côté données. JSX lui rappelle même un langage XML intégré qu'il utilisait au quotidien.

Il se lance en indépendant et crée la série YouTube **"Can It Be Done in React Native"** — un défi : reproduire n'importe quel écran en React Native. Après plus de 200 vidéos, la réponse est claire : 90 à 95 % des effets visuels sont faisables.

Mais un déclencheur inattendu change tout. En utilisant **Remotion** (un outil pour créer des vidéos avec React) pour produire ses propres vidéos YouTube, William se retrouve face à un canvas web sans aucune des limitations de React Native. La frustration devient moteur.

> "Au bout d'un moment, on s'est dit : c'est cool, c'est un jeu. Mais peut-être faudrait vraiment faire ça dans la vraie vie. Et c'est comme ça qu'on a commencé React Native Skia." — William

L'ignorance initiale de William sur le fonctionnement interne des moteurs graphiques s'est révélée être une bénédiction : plutôt que d'inventer son propre moteur par passion, l'équipe a choisi une solution mature et éprouvée — **Skia**, le moteur graphique open source de Google Chrome.

---

## OpenGL, WebGPU, Metal, Vulkan : comprendre la stack graphique moderne

React Native Skia ne peut pas se comprendre sans saisir l'évolution de l'outillage graphique bas niveau. William explique pourquoi OpenGL pose problème fondamentalement : c'est un **global state**. Dans un contexte comme Skia, où plusieurs canvas tournent simultanément, ce global state devient un cauchemar — pour les développeurs comme pour les drivers qui tentent d'optimiser les performances.

WebGL n'arrange pas les choses : c'est une API C exposée telle quelle en JavaScript, sans promesses, sans abstractions modernes. **WebGPU**, en revanche, est une API pensée nativement pour JavaScript, avec des promesses et une architecture alignée sur le fonctionnement réel des GPU modernes.

Le vrai tournant de WebGPU, c'est l'ajout des **compute shaders** — des programmes qui permettent des calculs généraux sur GPU (GPGPU), bien au-delà du simple rendu de triangles. Modèles de machine learning, simulations physiques, effets visuels autrefois impossibles : le champ des possibles explose littéralement.

> "Les contraintes, c'est bien, sinon ça donne les règles du jeu. Et je trouve que les mecs qui ont designé WebGPU ont vraiment du talent." — William

Sur mobile, Metal (iOS) et Vulkan (Android) jouent le même rôle que DirectX sur Windows : ce sont les API bas niveau qui permettent aux drivers d'être plus rapides. WebGPU s'appuie sur eux en coulisses, offrant aux développeurs une abstraction cohérente et moderne — sans avoir à gérer les spécificités de chaque plateforme.

---

## Comment React Native Skia s'intègre dans l'infrastructure React Native

C'est là que la magie — et la complexité — opèrent vraiment.

### Hermes, garbage collection et gestion mémoire

React Native Skia tourne sur **Hermes**, le moteur JavaScript de React Native. L'équipe génère automatiquement les bindings C++ à partir des types TypeScript de l'API WebGPU, grâce à la librairie **ts-morph**. Le C++ moderne se mappe élégamment sur JavaScript : un type `string | null | Foo | Bar` devient un `std::optional<std::variant<Foo, Bar>>` en C++, sans friction.

Le vrai défi, c'est la **gestion mémoire**. Hermes ne sait pas qu'un objet Skia peut représenter 60 MB de ressources GPU — pour lui, c'est juste un pointeur. L'équipe doit donc fournir une estimation de la mémoire consommée pour que le garbage collector se déclenche au bon moment. La solution s'est inspirée de WebAssembly, confronté au même problème.

### L'architecture immutable : la clé des performances

Pour communiquer avec React Native, Skia utilise un **reconciler custom**. Vous écrivez vos composants comme en React classique (`<Canvas>`, `<Group>`, `<Path>`), et Skia transforme ça en instructions de dessin optimisées. L'équipe est passée d'un modèle mutable (ajout de nœuds) à un modèle **immutable** — exactement le même chemin qu'a emprunté React Native lui-même avec la nouvelle architecture. Résultat : 60 FPS fluides, même avec des animations complexes.

Pour WebGPU, la décision a été plus radicale : abandonner la rétrocompatibilité avec l'ancienne architecture React Native. Ce choix, imposé par le standard W3C, a permis de corriger de nombreux bugs et de poser des bases solides — une contrainte subie qui s'est transformée en avantage structurel.

---

## React Native Skia dans la pratique : quand et comment l'utiliser

La question que se posent tous les développeurs : quand faut-il sortir React Native Skia plutôt que des vues classiques ?

William donne une réponse directe : **dès que vous voulez des effets visuels** que React Native ne peut pas faire nativement — shaders, blurs avancés, filtres d'image, animations complexes, géométries personnalisées (paths SVG animés). C'est aussi le bon choix pour tout ce qui demande une composition fine de primitives graphiques dans le même runtime.

Quelques points pratiques pour démarrer :

- **Lottie via Skottie** : React Native Skia embarque sa propre implémentation de Lottie. Vous pouvez composer des animations avec d'autres dessins Skia, changer dynamiquement les couleurs, les textes, les polices — le tout dans le même canvas.
- **TypeGPU** : pour écrire des shaders directement en TypeScript, c'est la librairie à surveiller. Elle permet de rester dans un environnement JavaScript tout en accédant à la puissance du GPU.
- **Shader Toy** : la communauté de référence pour l'inspiration sur les shaders. Un site au design brutalement old school, mais dont la popularité — malgré des contraintes techniques gigantesques — prouve la puissance des créations et de la communauté qui les produit.

Sur la comparaison **Flutter vs React Native Skia** : Flutter redessine tout depuis zéro sur chaque plateforme. Quand iOS sort un nouveau design système comme le Liquid Glass, React Native en hérite immédiatement via le rendu natif. Flutter doit le réimplémenter manuellement. Deux philosophies, deux compromis radicalement différents.

---

## L'avenir : WebGPU dans React Native et la phase 3

WebGPU dans React Native est déjà disponible et fonctionnel. Parti en mode expérimental, le module a gagné en maturité ces derniers mois. William travaille actuellement sur quelque chose d'ambitieux : **faire tourner Skia et WebGPU dans le même runtime**.

Concrètement, une texture WebGPU pourra alimenter une scène Three.js, elle-même composée dans un canvas Skia — le tout sans copie de données, car ils partagent le même environnement d'exécution. Chaque librairie supplémentaire intégrée profite automatiquement de ce runtime commun.

> "On part du web pour aller en React Native, et après on dit : ce qu'on a, c'est mieux que le web. Et on retourne vers le web. Ça c'était la phase 2. Et là on va passer à la phase 3." — William

La prochaine vidéo de William s'appellera **"Drawn Together"** — un titre qui résume à lui seul l'ambition de cette phase 3.

---

## Conclusion

React Native Skia n'est pas qu'une librairie graphique. C'est l'histoire d'un développeur qui a suivi sa curiosité — de YouTube à l'open source, de l'open source aux standards web, et maintenant vers un runtime graphique unifié sur mobile. Et le résultat dépasse largement le point de départ.

Si vous voulez explorer, commencez par [Shader Toy](https://www.shadertoy.com) pour l'inspiration, parcourez la doc Skia pour les exemples Skottie, et testez TypeGPU pour écrire vos premiers shaders en TypeScript.

---

## Key Takeaways

- React Native Skia est né de la frustration face aux limitations graphiques de React Native, cristallisée par l'usage de Remotion pour produire des vidéos YouTube.
- WebGPU remplace avantageusement OpenGL en supprimant le global state, en introduisant une API JavaScript native, et en ouvrant les compute shaders pour des calculs GPU généraux.
- Skia s'appuie sur Hermes via des bindings C++ auto-générés depuis les types TypeScript, avec une estimation mémoire fournie au garbage collector pour chaque objet GPU.
- Le modèle immutable du reconciler Skia — aligné sur la nouvelle architecture React Native — est ce qui garantit des animations fluides à 60 FPS.
- React Native Skia est à privilégier pour les effets visuels avancés (shaders, blurs, filtres, paths SVG animés) que les vues natives ne peuvent pas reproduire.
- Skia et WebGPU partagent bientôt le même runtime dans React Native, permettant des compositions multi-librairies sans copie de données ni overhead.
- Les contraintes imposées par les standards (W3C pour WebGPU, nouvelle architecture React Native) se sont révélées être des forces : elles ont forcé des choix d'architecture solides et simplifié la gestion des ressources.
