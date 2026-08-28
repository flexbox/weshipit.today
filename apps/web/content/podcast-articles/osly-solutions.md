# Bluetooth Low Energy en React Native : le pari d'Osly Solutions

C'est quoi le pire : perdre ses clés ou tomber en panne de batterie ? Armand Petit a tranché — et en a fait une startup. Dans cet épisode du Cross Platform Show, David Leuliette reçoit le CTO d'Osly Solutions, l'application qui transforme votre smartphone en badge d'accès pour les immeubles. Sous le capot : du Bluetooth Low Energy en React Native, un boîtier ESP32, et cinq ans d'itérations en quasi-solo.

À 25 ans, Armand cumule les casquettes : code embarqué en C++, backend Django, application mobile Expo. Son parcours raconte quelque chose de rare — comment fiabiliser une communication BLE entre un téléphone et une porte d'immeuble, et quels choix de stack survivent au passage du projet étudiant à la phase de test avec de vrais syndics.

---

## D'un projet étudiant au contrôle d'accès par smartphone

Armand ne vient pas de l'informatique. Après un DUT en génie mécanique et productique — où un projet VBA lui fait découvrir le plaisir de résoudre des problèmes par le code — il intègre l'IMT Atlantique, l'ancienne école des Mines de Nantes. En 2020, un cours d'introduction au web, au mobile et au cloud le fait basculer.

Son école héberge un incubateur et propose un cursus d'un an pour créer une startup fictive. L'équipe d'Armand part d'un problème bien réel, remonté par une amie qui travaille chez un syndic : les gestionnaires d'immeubles croulent sous les badges physiques. Des badges Vigik dans des pochettes plastifiées, perdus, jamais rendus par les prestataires. La solution : gérer tous ces accès depuis une plateforme digitale.

Le projet fictif devient une vraie société en juin 2023. Armand y est CTO — « c'est un peu le nom pour dire voilà, mais en gros je suis développeur là-bas » — et son associé gère la partie commerciale. Le produit tient en trois briques : une application web où le gestionnaire administre les accès, un mail qui invite le prestataire ou le résident à télécharger l'app mobile, et un boîtier installé dans le bâtiment. Le téléphone communique alors directement avec le boîtier pour ouvrir la porte, selon une plage horaire définie.

---

## Ouvrir une porte avec du Bluetooth Low Energy en React Native

Le cœur technique d'Osly Solutions, c'est la communication entre l'app React Native et un boîtier à base d'ESP32. À l'origine, l'équipe fabriquait tout elle-même : PCB commandés en Chine par l'associé, montage à la main, code embarqué écrit par Armand en C++. Aujourd'hui, les boîtiers sont achetés déjà industrialisés, marquage CE oblige — sans conformité, les assureurs se retourneraient contre la startup en cas de sinistre.

Le principe est volontairement simple : le boîtier reproduit le même signal qu'un badge sur la centrale d'accès déjà présente dans le bâtiment. Surtout, il est inerte à Internet. Pas de mise à jour du firmware à distance, car il faudrait une carte SIM, une borne WiFi, un abonnement à un fournisseur d'accès — dans des locaux souvent en sous-sol où rien ne capte. D'où le choix du Bluetooth Low Energy, utilisable partout, doublé d'un mode offline dans l'application.

Armand vulgarise la différence avec le Bluetooth classique : pas besoin d'appairage. Le BLE permet de scanner l'environnement, détecter des devices et s'y connecter directement. Côté librairie, deux options existent en React Native : react-native-ble-plx et BLE Manager. Armand a choisi la première, et ne le regrette pas — documentation soignée, communauté active, et une entreprise derrière le projet plutôt qu'un mainteneur solo au bord du burn-out open source.

---

## Fiabiliser le Bluetooth Low Energy : six mois de galère sur Android

Que les candidats au Bluetooth se le disent : le plus dur n'est pas d'envoyer un signal, c'est de le faire de façon fiable.

> « Ce qui a surtout été complexe, c'est de fiabiliser la partie communication BLE. On a passé au moins six-sept mois, et encore, des fois j'ai des problèmes et je ne sais pas pourquoi. » — Armand Petit

Sur iOS, pas de problème. Sur Android, c'est une autre histoire : certains fabricants ne suivent pas les recommandations de Google, et les devices Samsung ou Xiaomi accumulaient les soucis de synchronisation avec le hardware. La leçon d'Armand : testez sur de vrais appareils. Son setup tient en deux téléphones, un Samsung A54 et un iPhone XR.

Cette fragilité Android a donné lieu à la meilleure anecdote de l'épisode : une démo client avec deux interlocuteurs sur place, un sur iOS, l'autre sur Android. Un seul téléphone ouvrait la porte — mais le client était content, parce que ça répondait à son besoin. David complète avec une référence utile : l'article de Sentry sur la stabilité d'une app React Native basée sur le BLE, qu'il a lui-même mis en place pour remonter les bonnes stack traces.

