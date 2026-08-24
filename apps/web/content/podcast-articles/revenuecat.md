# Commission App Store à 30 % : la vérité pour les devs en 2026

Apple prend 30 % sur chaque abonnement in-app, Google aussi, et depuis 2024 l'Europe met ce modèle sous pression avec le DMA. Mais concrètement, pour toi qui ship une app en 2026, la **commission App Store** vide-t-elle vraiment ta poche autant qu'on le raconte ? Dans cet épisode du Cross Platform Show, David Leuliette reçoit deux profils complémentaires : Tarek, developer support engineer chez RevenueCat et indie maker (créateur de Bilkisium, une app de transcription iOS et Mac), et Armand Petit, CTO et co-fondateur d'Osly Solutions, qui transforme le smartphone en badge d'accès. Ils démontent les mythes sur la taxe des stores, font le point sur le DMA côté US et Europe, et détaillent les stratégies de monétisation qui marchent.

## Commission App Store à 30 % : un mythe pour les petits devs

Premier électrochoc de l'épisode : ce fameux taux de 30 %, la plupart des développeurs ne le paient jamais. Tarek le martèle — la **commission App Store** est volontairement complexe à comprendre, mais pour un petit dev, la réalité est bien plus douce.

Deux mécaniques suffisent à faire tomber le taux. D'abord le Small Business Program : sous un million de dollars de proceeds sur l'année, tu passes à 15 % dès le premier jour (un formulaire chez Apple, automatique chez Google). Ensuite, sur les abonnements auto-renewable, la commission Apple tombe à 15 % dès la deuxième année de souscription — même hors Small Business Program.

> "Le 30 %, c'est un peu un mythe, en tout cas pour les petits." — Tarek

Tant que tu n'as pas de « problème de riche », tu es déjà à 15 % : la commission ne devient un vrai sujet que quand tu scales fort.

## DMA et Epic vs Apple : où en est vraiment la commission App Store

C'est là que ça se corse. Entre le DMA européen et le procès Epic vs Apple aux États-Unis, il y a des développements presque tous les mois. Résultat : personne ne sait plus si les chiffres qu'il lit sont à jour.

Aux États-Unis, Tarek pose le décor : aujourd'hui, tu peux sortir du paiement à 0 %. Apple a fait appel, la Cour suprême a récemment refusé le sursis demandé, donc le dossier reste ouvert : Apple cherche à fixer un « reasonable fee » au motif que l'App Store aide à acquérir des utilisateurs. En attendant, la **commission App Store** sur ces paiements externes est de 0 %, avec un lot de contraintes : le bouton vers le web doit ouvrir Safari (pas un SafariViewController), tu dois quand même proposer l'in-app purchase, et ça rajoute de la friction.

Côté Europe, le modèle est stratifié. Les derniers chiffres cités par Tarek : Apple prend 2 % pour l'acquisition et entre 5 et 13 % pour les services. Les 50 centimes fixes de core technology fee, rejetés par la Commission européenne, sont devenus 5 % de core technology commission. Bilan : tu t'en sors à 10 % au mieux, 20 % au pire. Et ces paiements web sont déclaratifs — Apple te demande de les déclarer via une API et se réserve un droit d'audit. Comme le résume Armand, entre Core Technology, store services et procès en cours, « tu te perds un peu et tu ne sais même pas si c'est à jour ou pas ».

## RevenueCat, le "Stripe du mobile" pour dompter la monétisation

Pourquoi cette complexité fait-elle exister une boîte entière ? Tarek, qui a intégré StoreKit et Google Play Billing, le confirme : la validation server-side pour vérifier qu'une transaction est légitime, c'est déjà un chantier. Et si tu veux du cross-platform — qu'un utilisateur Android profite de son abonnement sur iOS et vice-versa — les stores ne communiquent tout simplement pas entre eux.

RevenueCat, c'est cette couche de traduction. « Stripe pour tout ce qui est mobile », comme le dit David. Mais la plateforme va plus loin que le lien technique entre les stores : analytics, charts, paywalls éditables dans le back-end, experiments, A/B testing et IA. Et la liste des plateformes supportées surprend tout le monde : au-delà d'iOS et Android, on trouve macOS, Amazon App Store, Galaxy Store, Roku, Unity, Flutter et Expo.

> "Help Developers Make More Money. C'est ça, c'est la mission." — Tarek

## L'erreur n°1 qui fait rejeter ton app

Le job de Tarek, c'est de débloquer des développeurs toute la journée. Et l'erreur la plus fréquente n'est presque jamais dans le code : c'est un problème côté store. Le top 1 chez Apple ? Soumettre ta subscription séparément pour une nouvelle app.

