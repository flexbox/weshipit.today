# This Week in React : la veille React qui filtre tout

Chaque jeudi, des milliers de développeurs React et React Native reçoivent dans leur boîte mail une newsletter qui leur épargne des heures de veille. C'est **This Week in React**, et derrière elle se trouve Sébastien Lorber — mainteneur de Docusaurus chez Meta et curateur compulsif de l'écosystème React depuis 2019.

Dans cet épisode du Crossplatform Show, David Leuliette et Ludwig reçoivent Seb pour décortiquer l'envers du décor : comment passe-t-on d'un script de Bunny Hop sur Counter Strike à un job chez Meta ? Comment filtre-t-on l'information pertinente parmi 500+ sources RSS ? Et pourquoi le composant `<Activity>` de React 19 va-t-il transformer la gestion de la navigation dans vos apps React Native ? Plongée dans la tête d'un curateur d'élite — et quelques opinions tranchées sur pourquoi les release notes publiées uniquement sur Twitter, c'est un vrai problème.

---

## De Counter Strike à Meta : le parcours inattendu de Sébastien Lorber

Sébastien Lorber n'a pas appris à coder à 10 ans. Tout a commencé par un alias sur Counter Strike — un script qui enchaînait deux ou trois commandes pour automatiser le Bunny Hop. Son premier programme, écrit entre 12 et 15 ans.

La suite : scripts IRC, fichiers hébergés entre serveurs FTP, et une fascination croissante pour ce qu'on pouvait faire avec quelques lignes de code sans vraiment comprendre pourquoi ça marchait. Il intègre une école d'ingénieur en visant la sécurité informatique, avant de bifurquer vers le développement — d'abord en Java chez Voyage SNCF, puis dans une startup où il devient lead CTO pendant cinq ans.

C'est là qu'il découvre React dès 2013, sur un prototype qui remplace Backbone. Lui qui travaillait principalement en Scala côté backend se retrouve à apprendre le front pour aider son équipe. Sa passion pour React est née — et elle ne s'est plus éteinte.

En 2017, il quitte la startup, rejoint un collectif de freelances et commence à valoriser son expertise React, alors encore rare sur le marché français.

---

## Comment This Week in React est née : du post LinkedIn à Meta

La newsletter n'était pas dans le plan. En 2019, Sébastien commence à poster chaque jour sur LinkedIn — un article commenté pendant une séance de vélo, un insight React glané dans un blog obscur. À une époque où peu de développeurs faisaient ça en français, il se démarque rapidement et se bâtit une audience locale.

Quand son entourage lui suggère de créer une newsletter pour s'affranchir de l'algorithme LinkedIn, il lance **This Week in React** en 2020 avec déjà 500 abonnés le premier jour — convertis directement depuis LinkedIn — et un millier à la fin de la semaine.

La vraie rupture arrive d'un tweet inattendu : le directeur de l'open source chez Facebook cherche un freelance pour travailler sur Docusaurus. Le profil recherché ne colle pas vraiment — poste à temps plein, aux États-Unis, pour trois mois. Seb répond quand même, et surtout, soumet deux ou trois pull requests sans qu'on lui demande rien.

> "Si tu veux travailler sur un projet open source financé par une entreprise, tu peux déjà faire le travail gratuitement pour leur montrer que tu en es capable. Une fois que tu leur as prouvé ça, il n'y a aucune raison qu'ils ne te paient pas." — Sébastien Lorber

Deux mois plus tard, il travaille pour Meta sur Docusaurus. Cinq ans après, il y est toujours, en full remote, avec une mission longue durée qu'il n'avait pas anticipée.

---

## Le workflow de curation de This Week in React : 500+ sources, zéro bruit

Produire une newsletter exhaustive sur l'écosystème React prend deux jours pleins par semaine — confirmé par ses partenaires de contenu Software Mansion et Theo Do, qui y consacrent exactement le même temps. C'est une activité à temps partiel incompressible.

### Les trois piliers de la veille de Seb

**1. Les flux RSS via InnoReader.** Sébastien est abonné à plus de 500 blogs et sites agrégés au même endroit. InnoReader permet aussi de monitorer des sites sans flux RSS natif via des sélecteurs CSS ou des chemins XPath. Les newsletters concurrentes y sont également intégrées : si l'une d'elles trouve un article qu'il a manqué, il ajoute la source à sa liste pour ne plus la rater.

**2. Les autres newsletters.** Non pas pour copier, mais pour découvrir de nouvelles sources. Aujourd'hui, la dynamique s'est inversée : c'est This Week in React qui est relayée par les autres. Seb trouve en premier, les autres suivent.

**3. Les releases et pull requests GitHub.** Avec un problème majeur : les projets actifs génèrent des centaines de releases, nightly builds inclus. Un filtre par type de release serait idéal — mais aucun outil ne le fait encore de manière satisfaisante.

### Signal vs bruit : comment choisir quoi publier

La ligne éditoriale est simple : prioriser ce qui touche le plus grand nombre. Un tutoriel WordPress + GraphQL + Next.js ? Trop spécifique. Une PR mergée dans React Native Core ? Priorité haute. This Week in React ne prétend pas tout couvrir — TypeScript a ses propres newsletters, les features JavaScript avancées aussi. La newsletter se concentre sur React Core, React Native Core et les news à fort impact sur la communauté.

---

## Release notes sur Twitter : un appel à l'action pour les mainteneurs

C'est le sujet qui fait sortir Sébastien de sa réserve. De plus en plus de développeurs communiquent sur leurs features uniquement via Twitter/X — de belles vidéos, des démos léchées. Mais les release notes officielles sur GitHub restent incompréhensibles : un titre vague, une liste de hashes de commits, aucun contexte.

