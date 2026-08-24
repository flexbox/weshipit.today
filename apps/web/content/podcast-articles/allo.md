# Les 5 erreurs CTO mobile qui coûtent le plus cher (retour terrain à 50 000 appels/jour)

Combien d'euros votre application mobile a-t-elle brûlés à cause d'une mauvaise décision technique prise il y a 18 mois ? La plupart des CTO l'ignorent, et c'est précisément le problème. Dans cet épisode du Cross Platform Show, David Leuliette démonte avec Pablo — membre de l'équipe fondatrice de The Mobile First Company et personne derrière Allo, un système téléphonique qui enregistre les appels, rédige les relances et met à jour le CRM automatiquement — les erreurs CTO mobile les plus coûteuses. Avec un produit à plus de 50 000 appels par jour et 20 à 30 % de croissance mensuelle, Pablo parle depuis le terrain, pas depuis un livre blanc. Vous repartirez avec les cinq pièges, le coût réel de chacun et comment corriger le tir avant qu'il ne soit trop tard.

## Les erreurs CTO mobile commencent par le choix de la stack

Le premier réflexe quand on choisit React Native ou du natif, c'est de parler performance. Pour Pablo, qui travaille avec React Native depuis près de dix ans, c'est un faux débat. La vraie variable, celle qu'il n'a comprise qu'après être passé par deux entreprises aux contextes opposés, c'est le recrutement.

> "React Native, c'est stratégique sur la technologie, mais aussi sur toute la stratégie de la boîte derrière : la taille des équipes, la structure des équipes, le recrutement." — Pablo

Choisir sa stack, c'est arbitrer sur les talents disponibles, la taille de l'équipe et les salaires. En Europe, les bons profils React Native restent plus rares qu'aux États-Unis, et beaucoup viennent du web. Le natif garde tout son sens dans trois cas : un jeu vidéo, une app iOS only, ou un module vraiment complexe. Chez Allo justement, toute la partie appels est en natif : il faut traiter la donnée et afficher l'appel en moins d'une seconde, même quand l'app ne tourne pas. Le reste tourne sous React Native et Expo, qui permet aujourd'hui de descendre dans le natif facilement — Pablo raconte avoir vibe-codé en 30 minutes un module natif de détection de données dans le texte (adresses, numéros) qui lui manquait en librairie.

## Erreur n°2 : sous-estimer le coût de la maintenance mobile

On ship, les stores valident, tout est beau. Six mois plus tard, l'app est en dette. Rappel utile : un SDK Expo sort tous les quatre mois, et personne n'avait budgété la maintenance. Pablo se souvient d'une boîte qui avait externalisé son développement pour « payer un billet, sortir l'app, et voir plus tard » : ils n'ont jamais réussi à la maintenir et ont tout recommencé de zéro.

Le vrai gouffre, c'est Android. Entre versions d'OS, tailles d'écran et surcouches constructeurs, chaque fabricant ajoute ses contraintes. Pablo a passé des jours à comprendre pourquoi l'affichage d'un appel sur écran verrouillé marchait partout sauf sur un Xiaomi — qui ajoutait deux permissions non détectables par les libs de base. Il a fini par acheter le téléphone.

Autre piège spécifique au mobile : une version installée persiste des années. Sur IEGO, l'app de scooters en libre-service où il est resté sept ans, il voyait encore six ans plus tard des utilisateurs passer par un workaround qui déplaçait le cache. D'où son conseil le plus concret : prévoir dès le premier jour un moyen de bloquer l'app à distance et de forcer la mise à jour.

> "C'est la première feature que j'ai développée dans mes apps : tu peux toujours kill l'app et avoir une modal qui demande aux gens de l'update." — Pablo

## Erreur n°3 : construire sans stratégie de distribution dès le jour 1

Le CTO peut livrer une app techniquement impeccable et se retrouver avec 200 téléchargements dont la moitié sont des bots et des testeurs internes. La distribution n'est pas la responsabilité du seul CTO, mais un travail de collaboration avec le marketing — et elle change tout selon le modèle.

> "T'as beau développer une pépite, tant que tu sais pas la vendre, ça reste un caillou." — Pablo

En B2C, la distribution la plus efficace reste l'acquisition ads-driven : une vidéo TikTok ou Insta un peu virale lance les premiers téléchargements, même sans budget. Mais Mobile First a testé cette stratégie sur des apps B2B et la qualité des leads chute. En B2B, c'est le sales-driven qui fonctionne : une boîte qui signe plusieurs centaines d'euros par mois veut parler à un humain et être rassurée. Là où le CTO intervient vraiment, c'est sur l'onboarding : chez Allo, une vingtaine d'étapes sont implémentées et un payload RevenueCat permet d'en ajouter, d'en retirer ou d'en changer l'ordre selon la provenance du lead. Un cabinet immobilier fait surtout de l'inbound, une équipe sales de l'outbound : deux cibles, deux onboardings, le même produit.