Le bouton « submit for review » ne sert que pour une app déjà approuvée à laquelle tu ajoutes une in-app purchase. Pour un premier envoi, tu attends de soumettre ton app : le process te demande alors d'attacher les in-app purchase en même temps. Sinon, Apple met une plombe à examiner l'IAP isolée, puis rejette ton app parce que « les in-app purchase ne fonctionnent pas ». Un vrai chicken-and-egg problem.

## Contourner la taxe : app-to-web et web-to-app

La légende urbaine, c'est qu'en redirigeant tes users vers une landing page externe, tu bypasses le store. Techniquement, c'est viable — Apple ne peut pas te kicker pour ça. Mais Tarek nuance : Epic peut se le permettre grâce aux revenus colossaux de Fortnite ; un petit ou moyen dev a plutôt intérêt à rester en bons termes avec Apple. Ce que tu gagnes en commission, tu risques de le reperdre en friction et en complexité, sans compter les frais des autres systèmes de paiement (Stripe inclus).

Deux approches se dégagent. L'app-to-web : l'acquisition se fait dans l'App Store, mais le paiement est redirigé vers le web. Et le web-to-app, de plus en plus utilisé à mesure que l'ASO se durcit : les devs acquièrent via Meta Ads ou TikTok, envoient l'utilisateur vers un funnel web où il fait son premier paiement — sur lequel Apple n'a aucun droit — puis l'app se télécharge. Avec Expo, tu peux héberger cette landing page dans la même codebase, et RevenueCat gère aussi ce scénario.

Reste la question qu'Armand juge la plus négligée : qu'est-ce que tu vends ? Beaucoup de devs venus du web collent du Stripe sur une app mobile, puis se font refuser car ils vendent du numérique soumis à l'IAP. À l'inverse, un service du monde réel — ouverture de porte, course VTC, livraison — y échappe.

> "Il n'y a pas assez de développeurs qui se posent la question : qu'est-ce que je vends ?" — Armand Petit

## Free trial, hard paywall et le SOSA

Sur les stats, les deux invités convergent. Free trial ou freemium ? Free trial, avec un hard paywall : selon le SOSA (State of Subscription Apps, le rapport annuel de RevenueCat), il convertit cinq fois mieux que le freemium, car l'utilisateur est impliqué et tu évites les vanity metrics. Annuel ou mensuel ? L'annuel renouvelle mieux, mais s'il annule il ne revient presque jamais, quand le mensuel revient plus souvent. Et le weekly reste redoutable pour des usages ponctuels — pense à Slopes pour le ski ou Flighty pour le suivi de vols.

Côté budget, le conseil est unanime : le code n'est plus le problème grâce à l'IA, la majorité part en marketing et distribution (UGC, paid ads Meta et TikTok, influenceurs) pour enclencher le cercle vertueux ratings, rankings, organique — d'autant que 77 % des nouvelles apps sortent sur iOS, où les utilisateurs dépensent plus.

## Conclusion

La grande leçon de l'épisode ? La **commission App Store** à 30 % est surtout un épouvantail : Small Business Program, deuxième année d'abonnement, DMA et jugements US font tomber le taux réel bien plus bas pour la plupart des devs. Le vrai combat n'est pas la taxe, c'est la distribution. Comme le résume Tarek aux vibecoders : avoir une app qui tourne n'a jamais été aussi simple, avoir une app qui marche jamais aussi dur — et ça, l'IA ne le fera pas à ta place.

## Key Takeaways

- **Le 30 % est un mythe pour les petits** : Small Business Program à 15 % dès le premier jour (sous 1 M$/an), et 15 % dès la deuxième année sur les abonnements auto-renewable.
- **DMA et Epic vs Apple** : aux US, paiement externe à 0 % pour l'instant (appel en cours) ; en Europe, un modèle stratifié qui revient à 10 % au mieux, 20 % au pire.
- **RevenueCat = le "Stripe du mobile"** : une couche de traduction cross-platform entre des stores qui ne communiquent pas, plus analytics, paywalls, A/B testing et IA.
- **L'erreur n°1 de rejet** : soumettre sa subscription séparément pour une première app — il faut l'attacher au moment de soumettre l'app elle-même.
- **App-to-web et web-to-app** : viables techniquement, mais mieux vaut rester bon citoyen de l'App Store et bien peser friction vs commission économisée.
- **Pose-toi la vraie question** : qu'est-ce que tu vends ? Un service du monde réel échappe à l'IAP ; du numérique non.
- **Ce que dit le SOSA** : hard paywall + free trial convertit 5x mieux que le freemium ; 77 % des nouvelles apps sortent sur iOS.