> "Il ne faut pas que la ressource canonique de ta release soit moins belle ou moins compréhensible que ce que tu postes sur Twitter. Si tu as posté une vidéo sur Twitter, poste-la aussi dans tes release notes." — Sébastien Lorber

Le problème est concret : quelqu'un sans compte Twitter ne peut pas voir les liens dans un thread. Si la ressource de référence est un tweet, une partie de la communauté est exclue. Et pour les curateurs comme Seb, il devient impossible de faire un lien utile vers quelque chose qui n'a aucun sens sans son contexte social.

La solution ne nécessite aucun outil spécifique : GitHub Releases supporte les vidéos par drag & drop, les descriptions en Markdown, les screenshots. Un changelog soigné peut être aussi percutant qu'un post Twitter — et surtout, il reste accessible à tous, indexable, et abonnable via RSS.

---

## React Activity : pourquoi ce composant va transformer React Native

C'est le sujet technique que Sébastien voulait absolument aborder — et qui est particulièrement prometteur pour les développeurs React Native, même si le composant n'est pas encore disponible dans les versions stables (il est apparu dans React 19.2).

### Le problème qu'Activity résout

Dans une stack de navigation React Native, les écrans s'empilent les uns sur les autres. Quand un state partagé change — typiquement le prix dans un flow de checkout — tous les écrans de la stack peuvent se re-rendre, même ceux qui sont cachés. Résultat : des performances gaspillées sur des composants invisibles.

Des solutions existent, comme React Freeze de Software Mansion, qui bloque les re-renders sur les écrans cachés. Mais l'inconvénient est immédiat : quand l'utilisateur revient en arrière, l'écran n'est plus à jour et doit se recalculer avant d'être affiché.

### Ce que Activity change concrètement

Avec `<Activity>`, React peut rendre les écrans cachés **en tâche de fond**, avec une priorité basse. Conséquences directes :

- Les animations et interactions sur l'écran visible gardent leurs 60 FPS sans être bloquées par des renders d'arrière-plan.
- Les tabs cachés peuvent être pré-rendus silencieusement — quand l'utilisateur clique sur un tab, le contenu s'affiche instantanément car il était déjà prêt.
- Le bouton back ramène sur un écran à jour, sans délai de recalcul visible.

> "Activity va permettre de résoudre ça de manière plus propre : tu donnes la priorité à ton écran visible, et tous ceux qui sont derrière se rendent en background avec une priorité plus faible." — Sébastien Lorber

La bonne nouvelle pour les développeurs : ils n'auront probablement pas grand chose à faire. Activity devrait être intégré directement dans React Navigation, qui gérera l'optimisation en coulisses.

---

## React Native en 2026 : vers une API surface enfin stable

Sur la question de la version 1.0 de React Native, Sébastien est direct : ça n'arrivera probablement pas en 2026 — le calendrier publié des releases s'étend jusqu'à la 0.89. Mais l'enjeu n'est pas vraiment le numéro de version.

Ce qui compte, c'est la **définition claire de l'API surface** — savoir précisément ce qui est public, ce qui est interne, et ce qui constitue réellement un breaking change. C'est le prérequis au semantic versioning propre. Sans cette définition, impossible de promettre qu'une mise à jour mineure ne cassera rien.

Le travail est en cours. Les deep imports non documentés sont progressivement supprimés, côté JavaScript comme côté natif. Le parallèle avec Docusaurus 3 est éclairant : neuf releases mineures sans breaking changes, c'est parfaitement faisable — à condition que la surface publique soit clairement définie en amont.

---

## Conclusion

Cette conversation avec Sébastien Lorber est un rappel que la veille technologique sérieuse ressemble à de l'artisanat plus qu'à de l'automatisation : 500 sources RSS, deux jours par semaine, une ligne éditoriale stricte et une philosophie claire du partage. Et au bout, une newsletter qui permet à des milliers de développeurs de rester à jour en quelques minutes de lecture.

Si vous ne lisez pas encore **This Week in React**, c'est l'excuse qu'il vous fallait. Et si vous maintenez un projet open source : soignez vos release notes autant que vos tweets.

---

## Key Takeaways

- This Week in React est née d'une stratégie de personal branding LinkedIn en 2019 — un post par jour, en français — qui a conduit Sébastien Lorber chez Meta en tant que mainteneur de Docusaurus, via des pull requests soumises sans qu'on le lui demande.
- Le workflow de curation repose sur 500+ sources RSS via InnoReader, les newsletters concurrentes comme sources de découverte, et une surveillance manuelle des releases et pull requests GitHub.
- Produire une newsletter exhaustive demande deux jours pleins par semaine — un minimum confirmé par les partenaires Theo Do et Software Mansion qui gèrent certaines éditions.
- Le composant `<Activity>` de React 19 est particulièrement prometteur pour React Native : il permet de rendre les écrans cachés en tâche de fond avec une priorité basse, sans bloquer les animations et sans sacrifier la fraîcheur des données à la navigation.
- Communiquer uniquement via Twitter sur les nouvelles features est un problème d'accessibilité réel : les release notes GitHub doivent être aussi soignées que les posts sociaux — vidéos et descriptions comprises.
- La version 1.0 de React Native n'est pas prévue en 2026, mais le travail de clarification de l'API surface publique est en cours — condition nécessaire pour tenir les promesses du semantic versioning.
- La philosophie de Sébastien — donner en premier, que ce soit du contenu gratuit, des pull requests ou le paiement immédiat des factures — est ce qui lui a ouvert ses meilleures opportunités professionnelles.
