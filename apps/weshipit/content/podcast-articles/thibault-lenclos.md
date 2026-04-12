# React Native en 2026 : stack, WebView et Godot

Dans un écosystème mobile qui n'arrête pas d'évoluer, rares sont les développeurs capables de tracer une ligne continue entre Titanium, React Native, Tauri et Godot — et d'en tirer des enseignements concrets pour aujourd'hui. Thibault Lenclos, associé chez **1er Octet** et CTO en mission, est de ceux-là. Dans cet épisode du Cross Platform Show, il revient sur quinze ans de développement **React Native cross-platform** : les choix techniques qui ont tenu, ceux qu'il a abandonnés, et sa vision de la stack idéale en 2026.

---

## De Titanium à React Native : les origines d'un parcours cross-platform

Thibault commence le mobile à une époque où le mot "cross-platform" désignait essentiellement une seule technologie : **Titanium**. Le principe était déjà celui de React Native — un runtime JavaScript mappé sur des API natives — mais avec des APKs qui dépassaient 40 Mo pour un simple Hello World.

> _"C'était l'ancêtre de React Native. On avait un SDK avec un process, un JS runtime qui tournait, mappé sur des API natives derrière. C'est exactement la même techno que React Native, mais il y a 15 ans."_ — Thibault Lenclos

C'est dans ce contexte qu'il décroche la mission Mediapart : une petite équipe, aucune app mobile, et des devs web à convaincre. La promesse de Titanium est exactement la même qu'on fait avec React Native aujourd'hui — _"tu sais faire du JS, tu peux faire du mobile"_ — et elle fonctionne.

Quelques années plus tard, Facebook sort React, puis React Native pointe le bout de son nez. Titanium s'essouffle, l'écosystème bascule. Thibault et son équipe, qui jouaient déjà avec Redux et le time-travel debugging, n'ont pas hésité longtemps. C'est de cette transition qu'est née **1er Octet**, une agence entièrement positionnée sur l'écosystème JavaScript pour le mobile.

---

## Altered TCG : React Native WebView en production

Le projet le plus révélateur de l'épisode, c'est **Altered**, le jeu de cartes à collectionner français. L'application mobile n'était pas une option : chaque carte physique est imprimée avec un QR code, donc sans app, pas de jeu.

### L'architecture WebView + caméra native

La contrainte était double : livrer vite (le site web mobile-first existait déjà) et gérer un scan multi-cartes en temps réel. La solution choisie ? Un wrapper React Native qui encapsule le site web dans une WebView, avec une couche native uniquement pour la caméra.

_"On est parti sur les WebViews parce que le site web était déjà mobile-first, hyper clean. C'était aberrant de refaire tout le site."_

Le scanner ne lit pas un simple QR code : il détecte plusieurs cartes défilant rapidement sur une table, en temps quasi-instantané. La bonne surprise ? Les API natives iOS et Android embarquent désormais du machine learning pour ce type de multi-scan. Le module **React Native Vision Camera** a fait le reste.

### Communication entre WebView et React Native

L'enjeu technique clé : faire parler la WebView et la couche native. La solution adoptée repose sur l'injection de méthodes JavaScript depuis React Native (`onScan`, par exemple) que le site web peut appeler directement. L'application mobile n'envoie que l'identifiant du QR code — c'est le site qui récupère les données, les images et les renvoie à la WebView pour affichage.

> _"L'appli mobile envoie que l'identification du QR code au site web, le site fait ses requêtes, et c'est la WebView qui affiche les vrais composants derrière. Il y avait très peu de React Native au final."_ — Thibault Lenclos

Un choix pragmatique qui a permis de livrer en quelques jours, avec une maintenabilité maximale.

---

## La tech stack React Native cross-platform de 1er Octet en 2026

### State management & data fetching

Finis les grands monolithes Redux sur chaque projet. **React Query** gère désormais le state réseau, et un state manager léger (Zustand ou équivalent) intervient uniquement quand la complexité le justifie. Redux reste pertinent — Thibault le confirme — sur des applications web à très forte complexité visuelle avec du window management avancé. Mais en mobile, ce n'est plus le point de départ.

Autre pratique systématique dans l'agence : la **génération de clients API** à partir de spécifications OpenAPI ou GraphQL via des outils comme **Orval**. Plus de types écrits à la main, plus de désynchronisation entre back et front, et même une validation en CI qui fait échouer le build si le contrat d'API a changé.

### Navigation : éviter les pièges

Thibault a une cicatrice sur ce sujet : Wix React Native Navigation. Les animations étaient belles, mais les crashes inexpliqués et les breaking changes à chaque montée de version ont eu raison de l'expérience.

