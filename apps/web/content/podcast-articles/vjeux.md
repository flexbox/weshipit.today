# Les origines de React Native racontées par son co-créateur vjeux

En 2015, une poignée d'ingénieurs de Facebook prend une décision qui va définir la façon dont des millions de développeurs construisent des applications mobiles pour la décennie suivante. Dix ans plus tard, React Native tourne dans les applications de Meta, Microsoft, Shopify et bien d'autres. Pour revenir aux origines de React Native, David Leuliette reçoit dans le Cross Platform Show Christopher Chedeau — alias **vjeux**, ingénieur français chez Meta, co-créateur du framework et créateur de Prettier, Excalidraw et Yoga.

Tout part d'une frustration concrète : développer en iOS était alors insupportable. On verra comment vjeux a cherché le dénominateur commun entre les plateformes, pourquoi le framework se résume à trois composants, comment Yoga est né pendant un congé parental, et ce qu'il pense du dev mobile assisté par LLM en 2026.

## Aux origines de React Native : « HTML5, la plus grosse erreur de Facebook »

Tout commence par un traumatisme. Recruté en France pour rejoindre la Silicon Valley, vjeux assiste à sa première grosse conférence, TechCrunch Disrupt, où Mark Zuckerberg lâche que parier sur HTML5 fut la plus grosse erreur jamais commise par la boîte.

> "Il dit que tout ce que moi j'aimais avec le web, c'était une grosse erreur. Du coup, j'ai réévalué toutes mes décisions de vie." — vjeux

La direction bascule vers le natif. Facebook offre une semaine de formation iOS, et vjeux touche le vrai problème. Trois douleurs le marquent : le **temps de compilation** à chaque changement ; l'**impossibilité de partager** son travail, sans TestFlight à l'époque ; et le **positionnement manuel** de chaque pixel, top, left, width et height calculés à la main. Venant du web et de son hot reloading, il trouve ça horrible. Jordan Walke, l'inventeur de React, est justement dans les parages : ensemble, ils lancent le projet.

## Trois primitives pour tout unifier : View, Text et Image

Le vrai travail commence par une question : quel est le dénominateur commun entre iOS, Android et le web ? Le principe structurant : si un fichier importe quelque chose de spécifique à une plateforme, il devient spécifique — et tous ceux qui l'importent aussi. Pour espérer le moindre cross-platform, la brique de base doit être générique.

Il épluche alors les bibliothèques de composants des trois plateformes. Sa découverte : les composants de base ont partout les **mêmes propriétés**, seulement nommées différemment. Il y a toujours un moyen de dessiner un rectangle, d'écrire du texte, de définir police, bordure et fond. De là naît la décision fondatrice : trois composants primitifs — **Image, Text et View** — que l'on compose à l'infini, complétés par la réutilisation des composants natifs plus riches comme les navigations animées d'iOS. Le directeur n'y croit pas : « Tu vas jamais y arriver. » Six mois plus tard, il reconnaît : « Tu avais raison. »

## Le bridge asynchrone, autre décision fondatrice des origines de React Native

Impossible de parler des origines de React Native sans le bridge asynchrone entre JavaScript et natif. Le referait-il ? vjeux est catégorique : c'était la bonne décision. React Native recrée tout un écosystème : le réécrire d'un coup serait irréaliste, et le bridge a permis de **réutiliser énormément de choses**.

L'exemple est parlant : au début, pas de debugger JavaScript. La solution ? Faire tourner le JavaScript de React Native dans le navigateur, qui communique avec le téléphone via WebSockets — et l'on récupère gratuitement tous les dev tools, breakpoints, console, vrai debugger. La même architecture a aussi ouvert la voie à Facebook Lite pour les appareils peu puissants. Le trade-off, c'est la **latence** : impossible d'enchaîner des allers-retours JavaScript–natif ultra-rapides, ce qui interdisait certaines animations complexes façon Skia. Mais pour vjeux, ce n'était qu'une optimisation à repousser — faite dix ans plus tard.

## Yoga, un moteur de layout né d'un congé parental

L'histoire de Yoga, le moteur de layout de Meta, démarre comme un **hack de congé parental**. vjeux vient d'avoir son premier enfant, au cycle jour-nuit inversé : le bébé dort la journée, ce qui lui laisse du temps pour coder.

Curieux du moteur de layout de CSS, il empile deux div avec margins et paddings sur une page HTML, et écrit un algorithme JavaScript qui reproduit exactement le rendu du navigateur. Il génère aléatoirement des structures DOM sur 10 000 itérations pour débusquer les cas tordus. Au bout d'un mois, il a une implémentation complète et quasiment pure : un objet en entrée, des left, width et height en sortie. Alors, avec des **regex**, il convertit son fichier JavaScript en Java et en C pour le faire tourner côté natif. Plus tard, un ingénieur Android le réimplémente proprement en C++. Yoga était né — non d'une grande architecture, mais d'un hack devenu utile.