---

## Une stack qui évolue avec les problèmes, pas avant

La première version de l'app, en 2020-2021, est scaffoldée en bare workflow React Native avec React Navigation — Expo ne permettait pas encore d'embarquer le BLE. Fin 2022, les retours sur Expo deviennent bons : Armand refait la seconde version dessus, adopte Expo Router, intègre react-native-ble-plx sans souci et passe sur EAS pour le déploiement. L'app en est à sa version 3.6.

Côté data, le chemin est instructif. Au début : Axios, un useEffect, un affichage. Puis les renders qui s'emballent, les hooks de mémoïsation, la complexité qui monte. Jusqu'à la découverte de TanStack Query, implémenté très tôt.

> « Quand j'ai découvert TanStack Query, je l'ai directement implémenté. Depuis, je n'ai eu aucun problème — ça m'a littéralement sauvé. » — Armand Petit

Même philosophie pour le state management : des états locaux avec useState tant que ça suffit, et le jour où le props drilling devient pénible sur la synchronisation de l'ouverture de porte, un store global Zustand avec un simple « door opening ». On reste sur du local, et on ne monte en puissance que quand un vrai problème l'exige.

Le styling suit la même ligne : StyleSheet, Reanimated et Gesture Handler, un design system dans un package partagé. Armand a pourtant implémenté Tamagui en mission freelance chez Theodo, mais il en retient surtout la documentation lacunaire : « implémenter Tamagui dans un shared package, dans un workspace, c'est un art ». Le mode offline, lui, repose sur MMKV, choisi après un benchmark face à AsyncStorage, avec un indicateur de reconnexion à la Spotify.

Ses autres recommandations : le combo Zod + resolver + React Hook Form pour en finir avec les formulaires bricolés à coups de isLoading, et Expo Image, trop peu utilisé alors qu'il optimise le build et gère le disk et memory caching.

---

## Apprendre seul, releaser seul

Armand a construit tout ça en parallèle d'un apprentissage chez Airbus, en codant le soir jusqu'à 23h30. Formé à Django par un contact LinkedIn après des débuts sur Supabase, il reconnaît volontiers qu'un backend Node aurait été plus cohérent dans un environnement TypeScript — mais la documentation exemplaire de Django a structuré son apprentissage. Chez Theodo, il découvre la séparation entre logique métier et composants UI, un sujet dont « on ne parle pas assez » face aux tutos YouTube qui entassent tout au même endroit.

Le déploiement reste à son échelle : EAS Build puis Submit lancés à la main, un CI/CD GitHub Actions pour le backend, et EAS Workflows dans la liste des envies — pas besoin de pipeline sophistiqué quand on est seul développeur sur un MVP en phase de test avec des syndics et des bailleurs. Si les fonds arrivent, première décision déjà prise : un freelance backend pour auditer la sécurité et évaluer le besoin de refactoring.

---

## Conclusion

Le parcours d'Osly Solutions illustre une approche assumée du développement produit : partir d'un problème réel (des badges qui se perdent), choisir la technologie qui contourne les contraintes du terrain (le BLE parce que les sous-sols ne captent pas), et n'ajouter de la complexité — Zustand, TanStack Query, pipeline CI — que lorsqu'un problème concret la justifie. Cinq ans après un cours d'introduction en école d'ingénieur, Armand maintient seul un firmware C++, un backend Django et une app Expo testée par de vrais gestionnaires d'immeubles. La curiosité et l'obstination face aux bugs Bluetooth ont fait le reste.

---

## Key Takeaways

- **Le BLE se choisit par contrainte terrain** : un boîtier inerte à Internet évite carte SIM et borne WiFi dans des sous-sols qui ne captent pas — le Bluetooth Low Energy fonctionne partout, appuyé par un mode offline.
- **react-native-ble-plx s'impose face à BLE Manager** grâce à sa documentation, sa communauté active et une entreprise qui garantit la maintenance dans la durée.
- **Fiabiliser une communication BLE prend six à sept mois** : iOS est fiable, Android imprévisible (Samsung, Xiaomi). Testez sur de vrais devices.
- **Expo a rattrapé le bare workflow** : impossible d'y intégrer le BLE en 2020-2021, trivial aujourd'hui — la V2 d'Osly tourne sur Expo, Expo Router et EAS.
- **TanStack Query remplace avantageusement Axios + useEffect** : adopté tôt, zéro problème depuis.
- **La complexité n'arrive que quand le problème existe** : useState local jusqu'au props drilling, puis un store Zustand minimal ; EAS Build à la main tant que le rythme de release ne justifie pas de pipeline.
- **Zod + React Hook Form, Reanimated et Expo Image** complètent la boîte à outils — cette dernière reste sous-utilisée malgré ses optimisations de build et son caching disque et mémoire.
