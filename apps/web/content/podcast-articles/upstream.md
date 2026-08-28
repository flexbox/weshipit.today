# Construire un client mail React Native : la stack d'Upstream

Recevoir un mail d'un client, le forwarder à un collègue, puis résumer la conversation sur Slack, puis relancer sur WhatsApp : le quotidien de beaucoup de petites équipes ressemble à un ping-pong permanent entre plateformes. C'est exactement le chaos qu'Upstream veut éliminer. Dans cet épisode du Cross Platform Show, David Leuliette reçoit Gabriel Hofman, développeur React Native freelance, qui construit le client mail React Native d'Upstream — une app qui transforme Gmail en espace de travail collaboratif.

Au programme : un data layer partagé à 98 % entre web et mobile, des optimistic updates partout, un benchmark qui remet NativeWind en question, et le boss final de tout client mail — afficher du HTML d'emails sans WebView qui rame.

---

## Upstream : le confort de Slack dans votre boîte Gmail

Upstream est un client mail qui fonctionne exclusivement avec les comptes Gmail. La version web existe déjà — complète, utilisée par des utilisateurs onboardés via une invite list — et Gabriel construit les applications mobiles qui manquaient au tableau.

Côté solo, l'app propose des **splits** pour router automatiquement les mails : un split primaire pour les sujets qui demandent une action, un split newsletters, un split tech où Gabriel fait atterrir tous ses mails GitLab, Sentry et Asana. Jusque-là, d'autres apps le font.

La vraie différenciation est collaborative. Dans une organisation — l'équipe Upstream compte sept personnes — on retrouve des **channels** façon Slack : engineering, customer feedback, bugs. Quand Louis, un des cofondateurs, échange avec un client, il partage le thread dans le channel Customer Feedback au lieu de le forwarder.

> "Tu peux suivre le fil de la conversation sans être du tout dans cette conversation." — Gabriel Hofman

Chaque thread embarque aussi une **conversation privée interne** : l'équipe discute du mail directement dessus, et le destinataire final ne voit rien. Ajoutez l'assignation, les deadlines, les statuts, le snooze et un undo de 10 secondes après envoi : l'objectif est de supprimer le trio mail + Slack + WhatsApp, surtout pour les petites boîtes.

---

## Un data layer partagé à 98 % entre web et mobile

Quand Gabriel rejoint le projet, la version web en React existe déjà. Plutôt que de dupliquer, l'équipe travaille dans un **monorepo** — de simples Yarn workspaces, sans outil d'orchestration — où toute la couche data est mutualisée.

Le state management repose sur **Redux Toolkit (RTK)**, avec seulement deux slices. L'essentiel passe par les queries, générées automatiquement par un codegen à partir du backend. Côté mobile, Gabriel importe les hooks existants, adapte les quelques cas propres à l'authentification, et c'est tout.

> "C'est 98 % du data layer qui est partagé. Quand ça évolue d'un côté, ça évolue de l'autre." — Gabriel Hofman

Le bonus hérité du web : **tout fonctionne en optimistic updates**. Archiver un mail, le marquer lu ou non lu doit être instantané — deux secondes de délai avant qu'un mail quitte l'inbox, c'est rédhibitoire. La subtilité, c'est qu'un même thread peut vivre dans l'inbox, dans un channel et dans un folder : chaque update optimiste doit vérifier tous les endroits où le thread apparaît pour le mettre à jour partout.

---

## Expo Router, bottom sheets et NativeWind : l'UI du client mail React Native

Pour la navigation, la stack 2025 s'impose : **Expo Router**. L'app reste compacte — 10 à 15 écrans grand maximum, quatre tabs, des stacks, une modale pour composer un message. Le folder-based routing demandait un temps d'adaptation, mais sous le capot c'est du React Navigation : il suffit de bien découper ses layouts entre écrans protégés et publics.

Les **bottom sheets de Gorhom** font le gros du travail pour les actions contextuelles : afficher toutes les actions possibles sur un thread (spam, forward, reply, reply all), le multi-select, la liste des destinataires. La librairie calcule désormais la hauteur toute seule — un irritant historique en moins.

Côté style, l'équipe utilise [NativeWind](https://www.nativewind.dev/) avec un thème quasi identique à celui du web en Tailwind, sous l'œil d'un designer qui garantit la cohérence entre les deux plateformes. Le web propose déjà 6 à 8 thèmes, couleurs simples ou gradients — le jour où le mobile les intègre, il suffira de switcher le thème.

Mais Gabriel nuance : un benchmark publié avec la V1 d'[Uniwind](https://uniwind.dev/) — les bindings Tailwind par-dessus Unistyles — compare StyleSheet, Uniwind et NativeWind.

> "NativeWind est deux fois moins bon en termes de perf. Tu gagnes en Developer Experience, mais tu perds un peu en perf." — Gabriel Hofman

L'équipe étudie le switch vers Uniwind. Et sur un projet perso démarré de zéro, Gabriel part directement sur Unistyles, avec ses propres primitives par-dessus — le réflexe qu'il avait déjà avec Restyle de Shopify, plus vraiment maintenu.

