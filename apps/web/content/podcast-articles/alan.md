# React Native chez Alan : 100 devs, 4 experts mobiles

Comment fait-on tourner une application de santé en production quand, sur une centaine d'ingénieurs, seuls quatre ou cinq maîtrisent vraiment le mobile ? C'est la question que résout React Native chez Alan au quotidien. Dans cet épisode du Cross Platform Show, David Leuliette reçoit Xavier Seignard, développeur chez [Alan](https://alan.com/) depuis plus de trois ans, avec un focus mobile — produit, developer experience et infra.

Chez Alan, il n'existe pas d'équipe mobile : tout le monde est full stack, et l'enjeu devient organisationnel autant que technique. Au programme : une stack délibérément "boring", un design system universel sous Tamagui, un compteur de pas maison faute d'API Android équivalente à HealthKit, et ce moment où les délais de review de Google Play ont dépassé un cycle de release complet.

---

## Des PCB pour artistes numériques à React Native 0.28

Avant Alan, Xavier a passé dix ans en freelance comme informaticien-électronicien : il fabriquait des PCB pour des artistes d'art numérique. C'est en codant des applications mobiles pour piloter des œuvres qu'il rencontre React Native — sa première version, retrouvée dans ses GitHub : **0.28, en 2016**. Une expérience marquante pour son rapport aux déploiements.

> "Une mise en prod d'œuvre, tu ne peux vraiment pas te louper. Tu ne peux pas envoyer un hotfix. Du coup je suis très serein avec les mises en prod." — Xavier Seignard

---

## Boring technology : la stack React Native d'Alan après sept ans

Alan est d'abord une mutuelle vendue aux entreprises, qui se positionne comme partenaire santé : remboursement de frais, espaces thématiques (santé mentale, parentalité, nutrition), chat avec des médecins. L'app française a **sept ans** et tourne dans quatre pays — France, Espagne, Belgique, et le Canada en cours d'ouverture.

Donc un existant, et qui dit existant de cette époque dit Redux. L'équipe est en train d'en enlever les dernières touches pour basculer sur beaucoup plus classique : **les contextes React**, avec un peu de MobX en cours d'introduction. Data fetching : TanStack Query. Navigation : React Navigation depuis quasiment le début — Expo Router fait envie, mais la migration serait très large et difficile à arbitrer dans une entreprise orientée produit. Le tout vit dans ce que Xavier appelle un **giga repo** : l'infra, le backend, toutes les applis mobiles et tout le front web dans le même dépôt.

> "On aime bien dire qu'on est une boring company dans les choix. On n'essaie pas de réinventer la roue. Mais il faut que les choix soient motivés par une vraie valeur ajoutée sur le produit." — Xavier Seignard

---

## Pas d'équipe mobile : 100 ingénieurs full stack

Il n'y a pas d'équipe mobile chez Alan — il y a des ingénieurs. Sur une centaine, l'expertise mobile représente quatre à cinq personnes. Et ça tient, parce que les besoins qui touchent réellement aux ressources du device restent minoritaires : deep links, push notifications, quelques cas exotiques.

Conséquence directe : la developer experience n'est pas un confort, c'est une condition de survie. Un ingénieur qui n'a pas touché à l'app depuis trois mois doit pouvoir contribuer sans friction. D'où le **top 1 des librairies de Xavier : l'écosystème Expo**. La CLI, le prebuild, et surtout les dev clients — l'app avec sa partie native précompilée, distribuée via S3 : une commande, et le code local se charge dedans.

> "Pas à un seul moment ils n'ouvrent Xcode ou Android Studio. Ça change énormément la donne sur la developer experience." — Xavier Seignard

Le reste de l'effort est culturel : des _helpers groups_ Slack où des volontaires répondent sur une thématique, une gazette interne hebdomadaire pour partager un tips React Native, et un format personnel de Xavier, _React Native Cool Things_, mêlant news de l'écosystème et blagues débiles.

---

## Design system universel et écrans universels

Alan développe un design system hybride : des composants universels, d'autres spécifiques mobile ou web. La partie universelle existe depuis longtemps ; **Tamagui a été intégré il y a environ deux ans**, avec des composants réimplémentés et des codemods pour accompagner la migration. L'intérêt de Tamagui, c'est sa phase de compilation qui génère du CSS pour le web — au prix d'une courbe d'apprentissage bien raide.

L'étape suivante est plus ambitieuse : passer du design system universel aux **écrans universels**. Le web sert surtout les admins d'entreprise, le mobile le salarié assuré qui photographie un document médical pour déclencher un remboursement. Certaines fonctionnalités membres n'ont pas d'équivalent web, et l'idée est de les offrir en ne codant les écrans qu'une seule fois.

Le vrai sujet, c'est la navigation. Alan n'utilise pas Next.js : l'unification passera par une abstraction au-dessus de React Navigation et React Router. Sur les design tokens, pas de magie non plus — les tentatives d'export automatisé depuis Figma n'ont jamais dépassé le stade de l'exploration.

---

## Animations : Reanimated 3, Rive et motion tokens

Reanimated a été introduit avec la V2 de l'app, ce qui a évité à l'équipe de souffrir des premières versions. Depuis environ un an et demi, Alan utilise aussi **Rive** : un équivalent de Lottie avec des machines à état, dont on déclenche les transitions depuis du code React Native. Developer experience satisfaisante, performance au rendez-vous. Le point dur est ailleurs : la montée en compétences des équipes design sur un nouvel outil — et Xavier anticipe déjà des **motion tokens**, sinon l'app finit par ressembler à un sapin de Noël.

---

## HealthKit, Health Connect et un compteur de pas fait maison

Alan a introduit de la gamification pour encourager le mouvement, la méditation et les séances de respiration. Techniquement : HealthKit sur iOS, Health Connect sur Android. Philosophie proche — des hubs qui agrègent les données de santé venues d'autres applications et d'objets connectés, et dans lesquels on peut aussi écrire.

La différence qui a tout changé : **le comptage de pas existe de facto dans HealthKit, pas dans Health Connect**. Résultat, un onboarding foireux où l'utilisateur doit sortir de l'app, aller sur Google Play, installer une application tierce qui alimentera Health Connect. Autant dire qu'on le perd en route.

La réponse a été de développer leur propre step counter, ce qui ouvre d'autres problématiques : consommation d'énergie et foreground services Android. Les modules Expo de tâches de fond ne suffisaient pas — il faut que l'app démarre pour que le code JS s'exécute, alors qu'Alan veut que le service tourne dès le redémarrage du téléphone. D'où du code natif, injecté via un **config plugin Expo**.

---

## Quand Google Play bloque une release pendant plus d'une semaine

Alan tient un cycle de release hebdomadaire. Or les délais de review chez Google Play se sont mis à dépasser la semaine — et chaque nouvelle version soumise remet le compteur à zéro. Effet tunnel garanti : plus de release possible.

Il a fallu escalader assez haut chez les responsables de Google Play pour comprendre le fin mot de l'histoire : les lois européennes ont introduit des mécanismes de protection des données de santé, et les reviewers n'étaient pas outillés pour auditer des applications accédant aux capteurs du device. D'où des reviews manuelles. Alan considère le sujet résolu depuis peu, en monitorant les _time to review_.

---

## Releases, feedback interne et tests end-to-end

Le pipeline repose sur **GitHub Actions + Fastlane**, avec beaucoup de choses scriptées pour pousser vers les stores. Alan n'utilise pas EAS Build : sept ans d'existence, des process hyper customisés, et un coût supérieur à leur infrastructure actuelle. Pour les builds internes, App Center faisait le travail — un label sur une pull request suffisait à déclencher un build distribué en interne — mais sa fin de vie force le changement. Côté feedback, **ShakeBugs** : un collaborateur secoue son device, et le ticket atterrit dans Linear.

Pour les tests end-to-end, c'est **Waldo** : les tests ne sont pas écrits mais enregistrés sur une plateforme, puis déclenchés par des règles sur les branches de release, avec des runs nightly sur la main branch. Le constat est lucide — c'est _painful_ et parfois _noisy_. Un design modifié suffit à faire échouer un test dont la ressemblance visuelle ne passe plus. Un sujet que tout le monde réclame chez Alan, et que personne n'a envie d'entretenir.

---

## Conclusion

À l'échelle d'une centaine d'ingénieurs, les décisions React Native les plus structurantes sont rarement des choix de librairies. Un stack délibérément ennuyeux, des dev clients qui évitent d'ouvrir Xcode, une gazette hebdomadaire et des helpers groups Slack : voilà ce qui empêche quatre ou cinq experts mobiles de devenir le goulot d'étranglement de toute une organisation produit. Et quand la technique redevient dure, la réponse tient autant dans le code natif que dans la capacité à aller chercher les bonnes personnes.

---

## Key Takeaways

- **Pas d'équipe mobile, 100 ingénieurs full stack** : seuls 4 à 5 ont une expertise mobile, ce qui rend la developer experience critique.
- **Les dev clients Expo distribués via S3** permettent de contribuer sans jamais ouvrir Xcode ni Android Studio.
- **Boring technology assumée** : Redux en cours de retrait au profit des contextes React, TanStack Query, React Navigation, monorepo unique.
- **Le design system universel sous Tamagui** ouvre la voie aux écrans universels ; l'obstacle restant est l'unification de React Navigation et React Router.
- **Rive complète Reanimated 3** pour les animations à machines à état, avec un vrai enjeu de montée en compétences côté design.
- **Health Connect n'expose pas le comptage de pas de facto** : Alan a écrit son propre step counter natif, injecté via un config plugin Expo.
- **Les données de santé rallongent les reviews Google Play**, au point d'avoir dépassé un cycle de release hebdomadaire.

---

## Ressources mentionnées

- [Our journey from React Native to Expo at Alan](https://medium.com/alan/our-journey-from-react-native-to-expo-for-mobile-app-development-at-alan-%EF%B8%8F-3b1569e8ab7c)
- [Rive](https://rive.app/docs/runtimes/react-native/react-native)
- [ShakeBugs](https://www.shakebugs.com/) · [Waldo](https://www.waldo.com/product/end-to-end-testing)

**Xavier Seignard** → [Twitter](https://x.com/xavier_seignard) · [BlueSky](https://bsky.app/profile/drangies.fr)
