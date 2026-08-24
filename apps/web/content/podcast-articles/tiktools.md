# Développeur solo React Native : les leçons de Brice Zele avec TikTools

Un développeur seul peut-il coder, déployer et faire le marketing d'une app sans équipe, sans budget, sans se noyer dans la dette technique ? C'est la question qui ouvre cet épisode du Cross Platform Show. Pour y répondre, David Leuliette reçoit Brice Zele, développeur mobile senior et **développeur solo React Native** qui a shippé TikTools : le jour freelance sur des projets à grande échelle, la nuit CTO, dev, designer et product owner de sa propre app. Brice raconte tout — le choix d'un backend fait main, une migration douloureuse depuis React Native CLI, un ban Apple qui a tout stoppé net, et la leçon qu'il retient au-dessus de toutes les autres : comment décider sous contrainte quand personne ne vous couvre, et pourquoi le code n'est jamais le vrai problème.

## De dev Android à développeur solo React Native, par nécessité

Brice n'a pas choisi React Native par hype. Il a fait tout son cursus d'ingénieur en Afrique et commencé sa carrière là-bas, en Android natif. En 2017-2018, le choix était évident : la grande majorité des utilisateurs étaient sur Android, iOS n'était même pas un sujet. Un détail qui a fait sourire David, habitué à l'inverse en France.

Le basculement est venu d'un client — l'un de ses tout premiers. Une app d'actualité qui devait exister à la fois sur Android et iOS. Brice ne faisait que du natif, mais il s'est démené pour livrer depuis une seule code base. Il teste d'abord Ionic avec Cordova. Le verdict est net :

> "J'avais plus le sentiment d'avoir un site web responsif sous les yeux qu'une vraie application mobile." — Brice Zele

C'est en cherchant à retrouver le ressenti du natif, avec une seule code base, qu'il tombe sur React Native. Coup de cœur immédiat. Pour tout **développeur solo React Native**, cette histoire résume le vrai critère de choix d'une techno : résout-elle une contrainte réelle, ou brille-t-elle juste sur le papier ?

## TikTools : shipper une app d'analyse TikTok en solo

L'idée germe en 2022. Une amie de Brice fait du contenu faceless sur TikTok, elle est dans le programme beta et génère déjà du revenu — mais elle passe un temps fou à traquer le contenu viral, créateur par créateur, vidéo par vidéo. Brice creuse sur des threads Reddit spécialisés : d'autres ont le même problème, et les solutions existantes sont des SaaS. Il décide d'aller à contre-courant avec une app mobile, puisque l'essentiel des utilisateurs de TikTok sont sur mobile.

TikTools permet d'analyser n'importe quel compte TikTok sans mot de passe — l'équivalent d'un TikTok Analytics, mais appliqué à n'importe quel profil. Pas d'analyse de la vidéo elle-même : Brice exploite les métadonnées (vues, likes, commentaires, hashtags, heure et jour de publication) pour repérer ce qui fonctionne et répliquer la stratégie.

Décision clé : **le backend d'abord**. Il part sur NestJS — il avait fait du Node.js, et NestJS reprend les concepts d'Angular (système de modules) qu'il connaissait déjà. Sa philosophie : limiter au maximum les API tierces. Un VPS OVH à 5 euros, l'OS installé manuellement, tout fait à la main de A à Z. Le backend lui a pris 3-4 mois, fin 2022, quand ChatGPT venait à peine de sortir. L'app mobile a suivi en 2023, construite en building public, avec un niveau de polish "app portfolio" — chaque animation cool vue ailleurs, il voulait la refaire. Résultat : environ neuf mois entre le back et le front, publication fin 2023.

## La dette technique quand on est développeur solo React Native

C'est ici que le solo fait mal. Brice a démarré sur React Native CLI, pas sur Expo — en 2022, il ne trouvait pas Expo assez mature, et il ne l'a vraiment adopté qu'une fois que la doc de React Native a commencé à le recommander. Conséquence : les montées de version étaient un enfer.

Parti d'une version autour de React Native 0.72, il s'est appuyé sur le React Native Upgrade Helper — cet outil qui génère le diff entre deux versions, à recopier à la main dans les fichiers Gradle et iOS. Le problème : un **développeur solo React Native** en CLI a forcément modifié ces fichiers natifs, ajouté des librairies absentes du diff. On enlève, on remet, on rebuild, on attend 20 minutes, ça ne marche pas. David résume : "on fait du Linux kernel development, on s'envoie les patchs par email."