Contrairement au data layer, **l'UI n'est pas partagée** entre web et mobile : la logique métier vit dans des hooks et utilitaires communs, mais chaque plateforme garde ses propres composants, construits maison à part quelques avatars empruntés à React Native Reusables.

---

## Afficher le HTML des emails : le boss final d'un client mail React Native

Un mail, c'est du HTML dont on ne maîtrise jamais le contenu. Et un thread Upstream affiche **tous les messages expand par défaut**, façon Slack — là où Gmail ne déplie que le dernier. La feature "afficher les threads" s'est transformée, selon Gabriel, en "arbre tentaculaire de sous-features".

Première itération : **use DOM**, qui rend chaque message dans une WebView. Peu de configuration, mais un coût d'instanciation, un temps de paint et surtout du layout shift — les messages "jumpent" tant que la hauteur n'est pas calculée. Deuxième piste : une librairie qui parse le HTML et sort des composants natifs. Plus de layout shift, mais un rendu initial plus long.

La solution actuelle est **hybride** : un algorithme évalue la complexité du message. Un mail simple passe par les composants natifs ; un mail marketing bourré de tables part en WebView, seule option pour ne pas tout redesigner. L'équipe explore encore d'autres pistes — une seule WebView pour toute la liste, ou des WebViews préchargées en cache puis injectées.

La liste elle-même a ses contraintes : interface de chat inversée, scroll automatique vers le dernier message non lu, positionnement au début du message s'il dépasse le viewport. Après avoir démarré avec Legend List, l'équipe a tout migré sur **FlashList**, dont le rendu initial s'est révélé meilleur sur ce cas d'usage.

---

## GitLab, Biome et des reviews de code par LLM

La CI tourne sur **GitLab**, avec des pipelines déclenchés selon les paquets modifiés dans le monorepo. Pas de tests pour l'instant, mais un check TypeScript et **Biome** comme linter : ESLint mettait 10 à 15 secondes sur tout le monorepo, Biome environ 2 — un delta qui grandit avec la codebase.

Plus original : chaque PR passe par une **review Codex**, le LLM d'OpenAI. L'équipe est autonome pour merger sans review humaine obligatoire, et cette review automatique attrape régulièrement des détails qui seraient passés inaperçus.

Les builds partent ensuite sur **EAS Build**, avec envoi automatisé vers TestFlight et la Play Console. Pas d'EAS Workflows : tout reste centralisé sur GitLab pour ne pas éclater l'outillage. Leçon apprise à la dure : builder à chaque PR a produit une première facture "un peu piquante" — les ambitions ont été revues à la baisse, et [Expo Orbit](https://expo.dev/orbit) sert à installer les builds sur device.

Dans sa boîte à outils quotidienne, Gabriel cite aussi [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller) — indispensable pour un client mail avec rich text editor —, [SuperWhisper](https://superwhisper.com/) pour dicter des messages reformatés par LLM, [AeroSpace](https://github.com/nikitabobko/AeroSpace) comme tiling manager macOS, Proxyman pour inspecter le trafic réseau, et [Radon IDE](https://ide.swmansion.com/), désormais gratuit pour les freelances.

---

## Conclusion

Le fil rouge de cet épisode, c'est la maturité des choix. Gabriel le dit lui-même : avec le temps, il se jette moins vite dans l'implémentation et investit davantage dans la réflexion d'architecture initiale — comme cette abstraction au-dessus d'un audio player qui avait permis d'en changer sans toucher aux composants. Chez Upstream, la même logique s'applique partout : un data layer mutualisé plutôt que dupliqué, un rendu HTML hybride plutôt qu'une solution unique imparfaite, une CI centralisée plutôt qu'une constellation d'outils. Et s'il devait shipper une app en 48 heures ? Expo, Supabase, Unistyles, une seule fonctionnalité cœur — et le feedback des utilisateurs plutôt que des convictions.

---

## Key Takeaways

- **Upstream transforme Gmail en outil collaboratif** : splits pour router les mails, channels façon Slack, conversation privée interne sur chaque thread et assignation — pour remplacer le trio mail + Slack + WhatsApp.
- **Un monorepo Yarn workspaces suffit** : 98 % du data layer (Redux Toolkit + codegen des queries) est partagé entre le web React et l'app React Native.
- **Les optimistic updates sont non négociables sur un client mail** — mais un thread présent dans l'inbox, un channel et un folder doit être mis à jour partout à la fois.
- **NativeWind offre une excellente DX mais coûte en performance** : le benchmark d'Uniwind le mesure deux fois moins rapide que StyleSheet, d'où le switch envisagé vers Unistyles/Uniwind.
- **Afficher du HTML d'emails demande une approche hybride** : composants natifs pour les messages simples, WebView pour les mails marketing complexes, et FlashList pour le rendu initial de la liste.
- **Biome divise le temps de lint par 5 à 7** sur un gros monorepo, et des reviews de PR par LLM (Codex) attrapent des erreurs sans bloquer une équipe autonome.
- **Réfléchir l'architecture avant d'implémenter** : abstractions aux bons endroits (player, logger, monitoring) et features cœur d'abord — le reste attendra le feedback utilisateur.
