# React Native en entreprise : les leçons de Cdiscount

Faire du React Native en entreprise aujourd'hui, c'est `npx expo start` et une doc qui répond à toutes les questions. En 2018, c'était une autre histoire. Dans le tout premier épisode du Cross Platform Show, David Leuliette reçoit Ludwig Vantours, développeur React Native depuis 2018 et freelance, pour revenir sur sa première app mobile : celle de Cdiscount.

Une grosse DSI, des feature teams, des RFC avant chaque ligne de code — et en face, un écosystème qui n'avait ni framework, ni TypeScript, ni breakpoints fiables. Cet épisode raconte ce que ça donne quand une organisation très structurée rencontre une techno encore sauvage. Redux Saga, snapshot testing, Fastlane sur des postes Windows, 200 000 crashs le lendemain de Noël : tout y passe.

---

## 2018 chez Cdiscount : Redux, Redux Saga et le Far West

Quand Ludwig arrive sur l'app Cdiscount, on est en pleine époque Redux. Pas de hooks, que des class components, et un problème récurrent : partager une information entre plusieurs endroits de l'arbre React.

> "Avant, on faisait souvent du props drilling, on passait des données à travers tout l'arbre. C'était ultra contraignant, pas très performant." — Ludwig Vantours

Redux apporte des principes d'ingénierie beaucoup plus carrés pour le state management global. Redux Saga complète le tableau avec les fonctions génératrices, qui s'exécutent pas à pas : la seconde étape ne démarre jamais avant que la première soit terminée. À une époque où aucune librairie de data fetching n'existait, c'est ce qui permettait d'orchestrer l'UI, les appels réseau et l'asynchrone.

Le reste de la stack était à l'avenant. Pas de TypeScript : il fallait connaître par cœur son contrat de données avec l'API et poser manuellement des garde-fous sur les valeurs `null` et `undefined`, sans optional chaining. Pour transformer les données du back-end vers le format attendu côté front, l'équipe utilisait massivement **Ramda**, l'équivalent de lodash orienté programmation fonctionnelle — un paradigme que Ludwig a mis du temps à digérer.

> "Au tout début, on n'avait rien. Il fallait tout... C'était le Far West !" — Ludwig Vantours

---

## Faire du React Native en entreprise : RFC, feature teams et core team

C'est là que l'expérience Cdiscount devient intéressante. Une grosse DSI, beaucoup de développeurs, et surtout des process — c'est chez eux que Ludwig apprend à coder de façon industrielle.

Avant de commencer une feature, on écrivait une **RFC** décrivant l'implémentation : quelle folder structure, comment ranger le code, jusqu'aux conventions de nommage. Est-ce qu'on appelle ça un carousel ou un slider ? La question se tranchait là, pas trois mois plus tard quand quinze composants de modale presque identiques cohabitent déjà dans le repo.

L'organisation était en feature teams : une équipe tracking, une équipe acquisition, et une core team. Le garde-fou principal : **toutes les pull requests devaient être validées par la core team**. Efficace pour éviter le bordel sur une app partagée, mais coûteux — demander une review, c'était négocier des jours-hommes avec une autre équipe.

> "La bureaucratie des grandes boîtes, ça se comprend dans un sens, mais c'est vrai que ça peut freiner l'innovation." — Ludwig Vantours

Côté produit, Cdiscount opérait trois plateformes distinctes : un site web desktop, un site web mobile dédié, et les applications React Native. Elles communiquaient uniquement par le back-end — pas de monorepo, pas de composants partagés, la notion n'existait tout simplement pas. Le header servait d'orchestrateur pour le contenu des vues, ce qui rendait l'ingénierie entre web et mobile plutôt complexe.

---

## Naviguer, styler, animer sans écosystème

La navigation, c'était React Navigation, avec un détour par la librairie de Wix pour tester la navigation native. Le pattern retenu : un drawer pour les infos utilisateur, une bottom tab, et derrière chaque tab une stack d'écrans à pusher. Le problème de performance était structurel : tout était géré en JavaScript.

Le styling ? Tout à la main, avec l'API StyleSheet : les grosses librairies UI React commençaient à peine à émerger. Les animations ? Quasi inexistantes — l'interface restait statique, et la seule option était ce que fournissait React Native de base. Reanimated V1 existait, mais en mode impératif, avec une syntaxe complexe ; c'est la V2 et son approche déclarative qui a rendu la librairie populaire. Ludwig a d'ailleurs appris l'animation via les vidéos de William Candillon — des principes qu'il a ensuite ressortis en entretien d'embauche.

Pour tester, l'équipe faisait des **snapshots avec Jest** : snapshot de l'arbre React avec ses styles et ses props, pour détecter les régressions. Et, plus malin, des snapshots des outputs de sagas, pour vérifier qu'une séquence asynchrone restait déterministe.

---

## Le jour où l'app a généré 200 000 crashs

Le déploiement passait par **Fastlane** — builds, signature de code, publication sur l'App Store et la Play Console — orchestré par une CI maison sur TFS, la solution de versionnement de Microsoft. À chaque merge de pull request, un build était généré avec un QR code pour l'installer. Une PR, un build. Les updates over-the-air n'existaient pas encore : chaque correctif repassait par la case store.

