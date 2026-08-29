# Application universelle React Native : la stack de Mucho

Trois surfaces à maintenir — un site employeur, un site employé, une app mobile — avec une petite équipe. C'est le point de départ du chantier raconté par Lucie Uffoltz, développeuse React Native chez Theodo Apps, dans cet épisode du Cross Platform Show. La réponse : une application universelle React Native, une seule codebase pour le web, iOS et Android.

Derrière cette décision, des choix concrets — Expo Router plutôt que React Navigation, Unistyles plutôt que NativeWind — et des pièges bien réels, comme les calendriers qui refusent de se comporter pareil sur les trois plateformes.

---

## Mucho : centraliser les avantages salariés

Mucho est une plateforme d'avantages sociaux. Au lieu d'enveloppes fléchées — tant pour les vacances, tant pour les loisirs — avec des conditions d'éligibilité qui excluent une partie des employés, l'entreprise verse une somme que le salarié dépense comme il le souhaite. Les tickets restaurant restent à part ; tout le reste est réuni au même endroit.

Le produit existait déjà sous forme de plusieurs sites web — selon qu'on soit employeur ou employé — et d'une application mobile. C'est pour cette raison que Theodo Apps a été contacté : unifier au moins toute la partie employé. Lucie, arrivée chez Theodo Apps (ex-BAM) après son école d'ingénieur et convertie à React Native dès 2021, y a travaillé en full stack, à deux, sur environ trois mois.

---

## Pourquoi une application universelle React Native change l'économie du projet

Une application universelle, c'est une codebase unique dont on partage le maximum entre les plateformes. Un bouton, un formulaire de login : écrits une fois, rendus partout. On perd un peu en vélocité — chaque changement doit être vérifié partout — mais la magnitude de chaque correction est incomparable. Déplacer le symbole monétaire pour gérer le multi-devise sur cinq surfaces, c'est un chantier ; sur une codebase universelle, c'est un commit. Pour Mucho, l'objectif était explicitement le coût de maintenance quotidien, et le passage à l'universel a été facilité par le choix de base : Expo.

> "Quand on est passés en Universal App, Expo c'était super. Tu regardes la doc, je crois que tu as une ou deux commandes à lancer et c'est fini." — Lucie Uffoltz

Le contraste est net avec l'expérience précédente de Lucie : quatre ans plus tôt, la même chose avec React Native Web demandait encore de la configuration Webpack.

Autre décision structurante : ne pas passer par Solito pour faire cohabiter la codebase Next.js existante et l'app mobile. Les deux étant petits, l'équipe est partie directement de la codebase mobile pour la rendre compatible web. Le server-side rendering de Next, précieux pour le SEO, n'avait ici aucune valeur : les employés arrivent avec un compte d'entreprise, pas depuis Google.

---

## La stack technique, brique par brique

**State management : Zustand**, avec un usage minimal sur une app restée proche d'un MVP — essentiellement l'état d'authentification, pour éviter d'aller vérifier les tokens à chaque fois.

**Data fetching : React Query**, avec un détail qui compte : Suspense. Plutôt que de récupérer les états de loading de chaque query et de les combiner à la main, la query déclenche elle-même le chargement et l'app tombe sur un fallback défini à l'avance.

**Navigation : Expo Router**, et pas React Navigation. La raison est cohérente avec le reste : le site web était en Next.js, l'équipe retrouvait donc le même routing par fichiers. Un fichier créé, une page.

**Stockage : MMKV**, pour les tokens et ce qui doit persister.

**Animations : Reanimated**, avec parcimonie — quelques micro-interactions, un switch animé. Pas côté web, où l'ajout au bundle a un coût et où une animation CSS reste plus optimisée.

---

## Unistyles : styler une application universelle sans passer par Tailwind

