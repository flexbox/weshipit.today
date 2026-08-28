# KicksFolio : shipper une app React Native avec Supabase

Peut-on lancer une app React Native avec Supabase sur l'App Store après seulement un an de code ? Rémy Cassagne l'a fait. Ancien commercial, recalé deux fois à la piscine de 42, il a shippé KicksFolio — une application pour référencer et partager sa collection de sneakers — en solo, pour moins de 500 euros de frais.

Dans cet épisode du Cross Platform Show, David Leuliette décortique avec lui les choix qui ont rendu ça possible : pourquoi abandonner un backend Rails pour Supabase, comment scanner un code-barres avec Expo Camera, ce que coûte vraiment une validation Apple, et pourquoi « inventer des chunks » c'est parfois juste redécouvrir la pagination.

---

## De commercial à développeur mobile : un parcours autodidacte

Rémy, 25 ans, n'a pas suivi le chemin classique. Après deux ans comme commercial, il tente la piscine de 42 en 2023 — sans jamais avoir ouvert un terminal de sa vie. Le langage C, les algorithmes « bêtes et méchants », l'entraide entre candidats : il adore, mais n'est pas retenu, ni cette année-là ni en 2024, malgré une piscine meilleure « en tout point ».

Plutôt que de ruminer, il enchaîne Ada Tech School puis Le Wagon, où il découvre Ruby on Rails et la réflexion produit. Mais le vrai moteur, c'est une idée d'application qu'il porte depuis le début : KicksFolio. Pour y arriver, il se construit une roadmap d'apprentissage démarrée entre avril et juin 2024 : JavaScript et TypeScript, puis React, puis Next, puis React Native directement sur son application. « J'avais plus l'envie de continuer à faire des petits projets pour m'entraîner, j'avais envie de rentrer dans le dur. »

---

## KicksFolio, le Yuka de la sneaker

Le pitch tient en une phrase : référencer sa collection de sneakers sur son téléphone « avec une UI un peu plus sympa qu'un Excel ou une note iPhone », la partager et suivre d'autres passionnés, comme sur Instagram. La killer feature ? Vous scannez le code-barres d'une boîte de chaussures, et le formulaire d'ajout se pré-remplit automatiquement. David résume : le Yuka de la sneaker.

