# Scaler une application mobile en hypercroissance : le cas Doctolib

50 millions d'utilisateurs, 400 000 praticiens, 15 millions de rendez-vous pris chaque mois. Derrière ces chiffres, une application mobile qui n'a pas le droit de tomber : quand elle flanche, ce sont des patients qui ratent leur médecin. Alors comment scaler une application mobile en hypercroissance sans y laisser des mois de développement et des centaines de milliers d'euros ? Dans cet épisode du Cross Platform Show, David Leuliette reçoit **Louis Zawadzki**, Senior Software Engineer chez Doctolib (passé par Datadog, BAM et Theodo), pour décortiquer le quotidien technique d'une app critique. Au menu : pourquoi la WebView a servi de bouclier, l'incident qui a fait exploser une facture de SMS, la stratégie de migration React Native, et comment faire cohabiter une vingtaine de développeurs sur une même app.

## Scaler une application mobile : la WebView comme bouclier

Première surprise : côté mobile, Doctolib a longtemps été _protégé_ — parce que le cœur de l'app patient n'était pas vraiment natif.

> "La partie qui est prise de rendez-vous, les gens ne s'en rendent peut-être pas compte, mais en fait c'est simplement une WebView qui affiche le site web." — Louis Zawadzki

Jusqu'en 2024-2025, l'application patient est donc surtout une WebView, avec de fines surcouches natives pour les notifications et la téléconsultation — cette dernière étant, elle, développée en React Native. Ce choix limite l'exposition aux incidents : le gros de la logique vit côté web. Doctolib gère deux facettes en parallèle, l'app patient (prise de rendez-vous) et l'app professionnelle, que les médecins ouvrent chaque matin pour consulter leur planning. Le vrai basculement d'échelle, Louis le situe au Covid : les rendez-vous de vaccination se sont faits quasi exclusivement sur Doctolib, provoquant un changement d'échelle très rapide. Depuis, l'entreprise franchit des paliers en continu — nouveaux pays (France, Allemagne, Italie), puis diversification de l'offre patient au-delà de la seule réservation.

## Quand un "petit" changement coûte cher : l'incident SMS

L'exemple le plus parlant de la fragilité à grande échelle ? Une facture de SMS qui s'envole. Le mécanisme : la veille d'un rendez-vous, l'app envoie une push notification ; si l'utilisateur ne la reçoit pas, un SMS prend le relais. Pour savoir si la push est bien arrivée, un hook dans l'app appelle un endpoint au réveil. Un jour, le coût des SMS commence à exploser — pile au moment d'une release.

Le coupable n'était pas Datadog mais… le suivi du pricing. En cause : l'ajout d'une librairie utilisée pour les tests end-to-end, embarquée en production pour charger des variables dynamiques. Au réveil de l'app sur une push, elle provoquait un deadlock : l'app n'appelait jamais l'endpoint de confirmation, donc le SMS partait quand même. Multiplié par le volume d'utilisateurs, l'addition grimpe vite. C'est tout le paradoxe d'un produit "tentaculaire" : un changement anodin ailleurs fait tomber une brique critique. Et comme Doctolib n'a pas encore d'update over-the-air (type CodePush ou Expo Update), corriger un bug mobile impose une nouvelle mise en production native — pas de rustine à chaud comme sur le web.

## Scaler une application mobile en hypercroissance sans tout casser

Face à ce risque, la moindre migration devient une opération planifiée. L'exemple type : le passage à la nouvelle architecture React Native.

Dans ses projets précédents, Louis créait un simple ticket « mettre à jour React Native », déployait, corrigeait deux ou trois bugs, et c'était réglé. À l'échelle de Doctolib, la méthode change du tout au tout :

- **Migrer les librairies en amont** — toutes celles qui peuvent vivre à cheval sur deux versions sont migrées avant, pour que la PR finale reste minuscule.
- **Rollout progressif** — la nouvelle archi est d'abord livrée à 1 % des utilisateurs, immédiatement arrêtée, puis observée sur Sentry pendant une semaine avant d'itérer.
- **QA sur vrais devices** — une phase de test manuelle par les développeurs (environ une heure chacun), progressivement extraite en tests end-to-end, complétée par un device farm (BrowserStack) pour reproduire un bug sur une marque précise.

S'ajoute un travail de fond : le versioning des API, pour qu'une app vieille de deux ans, tournant sur un Android 6 jamais mis à jour, continue de fonctionner. Un mécanisme pousse au bout d'un moment les utilisateurs à mettre à jour, pour migrer le parc en douceur. Le tout dans un secteur très réglementé, où les produits sont construits avec des médecins qui valident la pertinence médicale — ce qui limite les mauvaises surprises en production.

## Vingt développeurs, une seule app : l'architecture en packages

