# Migrer de React Native vers Expo : retour d'une app en prod

Quand on parle de migration React Native vers Expo, la plupart des articles restent théoriques. Audrey, développeuse mobile chez [Karnott](https://www.karnott.fr/), a fait le grand saut en conditions réelles — sur une app de production utilisée par des chauffeurs de tracteurs en plein champ, sans filet. Dans cet épisode du Cross Platform Show, elle raconte les quatre mois de travail, les librairies géospatiales qui font vraiment la différence, et le bug de déconnexion qui lui a coûté plusieurs semaines de sommeil.

---

## D'une formation accélérée à développeuse React Native solo

Audrey ne vient pas d'une école d'ingénieurs traditionnelle. Après une première année de licence maths-info à l'université d'Artois, elle s'arrête. Dix ans plus tard, profitant d'une période plus calme côté famille, elle rejoint la Pop School de Lens — un bootcamp de quatre mois qui survole HTML, CSS, JavaScript, PHP, React et même un peu de React Native.

Timing parfait, ou presque : le confinement de 2020 commence le lundi suivant sa rentrée. La formation se termine à distance. Mais au bout de six mois de stage — une app de tourisme géolocalisée développée seule de A à Z avec Expo — elle décroche un poste chez Karnott. En 2021, elle devient la seule développeuse mobile de la startup lilloise, spécialisée dans l'agriculture connectée.

> "J'avais fait 6 mois de stage où j'étais toute seule et fallait développer une app mobile React Native pour un MVP. C'est ça qui m'a permis d'entrer chez Karnott." — Audrey

---

## La stack de Karnott : React Native vanilla depuis 2018

L'application Karnott existe depuis 2018. Quand Audrey arrive, la stack est du React Native "from scratch" — pas d'Expo, pas de TypeScript, Redux pour le state management, et Fastlane + GitHub Actions pour les releases.

L'app est ambitieuse : elle permet aux entreprises de travaux agricoles et viticoles de suivre leurs parcelles, leurs matériels et leurs interventions. Côté carto, c'est dense — polygones de parcelles, tracés GPS des trajets, affichage de layers IGN. Côté navigation, c'est une imbrication de drawer, bottom tab et top bar navigators avec une quarantaine d'écrans.

Le vrai problème ? La reproductibilité. Cloner le repo et faire tourner l'app localement relevait de l'exploit.

> "Tu clonais le repo de la V1, c'était impossible. Mon collègue était incapable de le faire tourner sans faire des modifs. Et s'il faisait ses modifs, ça tournait plus chez moi. C'est horrible." — Audrey

---

## Pourquoi migrer vers Expo — et combien ça coûte vraiment

La migration React Native vers Expo a été initiée avec l'aide de l'agence [weshipit.today](https://weshipit.today/). Sur le papier : deux semaines pour un initial push. En réalité : quatre mois pour arriver à une V2 complète en production. Et pour cause — la migration a été l'occasion d'ajouter TypeScript, mettre à jour les dépendances et refactoriser des parties entières du code.

C'est littéralement tout ce qu'il faut maintenant pour lancer le projet sur n'importe quelle machine : `npx expo start`. Plus de conflits de certificats Ruby, plus de profils Apple qui mystérieusement expirent, plus de dépendances incompatibles entre postes de dev.

Côté CI/CD, GitHub Actions reste en place pour le versioning automatique. Le build passe désormais par EAS Build, avec un submit automatisé vers les stores. Les OTA updates sont dans la todo list — comme chez beaucoup d'équipes qui, une fois que le build fonctionne parfaitement, hésitent à toucher à ce qui marche.

> "Tu lances `npx expo start` et c'est parti. Quand tu as testé, tu ne reviens pas en arrière." — Audrey

---

## Les librairies géospatiales indispensables pour une app agricole

Une app d'agriculture connectée, c'est avant tout une app de cartographie. Voici les trois librairies qui font tourner Karnott au quotidien.

### D3-scale — dessiner des parcelles vectorielles

Karnott n'utilise pas D3 dans son intégralité — juste le module [`d3-scale`](https://d3js.org/d3-scale). En lui passant la bounding box d'une parcelle avec ses données géométriques, il génère un SVG scalable du contour de la parcelle. Le résultat est vectoriel, redimensionnable à l'infini, et ne nécessite pas de tuiles cartographiques. Idéal pour afficher une parcelle dans une petite icône ou en plein écran.

### React Native Maps — la carto sans prise de tête

[React Native Maps](https://github.com/react-native-maps/react-native-maps) gère l'affichage cartographique principal : marqueurs, polygones de parcelles, polylines pour les tracés GPS. Apple Maps sur iOS, Google Maps sur Android — automatiquement. Karnott y a ajouté un layer de fond IGN, très demandé par les clients agricoles qui ont besoin du cadastre pour se repérer précisément dans leurs champs.

### Turf.js — la lodash du géospatial

[Turf.js](https://turfjs.org/) est la bibliothèque d'analyse géospatiale côté client. Chez Karnott, elle sert principalement à calculer la bounding box englobant un ensemble de parcelles — pour centrer automatiquement la carte au bon endroit. Simple en apparence, mais recalculer ça à la main sur des données géographiques (où la Terre est ronde et les projections complexes) serait une source de bugs sans fin.

---

## Debugger en production : le bug de déconnexion qui a duré des mois

Pendant plusieurs mois, des clients remontaient des déconnexions intempestives. L'app, revenue au premier plan depuis le background, les déconnectait sans raison apparente. Le problème ne se reproduisait pas systématiquement. Pas de pattern clair. Pas de différence iOS / Android.

La stratégie de debug : logger côté API pour tracer les appels avec des tokens invalides. Résultat : on voit que les clients font des appels avec un token révoqué, mais impossible de comprendre pourquoi le nouveau token n'a pas été persisté.

La solution, trouvée lors d'une session de brainstorming avec toute l'équipe tech (y compris des profils non-mobile) : un **flush forcé de l'Async Storage** au moment de l'écriture du refresh token. Sans ce flush, si l'app passait en background au mauvais moment, le nouveau token n'était pas correctement écrit. Au redémarrage, Redux était réhydraté avec l'ancien token — déjà révoqué.

> "Cache ne s'invalide pas. C'est l'un des trois grands problèmes du programming." — David Leuliette

Le fix est en prod. Les clients recontactés n'ont plus le problème. Mais comme les déconnexions n'étaient pas systématiques, la confirmation totale attendra le retour de la pleine saison agricole.

---

## Reactotron : l'outil de debug que tout dev Redux devrait connaître

Pendant toute la V1, Audrey debuggait à coups de `console.log` dans le terminal. Pas de React DevTools — le repo était trop instable pour les lancer. Avec la V2 et Expo, elle découvre [Reactotron](https://github.com/infinitered/reactotron).

La différence ? Jour et nuit. Reactotron affiche en temps réel :

- Tous les appels API avec leurs payloads et responses
- L'état du store Redux à chaque action
- Les logs custom
- La possibilité de rejouer des actions passées

Le plugin Redux de Reactotron permet de visualiser le state complet de l'app — particulièrement utile quand ce state contient des données géographiques complexes. Bonus : on peut connecter plusieurs apps simultanément. Pratique pour comparer le comportement iOS vs Android sur le même bug.

---

## En 2025, on démarre comment un nouveau projet React Native ?

La réponse d'Audrey est sans appel : **Expo**. Pas parce que c'est à la mode, mais parce que l'écosystème a atteint une maturité que React Native vanilla ne peut pas offrir en solo ou en petite équipe. Quelques points à retenir pour bien démarrer :

- **Ne pas migrer pour migrer** : en conditions réelles, comptez 4 mois, pas 2 semaines.
- **En profiter pour ajouter TypeScript** : la migration est le bon moment pour investir dans l'intégrité des données.
- **EAS Build change la donne** : fini les conflits de certificats Apple et les scripts Fastlane fragiles.
- **Reactotron dès le départ** : ne pas attendre d'avoir un bug de prod pour installer son outil de debug.
- **Turf.js + D3-scale** pour toute app avec une composante géospatiale : ne pas réinventer la roue.

---

## Conclusion

Ce que l'épisode avec Audrey démontre surtout, c'est que la migration React Native vers Expo n'est pas juste une décision technique — c'est un investissement dans la durabilité du projet. Quand une seule développeuse peut faire tourner, builder et shipper une app de production complexe avec de la cartographie et du suivi GPS, c'est que l'outillage fait vraiment le travail.

🎙️ **Écoutez l'épisode complet** du Cross Platform Show et suivez Audrey sur [BlueSky](https://bsky.app/profile/shinelia.bsky.social) pour suivre les aventures de Karnott.

---

## Key Takeaways

- **La migration React Native → Expo prend du temps en conditions réelles** : comptez 4 mois pour une app de production, pas 2 semaines.
- **La reproductibilité locale est sous-estimée** : `npx expo start` qui marche sur toutes les machines est un gain de productivité immédiat.
- **D3-scale + React Native Maps + Turf.js** forment un trio redoutable pour toute app géospatiale.
- **Les bugs de token/cache sont classiques mais vicieux** : un flush forcé de l'Async Storage au bon moment peut éviter des mois de déconnexions mystérieuses.
- **Reactotron est indispensable dès qu'on fait du Redux** : voir le store et les appels API en temps réel change complètement la façon de debugger.
- **Aller aux salons clients, c'est du dev** : comprendre le métier de ses utilisateurs change la façon d'écrire les règles métier.
- **Un parcours non-linéaire mène quand même à l'expertise** : bootcamp + MVP en stage + immersion solo en prod = développeuse React Native à part entière.

---

## Ressources mentionnées

- [Karnott — agriculture connectée](https://www.karnott.fr/)
- [D3-scale](https://d3js.org/d3-scale)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Turf.js](https://turfjs.org/)
- [Reactotron](https://github.com/infinitered/reactotron)
- [React Native Permissions (Zoontek)](https://github.com/zoontek/react-native-permissions)
- [RNX-Kit (Microsoft)](https://github.com/microsoft/rnx-kit)

**David Leuliette** → [Twitter](https://x.com/flexbox_) · [BlueSky](https://go.bsky.app/6QQemwz) · [weshipit.today](https://weshipit.today/)

**Audrey Wech** → [BlueSky](https://bsky.app/profile/shinelia.bsky.social)