Derrière ce scan se cache le plus gros casse-tête du projet : trouver une API capable de retrouver une paire à partir de son SKU (l'identifiant modèle) ou de son EAN (le code-barres). Après avoir écarté plusieurs API peu fiables, Rémy trouve [KicksDB](https://kicks.dev/) : images propres, valeur de marché très précise, et les deux modes de recherche. Seul bémol — le plan gratuit est devenu payant : environ 30 euros par mois, la principale dépense de l'application.

Côté modèle économique, la position est assumée : ne jamais faire payer les utilisateurs — brider la collection pour pousser un abonnement irait contre son éthique. Le plan : faire payer les magasins physiques de sneakers, pour de la publicité ciblée vers des passionnés.

---

## Pourquoi Supabase a remplacé Rails derrière l'app React Native

À la sortie du Wagon, Rémy commence logiquement son backend en Rails — c'est ce qu'il a « de plus frais dans les doigts ». Puis il découvre [Supabase](https://supabase.com/) sur LinkedIn, teste, et bascule. Ce backend as a service basé sur PostgreSQL apporte migrations, visualisation du schéma, authentification déjà câblée, et une solution de storage en buckets pour les images. Ce dernier point a fait la différence : avec Rails, monter un bucket S3 sur Amazon avait été une galère.

> « Je me suis rendu compte que c'était pas mon métier. Et du coup je me suis dit : tiens, Supabase me simplifie ce métier-là. Bah, allez. » — Rémy Cassagne

Le repo Rails reste sous le coude « le jour où j'aurai besoin de complexité ». Et comme le souligne David, la logique acquise — migrations, schémas, bases de données — se transfère intégralement ; seul le backend est déjà fait.

Le plus gros chantier côté données ? La normalisation de la base. Au départ, deux utilisateurs possédant le même modèle créaient deux entrées dupliquées. Rémy a introduit une table intermédiaire `collection` qui porte les données variables — taille, état de la paire, boîte d'origine — pendant que la table sneakers ne garde que le modèle, le SKU et l'image de référence, stockée dans un bucket séparé des photos des utilisateurs. Plus d'une semaine de travail, testée « une bonne centaine de fois » sur son compte perso.

---

## La stack Expo : Zustand, NativeWind et Expo Camera

Pour le reste, Rémy a suivi la documentation React Native, qui recommande Expo — donc Expo et Expo Router, du SDK 53 au SDK 54. iOS et Android uniquement : le support web ne lui semblait pas assez stable au moment de commencer.

- **State management : Zustand**, « moins prise de tête » que Redux Toolkit, et plus agréable que les contextes React en termes d'expérience développeur.
- **Styling : [NativeWind](https://www.nativewind.dev/) + NativeWindUI.** « Depuis que j'ai découvert Tailwind, je suis un gros amoureux : j'en ai marre des fichiers CSS. »
- **Scan : Expo Camera** (qui a absorbé Expo Barcode Scanner). La lib renvoie l'EAN, qu'il envoie à KicksDB. « Ça a été assez facile à mettre en place, étonnamment. »
- **Animations : React Native Reanimated**, utilisé avec parcimonie.
- **Ses découvertes préférées :** [Expo Vector Icons](https://icons.expo.fyi), [React Native Directory](https://reactnative.directory) pour évaluer la santé d'une librairie, React Native Toast Message, et React Native Keyboard Controller — via les posts LinkedIn d'Armand Petit.

Le cross-platform a quand même réservé une surprise : aucune couleur définie dans les balises Text, donc sur Android en thème light, le texte passait en blanc sur le fond pêche très pâle de l'app — illisible. Depuis, la couleur du texte est définie partout.

---

## Release sur les stores : validation Apple, bêta-testeurs et OTA updates

La première release a pris un peu plus d'une semaine entre la décision de déployer et l'acceptation — sur l'App Store uniquement. Google Play exige 12 bêta-testeurs actifs pendant 14 jours, et Rémy n'en avait que deux (contre une cinquantaine sur iOS). Sa parade : le subreddit Android Closed Testing, où les développeurs s'entre-testent leurs applications via des groupes Google.

Apple a retoqué la soumission deux fois : sur les déclarations de données collectées — remplies « au feeling » sans lire les docs de Sentry et de Vexo, son outil d'analytics — puis sur le compte de démonstration, livré vierge alors que les reviewers voulaient une collection déjà peuplée. À 48 heures par cycle de validation, chaque erreur coûte cher.

C'est là que les updates over the air changent la donne : les petits bugs de release ont été corrigés en quelques minutes via EAS Update, sans repasser par « une énième validation qui prend huit ans » chez Apple.

Dernier détail malin : un formulaire de report de bug intégré dans l'app, qui ouvre directement une issue sur son repo via l'API GitHub. Une notification, un tri dans Trello, et la boucle de feedback est bouclée.

---

## Refactorer, tester, paginer : les leçons d'une app React Native avec Supabase

L'euphorie des débuts a un prix. Rémy code « un peu très vite et un peu très sale » : la modal centrale de l'app — celle qui permet d'ajouter une paire — concentrait toutes ses étapes et toute sa logique de fetch dans un seul fichier.

> « Le moment où je me suis rendu compte de la merde que j'avais faite et qu'il fallait refactorer tout ça, c'était marrant. » — Rémy Cassagne

Une à deux semaines de refactoring plus tard : des composants à responsabilité unique, un semblant de clean architecture, et des tests — Vitest pour la logique métier, Jest avec des fire events pour la validation de formulaires côté UI.

La performance a eu droit à son épisode aussi. Un bêta-testeur avec 200 à 300 paires dans sa collection : la vue liste « ramait à la mort ». Le moniteur de performance du menu de développement Expo localise le problème, et la solution arrive :

> « J'ai mis en place un truc que j'ai appelé des chunks, mais au final ça s'appelle de la pagination, et c'est un truc qui existe depuis la nuit des temps. » — Rémy Cassagne

Charger la collection par morceaux avec Supabase — comme les chunks de Minecraft — a réglé le problème, là où le passage à la FlashList de Shopify n'avait apporté qu'un gain marginal.

---

## Conclusion

KicksFolio montre ce qu'un développeur autodidacte peut shipper en un an quand chaque choix technique vise la simplicité : Supabase pour ne pas faire un métier qui n'est pas le sien, Expo comme fil conducteur, Zustand et NativeWind pour le confort développeur, et des outils gratuits — subreddit de bêta-testeurs, issues GitHub, Trello — pour compenser l'absence d'équipe. Les erreurs de parcours n'ont rien coûté d'irrattrapable, parce qu'elles ont été corrigées vite, souvent en OTA. C'est peut-être la vraie leçon de l'épisode : à ce stade d'un projet, la vitesse d'apprentissage compte plus que la perfection de l'architecture.

---

## Key Takeaways

- **Supabase remplace un backend complet** pour un développeur solo : PostgreSQL, migrations, auth et storage en buckets — là où Rails + S3 demandaient un métier de Cloud Engineer.
- **La normalisation de base de données arrive vite** : une table intermédiaire `collection` sépare les données du modèle (SKU, image de référence) des données de possession (taille, état, boîte).
- **Le scan de code-barres est simple avec Expo Camera** : la lib renvoie l'EAN — le plus dur est de trouver une API sneakers fiable comme KicksDB.
- **Google Play exige 12 bêta-testeurs pendant 14 jours** : le subreddit Android Closed Testing permet de remplir ce quota.
- **Lire les docs de ses SDK avant la soumission Apple** : des déclarations de données remplies au feeling coûtent 48 heures par cycle de rejet.
- **Les OTA updates via EAS sauvent une release** : un bug corrigé en quelques minutes, sans revalidation des stores.
- **Une liste qui rame n'est pas toujours la faute de FlatList** : ici, la pagination côté Supabase a fait la différence, pas le changement de librairie de liste.