Le signal d'alarme ? Un CTO dont les discussions ne portent que sur les features et jamais sur l'adoption. Et la distribution n'a pas besoin d'être compliquée : David rappelle Freddy de MangaCollec, qui a imprimé 5 000 flyers distribués un par un à la Japan Expo pour trouver ses premiers utilisateurs.

## Erreur n°4 : négliger la performance jusqu'à la première mauvaise review

La performance est la variable qu'on sacrifie pour tenir les délais — puis les avis tombent, le crash rate s'envole, les stores throttlent, et la confiance part. Le pire scénario, c'est une app devenue non maintenable : vous corrigez un bug à gauche, vous en créez un à droite pendant des mois.

Pablo assume pourtant un arbitrage lucide : le code sert le business, pas l'inverse. Chez Allo, ils ont passé six mois à un an à empiler les features pour qu'un système téléphonique soit simplement utilisable, quitte à encaisser ensuite deux à trois mois de refacto quand l'usage a été multiplié par dix, cent, mille. « Worth it », tranche-t-il, parce que ça a permis d'arriver vite sur le marché.

Côté métriques dès le premier sprint : un crashlytics est indispensable — Allo tourne avec Sentry _et_ Firebase Crashlytics, car les deux ne remontent pas les mêmes infos — plus de l'analytics et, sur les flows VoIP, du monitoring New Relic. Le point noir récurrent reste les listes : Pablo est passé de FlatList à FlashList puis LegendList, avec un patch maison. Les signes d'un problème de perf à venir ? Une mémorisation absente et une mauvaise structure de code — tout empiler dans une seule page régénère l'arbre entier à chaque re-render. Enfin, contre-intuitivement, il faut utiliser les libs externes : en React Native elles sont écrites en natif, là où le thread JavaScript est trop faible pour porter de la logique lourde.

## Erreurs CTO mobile n°5 : ne pas se protéger des changements de plateforme

La règle change quand les stores changent les leurs. Le conseil que David répète : attention à l'email owner de l'App Store. Tous les quatre mois, il faut se connecter pour accepter les nouveaux termes. Un mail perso à l'hygiène douteuse, et vos devs ne peuvent plus release en production.

Pour les librairies, Pablo s'appuie sur ce qu'Expo supporte : gestion des versions, protection contre les releases mal testées, recommandations de mise à jour. Son angle mort assumé : lister facilement les libs _non_ gérées par Expo, qui peuvent traîner des failles profondes. Sa routine : profiter d'une grosse feature pour lancer `expo install --check`, tout mettre à jour et tester. Sur les breaking changes, il suit l'écosystème de près — le State of React Native, et surtout les issues GitHub où se cachent les workarounds. Côté stores, il préfère les reviewers Apple, pénibles mais patients, aux funnels automatiques de Google, où un flow jugé non conforme lui a laissé 10 jours pour agir contre 21 jours de délai de réponse au support.

Et une sixième erreur, encore sans recul ? L'usage de l'IA dans le développement React Native. Pablo va trois fois plus vite — une plateforme support codée en une semaine au lieu de deux mois — mais reconnaît qu'on ignore encore l'impact réel sur la qualité du code, la transmission des connaissances et l'apprentissage des juniors.

## Conclusion

Les erreurs CTO mobile les plus chères ne sont presque jamais des erreurs de code : ce sont des choix de recrutement, de maintenance, de distribution et de plateforme qu'on paie 18 mois plus tard. Pour une nouvelle app B2B en 2026, Pablo choisit le cross-platform sans hésiter — et le pire conseil qu'il ait vu valider reste « on supportera Android plus tard », qui veut presque toujours dire jamais.

## Key Takeaways

- **La stack se choisit sur le recrutement, pas la performance** : React Native pèse d'abord sur l'équipe, les salaires et la disponibilité des profils.
- **La maintenance n'est pas optionnelle** : SDK Expo tous les 4 mois, fragmentation Android et surcouches constructeurs (les permissions cachées de Xiaomi) coûtent cher si on ne les budgète pas.
- **Prévoyez un kill switch dès le jour 1** : une modal qui force l'update évite de traîner des workarounds pendant des années.
- **Sans distribution, une pépite reste un caillou** : B2C = ads-driven, B2B = sales-driven, onboarding adapté à la provenance du lead.
- **La perf se surveille tôt** : Sentry + Crashlytics, structure de code modulaire, libs natives plutôt que du JS lourd sur un thread faible.
- **Protégez vos accès plateforme** : soignez l'email owner de l'App Store et suivez les breaking changes via Expo et les issues GitHub.
- **L'IA accélère x3 le dev React Native**, mais son impact sur la qualité et la transmission des connaissances reste une inconnue.