Historiquement, Doctolib est un gros monolithe Ruby on Rails, difficile à scaler. La stratégie récente : sortir des parties du monolithe vers des runtimes Java (Spring Boot, un peu de Kotlin), et donner à l'app mobile son propre repo, hors du monorepo principal.

Mais le vrai défi est humain autant que technique : cinq à six équipes de quatre-cinq développeurs travaillent en parallèle sur la même app — près d'une vingtaine de personnes qui, à l'ère du "vibe coding", produisent beaucoup de PR d'un coup. Comment éviter l'explosion ? La réponse de l'équipe : **un package par feature**, plus un package commun, le tout découpé selon le Domain-Driven Design avec des couches homogènes.

Le succès a créé son propre problème : passé de cinq-six packages à près de dix fois plus, l'équipe se bat contre les dépendances circulaires — la navigation qui doit _registrer_ tous les écrans, les barrel files qui importent tout, les tests qui cassent sans rapport avec le changement. D'où un chantier d'inversion des dépendances, vers une gestion façon plugin où chaque fonctionnalité vit séparément.

> "À l'intérieur de ton package, tu peux marchander un peu, ça passera. Par contre, les entrées et sorties de tes packages, c'est là où il ne faut pas se rater." — Louis Zawadzki

Ce cap n'aurait pas été franchi sans porteur : Louis cite Morgan Belcadie, qui s'est battu pour intégrer du natif quand l'équipe mobile était encore minuscule, avant l'arrivée simultanée de plusieurs recrues réceptives. Un luxe que le web, lui, n'a pas eu : là s'accumule une "lava code base", ces couches successives de patterns de différentes époques qui coexistent.

## L'IA rebat les cartes (et le budget)

L'IA n'a pas seulement accéléré le code : elle a débloqué les refactos que personne ne voulait faire. Avant, demander à un dev de reprendre trois jours d'architecture était intenable ; désormais, la correction se récupère en code review. C'est ainsi que l'onglet "santé" — un compromis développé vite puis enrichi (documents, antécédents médicaux, suivi des biberons) — a pu être resplitté bien plus facilement que prévu.

Reste que la vitesse déplace l'effort. La partie que l'on code va plus vite, mais la réflexion doit désormais se faire en amont : bloquer une journée, quand on va dix fois plus vite, ne décale plus 3 % d'une fonctionnalité mais 30 %. Côté budget, même bascule : après une phase d'expérimentation, Doctolib rationalise ses outils, crée une ligne dédiée à l'IA, et recrute autant des experts techniques que des profils de conduite du changement.

## Les réflexes d'un dev qui a vu la scale

Le bug qui le hante ? Un double paiement introuvable pendant deux semaines chez BAM — reproduit seulement en observant un vrai utilisateur : il fermait l'app via le bouton _back_ Android, ce qui rejouait les actions en double à la réouverture. La leçon : tester avec un véritable utilisateur Android, pas un device iOS. Son autre conviction, héritée de Theodo : le partage de connaissances, via des _katas_ où l'équipe débugge ensemble un incident réel pour ancrer le geste. Et pour qui rejoint une boîte en hypercroissance : être proactif et aller chercher l'information, car rien n'est encore ni totalement processé, ni connu de tous.

## Conclusion

Scaler une application mobile en hypercroissance, chez Doctolib, ce n'est pas une recette d'archi idéale : c'est un équilibre permanent entre protéger le cœur critique, avancer par petits paliers mesurés, et outiller l'équipe pour que vingt développeurs ne se marchent pas dessus. Un retour de terrain concret, à écouter en entier dans l'épisode.

## Key Takeaways

- **La WebView comme bouclier** : le cœur de l'app patient Doctolib est resté une WebView jusqu'en 2024-2025, limitant l'exposition aux incidents mobiles.
- **Le "juste" coûte cher à l'échelle** : une lib de test embarquée en prod a créé un deadlock sur push notification et fait exploser la facture SMS — repéré via le pricing, pas le monitoring.
- **Pas d'OTA = discipline** : sans CodePush/Expo Update, chaque correctif passe par une release native, d'où un rollout à 1 % surveillé sur Sentry avant généralisation.
- **Un package par feature** : découpage DDD, package commun, et bataille continue contre les dépendances circulaires quand on passe de 6 à ~60 packages.
- **Les frontières priment** : la tolérance est permise à l'intérieur d'un package, jamais sur ses entrées/sorties.
- **L'IA déplace l'effort en amont** : le code va plus vite, mais un blocage d'une journée décale désormais 30 % d'une feature ; refactos et budget IA deviennent des postes à part entière.
- **Tester sur un vrai Android** : le bouton _back_ qui ferme l'app révèle des bugs invisibles pour un dev iOS.