Détail savoureux : l'équipe travaillait sur des postes Windows, et Ludwig a dû faire du lobbying pour obtenir des Mac et travailler vraiment sur iOS. En attendant, un serveur de build iOS permettait de debugger depuis Windows — avec un bundler qui mettait 5 à 10 minutes à préparer l'app.

Puis vient l'anecdote qui résume tout. Autour de Noël, la courbe de crashs iOS s'envole : **plus de 200 000 crashs en une journée**. Tous les utilisateurs iOS d'une certaine version qui lançaient l'app le 25 ou le 26 décembre plantaient. Crashlytics — encore standalone, avant son rachat par Firebase — donne la stack trace et confirme un problème natif. La cause : un SDK Adobe qui appelait une fonction sans logique de try-catch.

Trouver ça demandait de sortir du confort JavaScript : ouvrir Xcode, lire le code du SDK, comprendre l'Objective-C et ses déclarations de headers sans connaître le langage. C'est exactement là que React Native en entreprise devient intimidant — sauter dans le natif sans en avoir ni les compétences ni les outils.

> "J'ai envie de comparer cette époque de React Native avec la pratique du surf. Au début, c'est juste ingrat, tu prends aucun plaisir, c'est dur, ça marche pas, tu galères. Mais une fois que tu as réussi à prendre une vague, c'est génial." — Ludwig Vantours

---

## React Native en entreprise aujourd'hui : de l'agglomération au framework

Le fil rouge de l'épisode tient dans une phrase : React Native n'était pas un framework, mais une agglomération de librairies à orchestrer, au choix du développeur. D'où l'obligation d'être extrêmement carré sur son architecture. Les montées de version étaient une épreuve à part entière : avant l'autolinking, il fallait modifier soi-même sa main activity et appliquer les diffs à la main sur des fichiers déjà personnalisés.

Aujourd'hui, l'écosystème s'est consolidé autour d'Expo, et l'argument de l'éjection ne tient plus : l'architecture est modulaire, et un config plugin suffit à intégrer une librairie native.

> "Ils ont pris tous les pain points, ils les ont tacklés." — Ludwig Vantours

Le débogage a suivi la même trajectoire. Après des années de `console.log` comme seule méthode fiable, Ludwig utilise aujourd'hui **Radon IDE**, qui intègre le simulateur dans VS Code ou Cursor : sélection d'un élément qui renvoie vers le code, enregistrements d'écran, plugins Expo pour explorer son cache React Query — et surtout, des breakpoints. Arrêter l'exécution, inspecter ses variables, relancer l'app sans tout casser : un acquis récent en React Native.

Pour rester à jour, sa méthode tient en un mot : les conférences. App.js à Cracovie, React Native Connection à Paris, les meetups — aller rencontrer physiquement les gens actifs de l'écosystème.

---

## Conclusion

Ce premier épisode ne raconte pas une success story technique, il raconte une trajectoire. Chez Cdiscount, la rigueur venait de l'organisation — RFC, feature teams, validation par la core team, snapshot testing — parce que la techno, elle, n'en imposait aucune. Aujourd'hui, cette discipline est en grande partie absorbée par l'outillage : Expo pour le build, TypeScript pour le contrat de données, Radon IDE pour le debug.

Ce que ça n'enlève pas, c'est la compétence de fond. Quand on demande à Ludwig ce que React Native lui a appris sur le développement logiciel, sa réponse tient en deux mots : **la patience et la résilience**. Gérer deux plateformes avec leurs différences, tester sur de vrais appareils et pas seulement sur simulateur, encaisser qu'une release prenne deux jours parce que les permissions Android ont changé. L'outillage a supprimé la douleur inutile ; le reste du métier n'a pas bougé.

---

## Key Takeaways

- **Redux Saga répondait à un vrai vide** : sans librairie de data fetching, les fonctions génératrices orchestraient pas à pas l'UI et l'asynchrone — et se testaient via des snapshots vérifiant leur déterminisme.
- **Les RFC avant de coder évitent la dette d'architecture** : trancher folder structure et conventions de nommage en amont, plutôt que découvrir quinze composants presque identiques.
- **La validation par une core team est un arbitrage** : elle protège la cohérence de l'app, au prix de temps négocié entre équipes et d'une innovation ralentie.
- **Sans TypeScript, la rigueur était manuelle** : garde-fous sur `null` et `undefined`, connaissance parfaite du contrat de données, aucun optional chaining.
- **Un crash natif peut venir d'un SDK tiers** : 200 000 crashs iOS en une journée, causés par un appel sans try-catch dans un SDK Adobe, identifiés via la stack trace Crashlytics.
- **React Native était une agglomération de librairies, pas un framework** : cette absence de cadre rendait l'architecture critique — c'est ce qu'Expo a comblé.
- **Le breakpoint fiable est un acquis récent** : après des années de `console.log`, Radon IDE ramène simulateur et debug pas à pas dans l'éditeur.
