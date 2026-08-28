# SaxoTools : une application React Native pour le saxophone

Que fait un ingénieur en mécanique des fluides quand il veut progresser au saxophone ? Il achète des PDF de gammes à 50 euros chez des influenceurs, fait deux ou trois exercices, puis passe au PDF suivant. Jusqu'au jour où il code la solution lui-même. Dans cet épisode du Cross Platform Show, David Leuliette reçoit Rémy Ntshaykolo, créateur de SaxoTools — une application React Native qui apprend aux débutants à jouer du saxophone, façon Guitar Hero.

Au programme : une V1 trop ambitieuse qui a échoué, une V2 qui décolle grâce à TikTok, du machine learning qui tourne directement sur le téléphone, et une leçon de performance mobile obtenue sur un Motorola à 150 euros.

---

## De la mécanique des fluides au CTO qui code le soir

Le parcours de Rémy commence loin du mobile : prépa, école d'ingénieurs à Nancy, diplôme en mécanique des fluides en 2017. Son métier d'alors, la CFD : simuler des écoulements d'air ou de liquide. Six mois comme ingénieur à Cadarache suffisent — le côté industriel ne colle pas avec quelqu'un qui a « beaucoup d'idées » et veut les mettre en application rapidement.

Il apprend JavaScript en parallèle, puis bascule via une alternance en data science chez Home Pulse, qui crée des jumeaux numériques de maisons — des modèles adaptés en 2020 aux conteneurs frigorifiques de CMA CGM. Rémy est aujourd'hui CTO de cette société, et consacre 4 à 5 heures par jour à SaxoTools.

> « C'est un super pouvoir de dev de pouvoir créer un système rapidement que tu peux tester directement sur ton mobile. » — Rémy Ntshaykolo

Venu du back-end et du cloud AWS, il découvre React via les dashboards de sa société, puis passe naturellement à React Native. Le hot reloading fait le reste : voir ses changements en direct sur son téléphone, « quand tu viens du back, c'est grisant ».

---

## La V1 : détection de notes par FFT et pyramide de Leitner

La première version, démarrée en 2021-2022 et publiée sur les stores en 2023, visait les musiciens intermédiaires et confirmés : apprendre des gammes et suivre son évolution (Do majeur à 80 bpm, puis 100, puis 120), avec des rappels façon Duolingo basés sur la pyramide de Leitner — chaque élément validé est reproposé à intervalle doublé, et rétrograde en cas d'échec. Techniquement, l'application appliquait des FFT (Fast Fourier Transform) sur le stream du micro pour détecter la note jouée et valider la gamme.

Le verdict de Rémy est lucide : la V1 a échoué parce qu'elle était « un overkill », pensée pour des utilisateurs avancés, avec zéro contenu créé sur les réseaux. Résultat : très peu de téléchargements. La V2 prend le virage inverse — l'apprentissage de chansons pour débutants qui ne lisent pas les partitions, doigtés affichés à l'écran — et met le marketing au centre.

---

## Remotion et TikTok : le marketing programmatique d'un dev solo

Le déclic vient d'une chaîne YouTube, Saxplained : des tutos de saxophone avec des barres qui défilent, à la Guitar Hero, suivis par 200 à 300 000 abonnés. Rémy, qui avait déjà utilisé Remotion — l'outil qui génère de la vidéo en React — pour des quiz TikTok, y voit un cas d'application évident.

Le pipeline : une partition MusicXML (des notes timestampées), convertie en JSON, injectée dans un template Remotion. Un bouton, cinq minutes, une vidéo prête à publier. Le compte TikTok SaxoTools, créé début juillet, affichait 4 600 followers le 9 octobre, en full organique — quand les mêmes vidéos sur YouTube Shorts n'ont rapporté qu'une centaine d'abonnés.

L'application compte environ 1 000 utilisateurs, arrivés depuis TikTok, et la V2 monétisée a enregistré sa première vente. Le comportement des utilisateurs est suivi avec Amplitude : events, user journeys, drop-off par écran.

Reste un obstacle inattendu : les droits. Jouer une musique exige des droits d'auteur — la SACEM prend 20 % du chiffre d'affaires, uniquement pour la France, le Luxembourg et Monaco — et afficher la partition exige en plus des droits d'éditeur. En attendant, le catalogue se limite au domaine public, Bella Ciao ou House of the Rising Sun.

---

## La stack d'une application React Native codée en solo

Côté choix techniques, SaxoTools est un cas d'école de pragmatisme :

- **React Native + Expo**, avec **Expo Router** pour la navigation (après React Navigation sur la V1). Le conseil de Rémy : préférer `replace` à `navigate` pour éviter d'empiler des écrans qui restent rendus derrière.
- **Valtio** pour le state management, du créateur de Zustand. Venant de Redux et de son boilerplate : « pour l'instant Valtio c'est très très bien et c'est très très simple ».
- **Supabase** pour l'authentification et les scores, après avoir « complètement abandonné » AWS Amplify, jugé trop compliqué et truffé de bugs au déploiement.
- **AWS serverless** pour le back-end : Lambdas en Python packagées en images Docker, médias sur S3 via CloudFront, le tout décrit dans **Terraform** — la branche `main` correspond exactement à l'infrastructure déployée.
- **Fetch direct** sans React Query pour l'instant : priorité au ship rapide.
- Un **Makefile** de déploiement (migrations Supabase, images Docker, builds Expo/EAS), avec build local et upload via Transporter quand la file EAS est trop longue.