La leçon ? Rester sur **React Navigation** en combinaison avec Expo, ne pas chercher à intégrer les transitions avancées dès le début, et les ajouter par itérations une fois l'app stable. Sur la question d'**Expo Router**, il reconnaît sa pertinence — notamment pour le rêve d'une codebase web/mobile unifiée — tout en gardant un œil sur le vendor lock-in inhérent à l'écosystème Expo.

### CI/CD avec EAS

La stack CI repose sur **GitHub Actions** pour les tests et la compilation JS, et sur **Expo EAS** pour les builds et le déploiement. L'agence a opéré 3 à 4 migrations Fastlane → EAS, à chaque fois pour le même résultat : un gain de temps monumental et la fin des allers-retours dans les portails Apple.

_"Je veux plus aller dans les developer portals d'Apple."_

---

## IA et développement : outil, pas raccourci

L'épisode s'ouvre sur une provocation — les AI slop pull requests qui polluent les projets open source — mais Thibault n'est pas alarmiste. Il rejette les discours défaitistes sur la mort du développeur frontend et préfère une posture plus nuancée.

Son équipe utilise **Cursor** comme IDE principal, avec des commandes partagées pour générer des CRUDs via des prompts, et des **règles Cursor** propres aux projets. L'outil suit les statistiques de code généré par IA par commit (parfois 30% en début de projet), ce qui permet d'analyser les usages en équipe.

> _"On cherche à avoir des humains derrière qui font des applis. Par contre, on veut vendre le plus possible de jours au meilleur prix — et l'IA nous permet de faire plus pour un peu moins cher."_ — Thibault Lenclos

Sa règle personnelle sur le développement de jeux vidéo (Godot) : utiliser l'IA en mode **"je demande et j'analyse"**, pas en mode agent autonome — pour préserver l'apprentissage et la compréhension des problématiques de performance propres au jeu vidéo.

---

## Godot, Tauri et la curiosité du développeur cross-platform

Ce qui distingue Thibault, c'est une curiosité permanente pour les technologies adjacentes. Après avoir exploré **Tauri** (l'alternative Rust + WebView à Electron) pour un projet d'enregistrement audio avec transcription IA, il s'est lancé dans le développement de jeux vidéo avec **Godot**.

Godot est un moteur open source, libre, qui se déploie partout — y compris en WebAssembly — et qui est littéralement construit avec lui-même. Depuis sa dernière version, il peut être embarqué en librairie statique dans n'importe quel projet. Résultat : quelqu'un l'a déjà intégré dans React Native. Le jeu en cours de développement ? Un petit jeu 2D à sortir sur Steam en 2026.

_"En 2026, je sors un jeu."_

Cette exploration permanente des paradigmes — animations avec React Native Skia, entité-composant dans les moteurs de jeu, performance bas niveau en Rust — c'est précisément ce qui nourrit une compétence **React Native cross-platform** plus solide au quotidien.

---

## Conclusion

Quinze ans après Titanium, React Native reste la technologie de référence pour Thibault : écosystème JavaScript universel, onboarding simplifié pour des devs web, Expo qui résout les problèmes de DX et de CI. Flutter ? Trop de Dart, des choix architecturaux contestables. L'app universelle web/mobile parfaite ? Probablement un mythe — ou un objectif à atteindre par itérations, pas en une seule tentative héroïque.

Ce qui ressort de cet épisode, c'est une philosophie de développeur expérimenté : choisir ses batailles, rester curieux des technologies périphériques, et ne pas abandonner les fondamentaux au profit des raccourcis.

**Abonnez-vous au Cross Platform Show** sur Apple Podcasts ou Spotify, laissez 5 étoiles si cet épisode vous a appris quelque chose, et retrouvez Thibault sur [premieroctet.com](https://premieroctet.com) et BlueSky à `@tpbiz`.

---

## Key Takeaways

- **Titanium était déjà React Native**, mais il y a 15 ans : même paradigme JS-to-native, écosystème moins mature. L'histoire se répète.
- **Une WebView bien architecturée peut valoir une app native** : Altered TCG tourne principalement sur une WebView avec uniquement la caméra en natif — et ça fonctionne en production.
- **React Query a remplacé Redux** sur la majorité des projets mobiles, sauf pour les apps web à très forte complexité d'état.
- **Ne pas intégrer les animations avancées dès le départ** : livrer une navigation stable, puis itérer. Le progressive enhancement marche aussi en mobile.
- **Générer ses clients API** (Orval, OpenAPI) et valider le contrat en CI évite des bugs insidieux lors des évolutions d'API.
- **L'IA est un outil d'amplification, pas de remplacement** : l'agence mesure le pourcentage de code IA par commit et maintient une culture d'apprentissage actif, notamment sur les nouveaux domaines comme le jeu vidéo.
- **La "universal app" web+mobile est probablement un mythe** — la qualité de rendu exige souvent de dupliquer et d'adapter, et c'est acceptable.
