# Refus App Store : ce que l'OTA peut vraiment réparer

Un refus App Store ne coûte pas de commission ni de ligne budgétaire. Il coûte des jours : le fix est prêt, le lancement glisse, et personne ne sait quand Apple répondra. Pour mesurer ce coût, David Leuliette reçoit dans le Cross Platform Show Martin Donadieu, fondateur de **Capgo**, la solution de live updates (OTA) pour les apps Capacitor, bootstrappée et rentable depuis 2022, qui a touché 90 millions d'appareils.

Le point de départ est inconfortable pour l'invité : Martin vend des mises à jour over-the-air, et sur les six refus de stores passés en revue — 32 jours de release bloqués au total — il admet que son produit n'en aurait évité qu'un seul. On verra pourquoi une app se fait refuser au premier envoi, comment réagir quand ça arrive, et où passe la frontière exacte entre ce qu'une live update corrige et ce qui exige un nouveau build.

## Refus App Store : le vrai coût se compte en jours

Première question posée à Martin : combien de temps entre « le fix est prêt » et « le fix est chez l'utilisateur » ? Sa réponse tient en une fourchette. Si tu as de la chance, quelqu'un chez Apple regarde ton build dans les six heures. Sinon, ça prend trois semaines.

Une app publiée depuis longtemps peut être validée dans la journée ; une app qui sort se tape facilement trois semaines. Martin cite un ami en attente depuis deux mois — pas refusé, juste « pending ». Côté Google, une release passait autrefois en 20 ou 30 minutes ; depuis l'arrivée de la review humaine, c'est des heures, parfois des jours.

Et l'approbation ne règle pas tout. Par défaut, le téléphone ne télécharge la mise à jour que s'il est en wifi, branché, avec assez de batterie et inutilisé — et sur Android, avec assez d'espace disque.

C'est là que Capgo se positionne. Avec les **Delta Updates**, seul le fichier modifié est téléchargé. Avec les **Direct Updates**, l'app vérifie, télécharge et installe la mise à jour à l'ouverture en moins de 300 millisecondes, avant que l'utilisateur ne voie l'ancienne version. Des équipes qui prévoyaient de livrer une fois par semaine poussent désormais trois fois par jour.

## Pourquoi ton app se fait refuser au premier envoi

Le chiffre de Martin surprend : 30 à 50 % de refus au premier envoi, même pour un développeur expérimenté. Pour une app produite en vibe coding, il monte à presque 100 %.

Les motifs sont rarement techniques : assets marketing non conformes, texte incrusté dans les captures, CGV à recopier à la fin de la description dès qu'il y a un abonnement. « Je peux faire le meilleur guide de tous les temps, il n'y a toujours pas tout qui passe », résume Martin.

Côté Capacitor, un refus revient souvent : l'app n'est qu'un site web emballé, sans usage natif — le « website in a box ». Le conseil de Martin : ajoute au minimum des notifications ou un Apple Login.

Certains refus défient la logique. Un ami de Martin, qui développe le client mail ShipMail, propose une app compagnon d'un service payant sur le web, comme Gmail. Il a retiré toute mention du caractère payant ; Apple exige quand même des achats intégrés. Des humains font la review, et ils n'appliquent pas toujours leurs propres règles.

## Après un refus App Store : appeler plutôt que resoumettre

La réponse écrite d'Apple ne contient en général aucun détail. Martin donne une règle : trois tentatives par email, puis demande rapidement un appel avec une personne. Au téléphone, le reviewer explique ce qui bloque.

L'erreur à éviter : resoumettre la même chose. Soumettre plusieurs fois un build inchangé expose à une sanction sur le compte.

Souvent, le problème n'est même pas dans le code : ta description ressemble trop à celles d'autres apps et ne montre pas ce que la tienne a d'unique. La réécrire suffit parfois.

Côté marketing, la règle de Martin est simple : on passe d'abord la review. Une fois la release approuvée et en attente de publication, le marketing choisit sa date. Pas avant.

> « Apple, c'est mon meilleur vendeur en fait. » — Martin Donadieu

Le mécanisme est simple : les équipes souffrent pour passer une review, puis cherchent comment ne plus jamais revivre ça.

## Permissions : 13 jours perdus sur une app caméra

Parmi les cas passés en revue, l'un a coûté 13 jours à cause d'une permission. Pendant longtemps, dans l'écosystème Capacitor, des plugins demandaient leurs permissions au démarrage, sans message clair. Pour le reviewer, c'est un refus facile.

