# React Native en production : 10 ans de terrain avec Xavier Carpentier

Combien de frameworks mobiles survivent une décennie en production sans devenir un boulet ? Depuis l'époque où React Native ne tournait que sur iOS et où l'on typait encore en Flow, Xavier Carpentier en a vu passer — des paris technos, des migrations douloureuses et des reboots complets. Dans cet épisode du Cross Platform Show, ce développeur full-stack devenu spécialiste mobile revient sur presque **dix ans de React Native en production** : les écueils du bridge, un projet médical poussé jusqu'à Rust, un chat abandonné pour Kotlin Multiplatform, et son virage actuel vers le back-end et l'IA. Un retour d'expérience sans filtre, à contre-courant des guides théoriques.

## React Native en production : les écueils du bridge

Le premier piège, Xavier l'a rencontré très tôt : la performance du bridge. Pour de la collecte de données capteurs en temps réel — accéléromètre, gyroscope à 50 Hz — faire transiter le flux par le bridge ou tout gérer côté JS est une mauvaise idée.

Son cas d'école : une application pour **Biogen**, un gros client pharmaceutique, dédiée à des tests cognitifs pour des maladies neurodégénératives. L'app collectait en parallèle des données sensorielles, des gestes tactiles (pinch) et du GPS. Résultat au démarrage : des performances insuffisantes. La solution a été de descendre au natif.

> "L'avantage de React Native, c'est que tu n'es pas bloqué sur le JS Core. Tu peux aller dans du natif." — Xavier Carpentier

## Rust, Swift, Kotlin : descendre au natif quand il le faut

L'équipe a réécrit la couche de collecte capteurs en **Swift et Kotlin**, avec une architecture modulaire proche de la clean architecture — factories, adaptateurs, interfaces identiques des deux côtés. Les données sont collectées et stockées en natif, puis seul le lien du fichier remonte au JS : aucun échange lourd entre les deux stacks, donc des performances élevées.

Plus fort encore : pour les calculs de distance sur ces masses de données (téléphone en poche, tour du quartier pendant 6 minutes à 50 Hz), l'équipe a écrit un **module en Rust compilé pour les deux plateformes**. Les data scientists produisaient l'algo, Xavier intégrait la librairie dans les modules Kotlin et Swift. L'intérêt : un calcul offline immédiat, sans attendre un aller-retour serveur. Avec le recul, Xavier explorerait aujourd'hui **Nitro Modules** (de Margelo) pour ce type de besoin — la techno n'existait pas à l'époque.

## Quand React Native atteint ses limites : le virage Kotlin Multiplatform

Tous les projets ne finissent pas en React Native. Sur une app de chat, un client visait l'UX exacte de Signal, avec de gros soucis de performance sur les vieux Android (iOS tenait la route). Xavier a passé un mois à explorer les dernières librairies de listes — **FlashList** (native) et **Legend List** (pur JS) — sans jamais tout à fait atteindre la cible.

Le client a fini par abandonner React Native pour **Kotlin Multiplatform**. La leçon n'est pas que RN est faible, mais que la performance sur vieux Android demande du temps de R&D : "s'il n'y a pas le financement pour ça, le client s'acquince." Et de plus en plus, à l'ère de l'IA, les clients préfèrent carrément repartir de zéro — un reboot complet — puisqu'on atteint 80 % d'un produit très vite.

## Librairies vs IA : pourquoi l'open source garde du sens

Contributeur de **react-native-gifted-chat** (qu'il a fait passer de ScrollView à FlatList et enrichi de quick replies), Xavier défend une thèse à contre-courant : à l'heure où l'IA "sait tout coder", les librairies restent utiles — pour gérer le **contexte** et économiser des tokens.

Si le chat n'est pas la feature centrale de ton client, mieux vaut une lib qu'un chat recodé à la main : tu concentres tous tes tokens sur ce qui compte vraiment. Même logique côté web avec un **middleware** maison qui absorbe les échanges purement techniques, pour garder l'IA focalisée sur l'UX. Pour un freelance, l'open source reste aussi un canal d'acquisition : ses petites libs (comme react-native-country-list, très internationale) lui ont valu du consulting et de la visibilité — moins des gros contrats que du brand awareness qui débouche en conférence.

## Le virage back-end et IA

Depuis un an et demi, Xavier a quitté le mobile pour le back-end. Sur un projet chargé de legacy **Next.js** aux paradigmes mélangés et peu performant, il a fait un pari radical : abandonner Next pour du **React SPA** (React Router), avec **Bun** en package manager et runtime (Fastify), une API load-balancée sur Kubernetes en microservices. Le contexte : une chaîne de télé (~2 millions d'abonnés YouTube) qui anticipe des pics de charge massifs — le genre de projet où "le jour où ça sort, on ne veut pas que ce soit déjà down." Next s'essoufflait dès 10-20 utilisateurs de test ; le SPA, pour une app full-feature côté client, va beaucoup plus vite. Le SEO, argument historique de Next, pèse moins à l'ère des chatbots.

La suite ? Extraire les patterns web documentés pour reconstruire le mobile en React Native, façon conversion "web to mobile" assistée par IA — en remplaçant IndexedDB par SQLite, TanStack Query restant TanStack Query, le tout en clean architecture.

## React Native en production en 2026 : le pari de Xavier

Question signature — 500 k€ de budget, on fait quoi ? Xavier ne bouge pas d'un pouce : il reste sur sa trajectoire, sans revenir au natif.

> "Le natif [React Native] a un potentiel suffisant pour adresser 80, voire 98 % des projets." — Xavier Carpentier

Ses chantiers du moment sont ailleurs : les **skills** (des markdown façon CLAUDE.md++, ciblés et économes en tokens, orientés projet), la **parallélisation** des tâches via work trees, et l'IA au-delà de la génération de code — bases de données vectorielles, recherche hybride lexicale + sémantique, et la question ouverte de l'embedding local sur mobile.

## Conclusion

Dix ans de React Native en production, ce n'est pas une success story linéaire : c'est une série de paris — descendre au natif quand le bridge coince, accepter qu'un client parte sur Kotlin Multiplatform, garder l'open source vivant même à l'ère de l'IA. Le fil rouge de Xavier : choisir la techno adaptée au contexte, et rester sur la trajectoire quand elle est bonne. Un épisode dense à écouter en entier.

## Key Takeaways

- **Le bridge reste le premier écueil** : pour du capteur temps réel (gyroscope 50 Hz), ne pas tout faire côté JS — descendre au natif.
- **Cas Biogen** : collecte capteurs réécrite en Swift/Kotlin (clean architecture) + un module de calcul en Rust compilé pour les deux plateformes, pour du offline immédiat.
- **RN n'est pas toujours la réponse** : sur un chat visant l'UX de Signal avec des vieux Android, le client a basculé sur Kotlin Multiplatform faute de budget R&D.
- **Les librairies gardent du sens à l'ère de l'IA** : une lib bien choisie économise des tokens et garde le contexte concentré sur les features cœur.
- **Open source = acquisition freelance** : de petites libs internationales apportent visibilité, consulting et brand awareness.
- **Virage back-end** : Next.js legacy abandonné pour du React SPA + Bun, avec l'idée de reconvertir ensuite le web en mobile RN assisté par IA.
- **Le pari 2026** : React Native couvre 80-98 % des projets — Xavier reste sur sa trajectoire et investit dans les skills IA et la recherche vectorielle.