Le choix le moins évident, c'est le styling : le site web était en Tailwind, ce qui rendait NativeWind logique. L'équipe est pourtant partie sur **[Unistyles](https://www.unistyl.es)**.

L'argument principal : les breakpoints. Quand on fait du web et du mobile dans la même codebase, pouvoir les définir à un seul endroit puis piloter le style en fonction change la vie. On définit ses variables — 100, 200, 300, 400 — et on manipule ensuite des XL, MD, LG. S'ajoutent les variants de composants, les media queries, les fonctions dynamiques : tout ce qui manque à une StyleSheet classique, dans une librairie qui reste très optimisée pour le web.

Et une réserve de fond sur Tailwind, que Lucie assume comme un parti pris.

> "Sur Tailwind, je n'aime pas trop le fait que ce soit si facile de mettre un style qui n'est pas lié à ton design system. Et après tu te retrouves avec des trucs avec mille couleurs." — Lucie Uffoltz

Sans compter le coût d'entrée : des classes raccourcies et des numéros dont il faut connaître la correspondance.

---

## Là où l'universel fait mal : les composants natifs

Les petites différences entre plateformes se gèrent dans le style, via les breakpoints. Les grosses, en séparant les fichiers : `monfichier.web.tsx` à côté du composant mobile — le bundler étant assez intelligent pour ne pas embarquer ce qui n'est jamais importé côté web.

Le vrai point de douleur, ce sont les composants « natifs », ces dumb components qui ne se comportent pas pareil selon la plateforme. Les calendriers en particulier : Lucie s'est mordu les doigts pour obtenir un rendu cohérent, avec ce genre de surprise — Expo appliquait un style global aux composants web, qui écrasait celui de sa modale de calendrier au point de l'afficher en arrière-plan. Reste à regarder ce qui est compatible et à trouver le meilleur compromis. Storybook aurait aidé à isoler ces composants ; c'était l'étape suivante.

---

## Les cinq librairies que Lucie recommande

Au-delà de Mucho, les briques qui reviennent sur tous les projets : des dates, de la traduction, des formulaires.

- **[React Hook Form](https://react-hook-form.com/docs/useform/watch)** — pour des formulaires complexes générés depuis le back-end, avec des sous-formulaires qui s'ouvrent selon les réponses. Le field array gère les listes dynamiques, et `watch` permet de réagir au changement d'un champ.
- **[Zod](https://zod.dev/)** — pas seulement pour les formulaires : aussi pour typer ce que renvoie le back-end et vérifier les variables d'environnement.
- **Lingui** — pour la traduction, par préférence assumée plus que par comparaison.
- **[MMKV](https://github.com/mrousavy/react-native-mmkv)** — pour le stockage local des tokens.
- **[Rive](https://github.com/rive-app/rive-react-native)** — le moins connu des cinq. Des animations façon GIF, mais pilotées par des états : chez Theodo Apps, un fond d'écran change selon la météo, et s'il neige dehors, il neige dans l'app. Lucie ne l'a utilisé qu'en perso.

---

## Releases, mise en prod et la leçon de la veille de Noël

Côté web, la release est quotidienne, en sortie directe, et l'hébergement se fait aux côtés des autres sites de l'entreprise plutôt que sur EAS Hosting. Côté mobile, EAS gère les builds, avec un passage par les stores toutes les deux semaines environ. Les OTA updates n'ont pas été activées, pour une raison budgétaire : la facturation liée au volume.

Le souvenir le plus marquant de Lucie ne vient pas de Mucho mais de son tout premier projet : une mise en production lancée à 17h la veille de Noël, pour un client qui voulait justement livrer pendant les congés. Le tech lead était en vacances, elles étaient deux. Le revert était prêt, il a servi ; puis visio pour comprendre le bug.

> "Ce que cette expérience m'a surtout appris, c'est : ne mettez pas en prod quand vous savez qu'après vous voulez rentrer chez vous." — Lucie Uffoltz

L'alternative défendue par David Leuliette : mettre en prod tous les jours, avec des mécanismes de rollback, jusqu'à ce que la release devienne un non-événement.

---

## Debugger avec un crayon

La technique de debug que Lucie recommande à tout développeur n'a rien de technique : faire des schémas. Son exemple : un bug mémoire sur Android, dont la documentation lui restait abstraite. Une fois le schéma dessiné, la structure apparaît — foreground, background, et surtout des sous-états à l'intérieur de ces grandes catégories, le système libérant de la mémoire quand l'app n'a pas servi depuis longtemps, à la manière d'un garbage collector.

---

## Conclusion

Ce que montre le cas Mucho, c'est qu'une application universelle React Native n'est plus d'abord un défi technique — Expo a réduit la mise en place à quelques commandes. C'est un arbitrage économique : un peu de friction sur chaque changement contre un coût de maintenance durablement divisé. Le travail réel se déplace vers les endroits où les plateformes divergent vraiment : le styling responsive, les composants natifs comme les calendriers, et la discipline de release.

---

## Key Takeaways

- **Expo rend le passage en universal app quasi trivial** : une ou deux commandes, là où React Native Web demandait encore de la configuration Webpack.
- **Unistyles est un choix solide pour le multi-plateforme**, en particulier pour définir les breakpoints à un seul endroit, même quand le web existant est en Tailwind.
- **Expo Router s'impose quand l'équipe vient de Next.js** : le routing par fichiers, même mental model des deux côtés.
- **Les composants type calendrier sont le vrai point de friction** — prévoir des fichiers `.web.tsx` séparés et se méfier des styles globaux qui écrasent les modales.
- **React Hook Form + Zod couvrent bien plus que les formulaires** : field array pour les listes dynamiques, Zod pour les réponses back-end et les variables d'environnement.
- **Ne pas mettre en prod juste avant de partir** : la veille de Noël à 17h, tech lead en vacances, est le contre-exemple parfait.
- **Faire des schémas est une compétence de debug**, notamment pour les bugs mémoire où les sous-états foreground/background ne se devinent pas dans la doc.

---

**David Leuliette** → [Twitter](https://x.com/flexbox_) · [BlueSky](https://go.bsky.app/6QQemwz)

**Lucie Uffoltz** → [Twitter](https://x.com/uffoltzl) · [BlueSky](https://bsky.app/profile/uffoltzl.bsky.social) · [LinkedIn](https://www.linkedin.com/in/lucie-u-655ab6195/)