Résultat, Brice est resté bloqué plus d'un an sur la même version, par crainte des breaking changes et des régressions incompréhensibles. La migration vers Expo, elle, s'est faite assez facilement — seuls quelques modules natifs (widgets) ont dû être réécrits. Autre leçon apprise en freelance et rapatriée sur le projet perso : le passage en monorepo (back et front en TypeScript, code partagé), fait entièrement à la main.

## Le ban Apple : la leçon qui coûte cher

TikTools a vécu environ un an et demi sur l'App Store avant de se faire retirer. Les reproches se sont accumulés. D'abord, l'usage du terme "TikTok" partout — dans l'app, dans les screenshots — alors que c'est une marque protégée. Apple a d'abord averti ; Brice a tout changé en une semaine. Puis un service juridique est entré en jeu, l'accusant d'utiliser la notoriété de TikTok pour se faire de l'argent. Le nom "TikTool" prêtait à confusion : des utilisateurs bannis de TikTok arrivaient sur l'app en la prenant pour un support officiel et suppliaient qu'on rétablisse leur compte. Enfin, le look global restait trop proche de l'univers TikTok.

Le couperet : Apple exige un accord à l'amiable avec l'ayant droit, aucune discussion possible. Appelée "video tools for social media", l'app aurait peut-être évité le piège. Le scraping a probablement pesé aussi.

Le ban a démotivé Brice au pire moment. Au pic, il avait 70 abonnés payants pour un peu plus de 450 euros de MRR — uniquement en organique, monétisé avec RevenueCat. Une campagne UGC était prête (une dizaine de vidéos de créateurs), mais tout est tombé à l'eau. Au passage, une prise de conscience produit : ses utilisateurs payants n'étaient pas "monsieur tout le monde" sur TikTok, mais des professionnels — le signe qu'un pivot SaaS aurait peut-être eu plus de sens.

## Le vrai boss final du développeur solo React Native : le marketing

Quand David lui demande la compétence la plus sous-estimée du dev mobile solo, la réponse fuse : le marketing. On peut faire de très bonnes apps ; les vendre est une autre histoire. Et à l'ère où l'IA produit quasiment tout le code que vous voulez, c'est là que se joue toute la différence.

> "La compétence qui fera toute la différence aujourd'hui, c'est savoir vendre et savoir se vendre." — Brice Zele

Brice l'admet sans détour : il n'a pas fait d'ASO, faute de temps, et il était en mode développeur, pas business. La leçon vaut pour tout indie maker : le code n'est plus le goulot d'étranglement, la distribution l'est.

Côté stack 2026, ses réponses rapides valent checklist. Expo sans hésitation. Une librairie sur chaque projet : Reanimated, pour lui la meilleure de l'écosystème. Son outil du moment : React Native Vision Camera (signée Margelo), qui lui permet d'afficher un squelette sur l'utilisateur dans sa nouvelle app de gestion du temps d'écran. Backend cette fois : Supabase, autour de 20 euros par mois. Preuve qu'un **développeur solo React Native** aguerri ne refait pas deux fois les mêmes choix.

## Conclusion

L'histoire de TikTools n'est pas celle d'un échec technique — c'est celle d'un développeur qui a tout maîtrisé côté code et découvert, à la dure, que le vrai combat est ailleurs : le respect des règles des stores et la capacité à vendre.

## Key Takeaways

- **React Native se choisit par nécessité, pas par hype** : Brice y est passé pour livrer sur Android et iOS depuis une seule code base, Ionic étant trop proche d'un site web.
- **Backend d'abord** : sur TikTools, il a validé ses données (NestJS, VPS OVH à 5 euros, scraping) avant de toucher au front.
- **La dette technique est brutale en solo** : plus d'un an bloqué sur une version de React Native CLI, montées de version faites à la main via l'Upgrade Helper ; la migration Expo a tout simplifié.
- **Les règles des stores ne se négocient pas** : marque "TikTok" utilisée et nom prêtant à confusion ont valu un ban Apple, sans discussion.
- **70 abonnés payants et ~450 euros de MRR en pur organique**, sans ASO ni campagne — le produit trouvait des acheteurs, mais le marketing manquait.
- **Connaître sa vraie cible change tout** : les payants étaient des professionnels, pas le grand public — un signal fort pour un pivot SaaS.
- **La stack 2026 de Brice** : Expo, Reanimated, React Native Vision Camera et Supabase — plus une conviction, savoir vendre et se vendre est la compétence n°1.
