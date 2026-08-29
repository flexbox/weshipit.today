# Code partagé web et mobile : la stack React Native d'Ornikar

Chez [Ornikar](https://www.ornikar.com/), le code partagé web et mobile n'est pas un exercice de style : c'est ce qui permet à une équipe tech d'une cinquantaine de personnes de faire tourner trois applications mobiles et deux sites sans tout écrire deux fois. Romain Spielmann, lead front-end sur la partie assurance, raconte dans cet épisode du Cross Platform Show comment son équipe est passée d'une grosse webview à une architecture Next.js + Expo reliée par Solito.

Au programme : pourquoi ils n'ont pas pris Expo Router début 2023, comment un design system universel absorbe les différences de plateforme, ce que coûte une librairie d'UI qui n'est plus maintenue, et pourquoi Romain recommande NativeWind aujourd'hui.

---

## De la webview à la refonte : le point de départ

Ornikar fait deux métiers : l'auto-école historique — code, conduite, permis — et l'assurance auto, dont l'entreprise vend ses propres contrats depuis 2020. C'est sur cette seconde partie que travaille Romain. Résultat côté stores : trois apps distinctes, deux squads, et un backend Nest d'un côté, PHP + GraphQL de l'autre.

L'entreprise a commencé par le web en React, puis a basculé mobile first sur React Native. D'où un héritage encombrant : quand Romain arrive, l'app assurance est essentiellement une webview avec une navigation native par-dessus.

> "C'était vraiment une grosse webview avec la navigation qui était native, et ensuite on ne faisait qu'afficher les éléments du site web." — Romain Spielmann

La refonte démarre début 2023, portée par un besoin design — la charte n'était plus assez évolutive — dans lequel l'équipe a glissé une refonte technique. Le timing est particulier : Expo Router venait tout juste de sortir en release candidate, et partir sur une app en production avec une techno aussi fraîche ne les rassurait pas. Le choix se fige donc sur Next.js côté web, Expo managed côté natif, et Solito pour relier les deux dans un monorepo Yarn workspaces.

---

## Solito : une navigation unifiée entre web et mobile

Solito, la librairie de Fernando Rojo, mappe les URLs Next.js avec celles de React Navigation. Une seule API pour créer un lien, web ou natif.

Avant, Ornikar maintenait sa propre couche maison : elle fonctionnait, mais avec beaucoup de boilerplate au setup. Depuis, la question de migrer vers Expo Router ne se pose plus : tout le monde est à l'aise, ça tourne, et le changement impliquerait de toucher au routing web.

Deux points ont demandé du code maison. **Les modales routées** d'abord : pour atterrir directement sur une modale via un deep link, un query param indique laquelle ouvrir. **Les magic links** ensuite : l'app étant bloquée derrière l'authentification, un deep link cliqué par un utilisateur déconnecté ne faisait rien. Aujourd'hui le lien connecte automatiquement et redirige sur le bon écran ; si le token est expiré, l'URL est sauvegardée le temps de la reconnexion.

---

## Un design system universel pour partager le code web et mobile

Tout passe par une librairie universelle qui expose les primitives : views, boutons, textes. Web et mobile consomment les mêmes composants, sans distinction, et les deux squads la partagent. C'est cette couche qui rend le code partagé web et mobile viable à l'échelle de trois apps.

La base technique, en revanche, montre ses limites : c'est encore **NativeBase**. La librairie n'est plus maintenue, des props sont dépréciées et certaines ne se propagent plus — notamment celles d'accessibilité, ce qui est devenu franchement pénible lors de la migration vers React Native Web 0.19. La version 0.21 avec React 19 arrive, et l'équipe sait déjà que l'upgrade sera un chantier. Une migration est en discussion, peut-être vers Tamagui, mais rien n'est arbitré — l'avantage d'avoir tout centralisé étant que le remplacement reste envisageable composant par composant.

Les divergences de plateformes sont cachées au même endroit, pour que la DX dans les apps reste la meilleure possible :

- Une modale s'affiche en full screen sur natif, mais sous forme de carte centrée sur le web — la logique est dans le composant, pas dans les écrans.
- Le viewer de PDF passe par une WebView sur iOS, et par un Android Intent qui ouvre le document dans l'app installée sur le téléphone.
- Le reste se règle avec des fichiers `.web`, `.ios`, `.android` ou `Platform.select`.

Côté animations, c'est Reanimated partout, web compris — jusqu'à la pluie d'emojis calendrier lors d'une prise de rendez-vous pour un bris de glace.

---

## Data layer, releases et tests

Le reste de la stack est volontairement sobre. React Query gère les données, web comme natif. Zustand ne sert qu'au peu de choses à persister : le type de contrat choisi dans un parcours, ou le fait qu'une modale de notification push a déjà été affichée. Pour le reste, React Context. Pas d'offline non plus : dans l'assurance, on consulte ses informations de temps en temps, ce n'est pas une app qu'on ouvre en permanence.

Les builds passent par **EAS**. CircleCI reste la CI de la boîte, mais côté assurance son seul rôle est de lancer le job EAS derrière — plus de certificats ni de provisioning profiles à gérer à la main. Le rythme de release suit les features : parfois toutes les semaines, parfois une fois par mois quand une migration Expo est en cours.

Sentry gère les crashes, Datadog les logs API. Les tests end-to-end reposent sur un outil interne basé sur Nightwatch, avec une couche qui masque la distinction web / natif pour n'avoir qu'un seul test à écrire.

Reste une règle tirée de plusieurs années de React Native : figer les versions, et laisser les mises à jour arriver par PR automatiques.

> "Mettre des valeurs absolues dans ton package.json. Parce que tu fais un npm install et ça t'upgrade une librairie dont t'étais pas au courant, avec un breaking change." — Romain Spielmann

---

## Une librairie d'analytics partagée entre les deux squads

La dernière grosse feature livrée par Romain n'est pas la plus glamour : le passage de Mixpanel à Segment, avec une librairie d'analytics commune aux deux squads.

Tout le travail a consisté à la rendre invisible à l'usage. L'initialisation du provider n'est pas la même sur web et sur natif : c'est la lib qui absorbe la différence, gère le consentement et injecte les infos de contexte. Dans les apps, il ne reste qu'un hook `useAnalytics` exposant `identify`, `track` et `page view` — les page views étant même automatisées via le changement d'état de React Navigation.

> "Le truc le plus lourd, c'est remettre en place tout le tracking plan qui a changé, modifier tous les events sur tous les CTA. C'est ça qui prend dix ans." — Romain Spielmann

---

## Les librairies à connaître, et pourquoi NativeWind aujourd'hui

La sélection de Romain, au-delà de Solito :

- **[Zeego](https://zeego.dev/)** — également de Fernando Rojo, un wrapper qui donne de vrais context menus natifs sur iOS et Android.
- **[Gorhom Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)** — full JS, mais très maintenue et capable d'encaisser tous les cas tordus : scroll interne, text input, clavier, snap points. Chez Ornikar, elle porte le picker de documents (caméra, galerie, fichiers).
- **[Apple Targets](https://github.com/EvanBacon/expo-apple-targets)** d'Evan Bacon — pour créer des widgets iOS et les synchroniser avec un projet Expo. Expérimental, mais très facile à mettre en place, et sans équivalent officiel côté Android.

Sur la librairie d'UI à choisir aujourd'hui, la réponse est **NativeWind** — et l'argument n'est pas esthétique. Les LLM ont infiniment plus de matière d'entraînement sur Tailwind que sur n'importe quelle autre approche. Sur son app perso Scory, un compteur de points pour jeux de société, Romain était sur Tamagui : chaque prompt à Cursor sortait des composants approximatifs, bourrés de props inutiles. La migration vers NativeWind, faite en grande partie par le LLM lui-même, a nettement amélioré le code généré. Il nuance tout de même : fournir la doc de la librairie en contexte, via un `llms.txt`, aurait sans doute changé le résultat.

Côté debug, c'est plus classique : `console.log`, et **React Scan** pour traquer les re-renders — l'équivalent est dans le debugger Expo depuis le SDK 52, les composants concernés étant surlignés à l'écran.

---

## Conclusion

Ce que montre la stack d'Ornikar, c'est qu'un vrai partage de code web et mobile ne tient pas à une librairie miracle mais à une discipline : une librairie universelle qui expose les primitives, une navigation unifiée, une lib d'analytics qui masque les différences de plateforme. Chaque divergence entre iOS, Android et le web est absorbée dans la couche partagée plutôt que répandue dans les écrans.

C'est aussi ce qui rend la dette supportable : NativeBase n'est plus maintenue, mais la migration reste envisageable parce que tout passe par un seul point d'entrée. Et le choix conservateur de 2023 tient encore, précisément parce qu'il n'avait pas été fait par mode.

---

## Key Takeaways

- **[Next.js + Expo + Solito](https://solito.dev/)** est une combinaison éprouvée en production pour partager la navigation entre web et mobile, avec une seule API de liens.
- **Ne pas parier une app de prod sur une techno en release candidate** : Ornikar a écarté Expo Router début 2023, et n'a toujours pas de raison de migrer.
- **Tout faire passer par une librairie universelle de primitives** rend une migration de design system envisageable composant par composant.
- **Une librairie d'UI non maintenue coûte surtout en accessibilité et en upgrades** : props qui ne se propagent plus, migrations React Native Web douloureuses.
- **Les divergences de plateforme se cachent dans le design system**, pas dans les écrans : modale full screen sur natif contre carte sur web, WebView iOS contre Android Intent.
- **Changer d'outil d'analytics coûte moins l'intégration que le tracking plan** à réimplémenter sur tous les CTA.
- **NativeWind s'impose pour une raison d'outillage** : les LLM produisent un bien meilleur code avec Tailwind qu'avec les alternatives.