Pour le design, une designer avait posé un univers autour des couleurs du saxophone — noir, doré, argenté, rouge. Aujourd'hui, Rémy feed cette charte et sa codebase à Cursor, qui réimplémente de nouveaux écrans en gardant la cohérence.

---

## Performances d'une application React Native : du SVG au PNG

Le cœur de l'application cumule trois animations en parallèle : la partition qui défile, le curseur, et les doigtés façon Guitar Hero en bas. Sur le Motorola G53 de test, « c'était vraiment pas tip top ».

Première étape : sortir les animations du thread JS. La V1 utilisait VexFlow, un moteur de rendu de partitions qui génère une forêt d'éléments SVG animés dans le thread JS — correct sur iOS, injouable sur Android. Reanimated, de Software Mansion, change la donne, complété par des FlatList qui ne rendent qu'une à deux mesures d'avance.

Deuxième étape, la plus décisive : ne plus faire défiler des SVG du tout. Avec Open Sheet Music Display, la partition est générée côté back en un fichier PNG, accompagné d'un JSON contenant la position de chaque note. L'application ne fait plus défiler qu'une seule image, et le curseur se cale sur les positions du JSON.

Pour mesurer, Rémy a découvert **Flashlight** — créé par Alexandre Moureaux — via un post LinkedIn d'Armand Petit, invité d'un précédent épisode. FPS, CPU et RAM monitorés en temps réel, sans rien installer dans l'application.

> « Moi je benchmark tout sur un iPhone 8 et un Motorola G53. Si ça fonctionne sur ces devices, ça fonctionnera sur le reste. » — Rémy Ntshaykolo

---

## Machine learning on-device : Basic Pitch, TF Lite et expo-gl

La reconnaissance de ce que joue l'utilisateur repose sur Basic Pitch, un algorithme open-sourcé par Spotify qui transforme un enregistrement audio en fichier MIDI — chaque note timestampée. À l'origine, ce traitement tournait sur une Lambda AWS. Aujourd'hui, tout se passe sur le téléphone, et plus vite que sur le serveur : les Lambdas n'ont pas de GPU.

La recette : **react-native-fast-tflite** (de Marc Rousavy, l'auteur de Vision Camera) exécute le modèle TensorFlow Lite sur le GPU du mobile. Mais l'inférence n'est que la moitié du problème — le pré- et le post-processing, gourmands en manipulations de tenseurs, passaient par TFJS qui n'utilise que le CPU sur mobile. La combinaison **TFJS React Native + expo-gl** fait le pont vers le GPU : un post-processing de 30 secondes tombe à 3 secondes. Le process complet prend 5 secondes sur iOS, 10 sur Android.

Autre brique clé : **react-native-audio-api**, de Software Mansion. Elle mixe l'enregistrement de l'utilisateur avec la backtrack, synchronise le déclenchement du record sur le temps réel de l'audio, et gère les boucles et la vitesse de lecture — une aubaine depuis la dépréciation de FFmpeg Kit en avril 2025. Pour l'écran d'accueil animé, Rive apporte des animations fluides et responsives, avec un bémol : le SDK React Native ne supportait pas encore la nouvelle architecture au moment de l'enregistrement.

---

## Conclusion

SaxoTools illustre une trajectoire que beaucoup de side projects ratent : la V1 techniquement brillante a échoué faute d'audience, et la V2 réussit parce qu'elle a inversé les priorités. Le contenu programmatique avec Remotion nourrit TikTok, TikTok amène les utilisateurs, Amplitude et Flashlight mesurent ce qui compte, et le machine learning on-device supprime à la fois la latence et la facture AWS. Quant à l'IA générative, Rémy en a fait son levier de vélocité — « vitesse x10 » — tout en rappelant qu'il faut prendre le temps de refactorer et de se réapproprier le code généré : garder la vue d'architecte qui permet de piloter, et de corriger, ce que les outils produisent.

---

## Key Takeaways

- **Une V1 trop ambitieuse échoue sans audience** : pensée pour les musiciens avancés, lancée sans contenu sur les réseaux, très peu de téléchargements malgré sa sophistication technique.
- **Remotion transforme le marketing en pipeline** : MusicXML → JSON → template React → vidéo en 5 minutes. Résultat : 4 600 followers TikTok en trois mois, en full organique.
- **TikTok écrase YouTube Shorts pour ce contenu** : mêmes vidéos, 4 700 abonnés d'un côté, 100 de l'autre.
- **Le fix de performance décisif était architectural** : remplacer des centaines de SVG VexFlow animés par un seul PNG généré avec Open Sheet Music Display, plus un JSON des positions de notes.
- **Flashlight benchmarke sans rien installer dans l'app** : FPS, CPU et RAM en temps réel — à tester sur du matériel modeste, comme un iPhone 8 et un Motorola G53.
- **Le ML on-device bat la Lambda** : avec react-native-fast-tflite et TFJS + expo-gl, Basic Pitch tourne sur le GPU du téléphone — un post-processing de 30 secondes tombe à 3 secondes.
- **Les droits musicaux sont un mur méconnu** : droits d'auteur (SACEM, 20 % du CA, France uniquement) plus droits d'éditeur pour afficher une partition — d'où un catalogue limité au domaine public.