## Quelle stack mobile en 2026 : React Native, Flutter ou Expo ?

On débat sans fin de la « bonne stack ». vjeux calme le jeu :

> "En pratique, c'est pas ce qui fait ou ce qui fait pas ton business." — vjeux

Un business peut réussir sur React Native, Flutter, natif ou web ; ce qui compte, c'est la distribution. Selon les stats d'Evan Bacon (Expo), 10 à 40 % des top 100 apps de l'App Store utilisent React Native. Côté IA, Replit, le Claude Code Mobile d'Anthropic et v0 sont tous en React Native.

La vraie différence avec Flutter ? L'**intégration native**. Avec React Native, un simple wrapper autour d'un composant iOS ou Android suffit et on n'est jamais bloqué ; Flutter, qui contrôle tout le rendering, gagne en performance mais rend l'interopérabilité native plus difficile. Et si vjeux lançait une app aujourd'hui ? **Expo** couplé à Claude Code ou Codex : « crée-moi une application qui fait ça », on lance, on itère.

## Open source et business : le seul modèle qui marche

Prettier, utilisé par 80 % des développeurs JavaScript en 2021, n'a récolté que 200 000 dollars de dons sur toute sa durée de vie. La leçon : ce qui est gratuit ne se monétise pas par les dons. Le vrai modèle, c'est le **SaaS et le hosting** — on ouvre le code client, on fait payer ce qui tourne sur le serveur. Excalidraw le prouve à 7 dollars par mois et par personne ; même logique chez Vercel avec Next.js ou pour Remotion, dans lequel vjeux a investi. Ouvrir son code force aussi à documenter, attire des contributions et facilite le recrutement.

## Coder avec des LLM sans se saboter

vjeux a récemment porté 100 000 lignes de TypeScript en Rust en un mois avec Claude Code, sans avoir jamais fait de Rust. Sa vision reste pourtant lucide :

> "C'est genre un élève super intelligent, mais qui essaie de faire le moins d'efforts possible." — vjeux

Demandez-lui une app mobile : elle la livre, mais avec le strict minimum et « plein de décisions horribles derrière ». Il faut toujours un ingénieur — pas forcément avec le titre — pour penser la séparation entre logique et données. La première heure est magique ; on passe ensuite des semaines à retirer les bêtises, ces derniers 20 % qui font tout le travail.

Le design system que Meta vient d'open sourcer a d'ailleurs été codé via LLM, avec une API **AI Fluent by Design**. La parade contre les hallucinations : un **CLI** que le LLM interroge pour ses composants et props, plutôt que d'empiler le contexte.

## Le développeur mobile en 2030

Que restera-t-il du métier ? Pour vjeux, coder à la main est déjà fini, mais l'essentiel demeure : traduire un besoin produit en logiciel, penser l'architecture, bâtir une app qui survit aux pivots. Trop d'ingénieurs se définissent par le code, alors que le but d'un ingénieur est de résoudre un problème qui existe. Son conseil le plus contre-intuitif : ne jamais demander aux utilisateurs ce qu'ils veulent, mais **ce qui ne marche pas** — puis remonter à la vraie cause avant de proposer des solutions. Une méthode qui vaut aussi pour les agents.

## Conclusion

Le fil rouge de vjeux tient en trois idées : trouver le dénominateur commun, réutiliser plutôt que tout réécrire, et rester obsédé par le problème plutôt que par la technologie.

## Key Takeaways

- **Les origines de React Native** tiennent à une frustration : le natif iOS d'alors imposait compilation lente, partage impossible et positionnement manuel des pixels.
- Le framework repose sur **trois primitives** — Image, Text, View — issues du dénominateur commun entre iOS, Android et web.
- Le **bridge asynchrone** fut une décision fondatrice : réutiliser massivement l'existant, au prix de la latence.
- **Yoga** est né d'un hack de congé parental : un algorithme de layout en JavaScript, converti en Java et C via regex.
- Le choix de stack (React Native, Flutter, Expo) pèse peu sur le succès : **la distribution compte davantage**.
- Le modèle économique open source qui marche, c'est le **SaaS et le hosting** (Excalidraw, Vercel, Remotion), pas les dons.
- Face aux LLM, il faut toujours **un ingénieur derrière** : l'IA fait le minimum, et le vrai travail est dans les 20 % restants.
