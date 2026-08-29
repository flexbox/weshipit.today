# Optimiser les performances React Native : 10 conseils testés

Callstack a publié un guide de 120 pages pour optimiser les performances React Native. Personne n'a le temps de le lire en entier. Dans cet épisode du Cross Platform Show, David Leuliette déroule ses dix conseils avec Matthys Ducrocq, CTO mobile et développeur de l'application Ekklo — un par un, avec à chaque fois la seule question qui compte : est-ce que ça change quelque chose dans une app en production ?

Matthys fait du React Native depuis 2020. Il vient de Flutter et d'Android Studio, et c'est ce qui l'a fait basculer : « avec React Native t'as pas tout le bordel d'Android Studio — avec Expo ça va tellement plus vite ». Voici ce qu'il retient du guide, et ce qu'il en écarte.

---

## Avant d'optimiser les performances React Native, définir la performance

Le piège du top 10, c'est d'optimiser sans savoir ce qu'on mesure. Matthys revient donc à la définition retenue par Callstack : la performance, c'est le **rendu visuel**, pas ce qui se passe réellement dans le téléphone.

> "On peut avoir une application très fluide mais un visuel qui lag. Alors qu'un visuel qui ne lag pas, même si l'application n'est pas si fluide, l'utilisateur a l'expérience d'une application rapide." — Matthys Ducrocq

Deux métriques traduisent ça. Le **Time To Interactive** : le temps entre l'appui sur l'icône et le moment où l'utilisateur peut agir. Le **Time To Specific Screen**, mesuré sur une feature précise — combien de temps pour atteindre l'écran d'édition de son profil. Une feature très utilisée qui met trois secondes à s'ouvrir, c'est de la rétention en moins.

Le terrain d'application, c'est Ekklo : une plateforme qui remplace la paperasse des coachs sportifs. Le coach crée ses séances côté web, invite ses clients par lien et récupère leurs bilans. Rien d'exotique dans la stack — **Nuxt**, **Expo**, **Django**, **React Query**, **NativeWind** — ce qui rend les optimisations qui suivent d'autant plus transposables.

---

## React Compiler et Reanimated : le meilleur ratio effort / gain

**Conseil 1 — React Compiler.** L'outil applique automatiquement, au build, les `useMemo` et autres mémoïsations que vous écriviez à la main. Condition : que le code respecte les règles de React. « Si c'est codé n'importe comment, ça va pas fonctionner », prévient Matthys. L'outil est encore en bêta, mais Meta l'utilise déjà — argument suffisant pour tester. Sur React Native, le setup passe par Babel et Metro, et les erreurs remontent au build : à vérifier en dev build. Le bénéfice concret : plus besoin de saupoudrer des `useMemo` partout sans savoir s'ils servent.

**Conseil 2 — Reanimated plutôt qu'Animated.** L'API `Animated` fonctionne, mais elle est plafonnée à 60 FPS. Reanimated tourne sur le thread UI et dépasse cette limite. Comme la performance est d'abord visuelle, c'est le levier qui compte.

> "Callstack précise qu'il faut une performance visuelle, et Reanimated de Software Mansion offre cette performance visuelle." — Matthys Ducrocq

L'installation est immédiate, sans nouveau dev build à générer.

---

## Moins de vues, moins de rendus

**Conseil 3 — le view flattening.** En React Native, chaque `View` imbriquée finit en composant natif. Multiplier les wrappers pour appliquer un style, puis un autre, c'est multiplier le coût du rendu. « Plus il y a de rendus, moins on a de performance », résume Matthys. La parade est architecturale : factoriser, réutiliser des primitives plutôt que dupliquer. Restyle chez Shopify, CVA au-dessus de NativeWind pour gérer des variants sans copier-coller le même style, ou Tamagui qui fait le view flattening à la compilation.

**Conseil 4 — gérer l'état efficacement.** Découper le state en petits atomes indépendants réduit les rendus inutiles. Zustand et Legend State font le même travail — Legend State n'est pas dans le guide, il est arrivé après sa rédaction. Avec les DevTools, on voit l'écart en direct : « ça fait dix rendus en moins » sur un simple clic, comparé à des `useState` basiques.

Le vrai enseignement est un retour d'expérience, pas une lecture. Sur Ekklo, certains écrans gèrent une série de répétitions, un exercice, un chronomètre : dix à douze states par écran. Sans gestionnaire, les resets sont oubliés et les updates partent en vrille. La migration vers Legend State se fait morceau par morceau, parce qu'il y en a trop pour tout basculer d'un coup.

> "Le meilleur conseil, c'est de mettre un gestionnaire d'état dès le début de l'application." — Matthys Ducrocq

**Conseil 6 — React.memo et useCallback.** `React.memo` évite de re-rendre un composant, `useCallback` de recréer une fonction à chaque render. Mais le conseil se mord la queue : React Compiler le fait pour vous, et avec Zustand ou Legend State, seul le composant concerné se re-rend. La position de David est pragmatique : ouvrez le flame graph (touche `J` avec Expo), trouvez le composant coupable — une vidéo dans une ScrollView horizontale — et posez un `memo` là, précisément.

---

## Alléger le bundle pour optimiser les performances React Native

**Conseil 5 — minimiser la taille du bundle.** Six leviers cumulables :