Le cas le plus piégeux concerne les apps dont la permission est le cœur du produit : Snapchat sans caméra, Google Maps sans GPS. Si l'app ne l'explique pas, Apple peut considérer que tu forces une autorisation. La solution tient dans un onboarding : « on va te demander la caméra, parce que cette application est une application de caméra ».

Ce cas illustre aussi la limite de l'OTA : corriger une permission demande un nouveau build, donc une nouvelle review.

## Mise à jour OTA : ce qu'elle règle, ce qu'elle ne règle pas

Sur les six refus, un seul relève vraiment de la live update : le checkout cassé d'une app e-commerce. On corrige le bouton, on pousse l'update, terminé. Pour la permission, il faut un nouveau build.

Le cas d'usage que Martin vend le plus est plus subtil. Tu as envoyé un build en review et tu découvres un bug dans le JavaScript. Sans OTA, tu annules la review et tu repars en fin de file, trois jours perdus. Avec Capgo, tu publies une live update compatible uniquement avec ce binaire. Au moment où Apple approuve l'app, les utilisateurs qui l'ouvrent ne voient jamais le bug.

Deux autres usages reviennent :

- **Les utilisateurs qui ne mettent jamais à jour.** Après une release native qui change l'API, leur app ne marche plus, ils écrivent au support et laissent une mauvaise note. Avec le système de channels, on cible leur ancien build pour corriger uniquement l'appel API.
- **Le rollback.** Capgo garde le bundle précédent quelques jours sur l'appareil : revenir en arrière est instantané, sans nouveau téléchargement.

Quant aux règles, Martin les résume ainsi : Apple autorise la mise à jour de code interprété dans une machine virtuelle comme JavaScriptCore, à condition de ne pas changer le purpose de l'app. Un redesign passe ; transformer l'app en autre chose, non.

## Quand l'OTA n'est pas la bonne réponse

Martin reconnaît un cas où l'OTA hébergée ne convient pas : les secteurs très régulés. Pour l'un des plus gros assureurs des États-Unis, avec qui il négocie, sa conclusion est qu'il leur faudrait leur propre serveur d'OTA : bundles chiffrés, trace de chaque opération, garantie sur la localisation des données. L'assureur lui a même demandé une assurance d'un million de dollars sur ses live updates.

## QA après Apple, pas avant

Dernier conseil, le plus contre-intuitif : face à une app imparfaite, tant qu'on peut faire un soft launch et que le problème n'est pas natif, passer la review d'abord, puis corriger en live update.

> « Je pense qu'il vaut mieux QA après Apple qu'avant Apple. » — Martin Donadieu

Bloquer sa propre QA, puis subir celle d'Apple, c'est empiler deux délais au lieu d'un.

## Conclusion

Le coût d'un refus App Store se mesure en jours, et l'OTA n'en rattrape qu'une partie. Elle répare ce qui vit dans le JavaScript : un checkout cassé, un bug découvert pendant la review, une API à corriger pour les vieux builds. Elle ne touche ni aux permissions, ni au binaire natif, ni au purpose de l'app. Le reste se joue avant la soumission — une description qui montre ce que l'app a d'unique, des permissions expliquées — et après le refus, au téléphone avec un humain plutôt qu'en resoumettant à l'identique. Pour Martin, cette friction a même un bon côté : c'est la barrière à l'entrée qui donne sa valeur au métier de développeur mobile.

## Key Takeaways

- Une review App Store prend de six heures à trois semaines, plus pour une nouvelle app ; même approuvée, une mise à jour attend que le téléphone soit en wifi, branché et inutilisé.
- 30 à 50 % des apps sont refusées au premier envoi, même par des développeurs expérimentés.
- Après un refus, demande un appel avec un reviewer et ne resoumets jamais un build inchangé ; souvent, c'est la description qu'il faut réécrire.
- Une permission au cœur du produit doit être expliquée dans l'onboarding, sinon Apple peut y voir une autorisation forcée.
- L'OTA corrige le JavaScript (checkout cassé, bug découvert en review, vieux builds ciblés par channel, rollback instantané), pas les permissions ni le natif.
- Les secteurs très régulés auront besoin de leur propre infrastructure d'OTA.
- Fixe la date de lancement une fois l'app approuvée, et fais ta QA après Apple plutôt qu'avant.