- **ESLint** signale le code inutilisé avant le push. Simple, et souvent négligé.
- **react-native-bundle-visualizer** montre les librairies qui pèsent le plus.
- **Le tree shaking** s'active dans la config Metro, côté `transformer.minifierConfig.compress`.
- **Remplacer les librairies lourdes** : Moment.js pèse 70 ko contre 2 ko pour dayjs. Le guide recommande aussi Remeda plutôt que Lodash — une réécriture TypeScript sans le legacy accumulé depuis 2012.
- **Éviter les barrel imports** : `import take from 'lodash/take'` plutôt que la librairie entière. Même logique pour `vector-icons`.
- **`npx expo optimize`** pour les assets. David l'a lancé en direct : Sharp installé globalement, trente secondes, 320 ko économisés.

**Conseil 9 — désactiver la compression du bundle.** Contre-intuitif : la compression augmente la taille de l'APK _et_ le Time To Interactive. En la désactivant côté Android (`androidResources` / `noCompress` dans le `build.gradle`), le guide mesure jusqu'à 16 % de gain sur le TTI, et l'équipe React Native est en train d'en faire le défaut. Attention : ce n'est pas encore documenté côté configuration Expo.

---

## Charger plus tard, et sans bloquer l'UI

**Conseil 7 — le lazy loading.** Avec `React.lazy`, on n'affiche au démarrage que les composants nécessaires ; le reste charge en arrière-plan. Les skeletons participent à la même perception : « le temps qu'on voit quelque chose sur notre écran, on sait qu'il se passe la magie derrière ». Astuce de David : utiliser l'`ActivityIndicator` de React Native, qui reprend le spinner de l'OS — l'utilisateur a l'impression que c'est le téléphone qui rame, pas votre app.

**Conseil 8 — Concurrent React.** `useDeferredValue` affiche l'ancienne valeur le temps que la nouvelle se charge, sans écran blanc ni skeleton ; `useTransition` et Suspense complètent la panoplie, disponible depuis React 18. La précision que Matthys a tenu à ajouter en cours d'épisode : **il faut la nouvelle architecture**. Et pour y passer, vérifiez vos dépendances — un package annoncé _unsupported_, Stripe par exemple, peut très bien fonctionner si vous n'utilisez pas les fonctionnalités concernées.

---

## FlashList, FlatList, LegendList : essayez les trois

**Conseil 10 — FlashList au lieu de FlatList.** FlashList (Shopify) est plus fluide sur les listes de moins de 1 000 éléments, ce qui couvre la majorité des cas ; au-delà, FlatList reprend l'avantage. La prop `estimatedItemSize` l'aide à ne rendre que le visible. LegendList, développé par Jay, va plus loin avec une approche 100 % JavaScript, mais reste expérimental — à éviter en production. Les trois partagent à peu près la même surface d'API : changer d'import suffit pour comparer.

---

## Les simulateurs mentent

Le conseil le plus court est le plus rentable. Matthys développe sur un Honor 8X de 2016-2017 : si la feature tourne dessus, même avec du lag, elle tournera partout.

> "Si vous voulez optimiser vos applications, utilisez des vrais téléphones — parce que les simulateurs, ils mentent !" — Matthys Ducrocq

Un simulateur qui tourne sur un Mac M3 Max ne dit rien de l'expérience réelle. C'est aussi sur device qu'on voit les écarts de plateforme : la `Modal` de React Native est fluide et personnalisable sur iOS, quand sur Android elle devient une pop-up blanche qui lague.

---

## Conclusion

Dix conseils, mais pas une checklist à appliquer aveuglément. Si votre app n'a qu'une liste de dix éléments, FlashList ne servira à rien ; si vous utilisez Tamagui, le view flattening est déjà fait. Comme pour les recommandations de sécurité, certains conseils se contredisent — React Compiler contre `React.memo` en est l'exemple le plus net.

Ce qui reste universel : mesurer avant d'optimiser, viser la performance perçue plutôt que théorique, poser un gestionnaire d'état dès le premier écran, tester sur un vieux Android. Le reste dépend de vos problématiques.

---

## Key Takeaways

- **La performance, c'est ce que l'utilisateur perçoit** : Callstack la définit par le rendu visuel, mesuré via le Time To Interactive et le Time To Specific Screen.
- **React Compiler applique la mémoïsation au build**, à condition de respecter les règles de React — encore en bêta, mais déjà utilisé par Meta.
- **Reanimated dépasse les 60 FPS d'`Animated`** en travaillant sur le thread UI, et s'installe sans nouveau dev build.
- **Un gestionnaire d'état dès le premier écran** : sur Ekklo, des écrans à douze states ont imposé une migration progressive vers Legend State.
- **Le bundle s'allège par petites touches** : ESLint, tree shaking Metro, imports ciblés, dayjs plutôt que Moment, `npx expo optimize`.
- **Désactiver la compression du bundle Android** fait gagner jusqu'à 16 % de Time To Interactive selon le guide.
- **Concurrent React exige la nouvelle architecture**, et un package « unsupported » peut malgré tout suffire selon les fonctionnalités utilisées.
- **Il n'existe pas de liste ultime** : certains conseils s'annulent entre eux, tout dépend des problématiques du projet.
