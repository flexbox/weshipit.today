# Vibe coding en production : le retour de terrain de Terence

Un dev solo, un agent IA, un SaaS en production : nouvelle réalité ou cas isolé qui ne scale pas ? Terence a un parcours qui donne du poids à sa réponse — ancien gestionnaire locatif passé développeur, aujourd'hui CTO d'**ARK** (un CRM à insights IA) et fondateur d'**Atelier Trivium**, où il apprend à des experts non techniques à créer leur propre SaaS avec l'IA. Dans cet épisode du Cross Platform Show, il raconte ce que change vraiment le **vibe coding en production** : le ROI réel, la dette technique, les limites, et les questions que tout CTO devrait se poser en 2026.

## Vibe coding en production : plutôt de l'« agentic engineering »

Premier recadrage : Terence n'aime pas trop le terme « vibe coding », avec son côté gourou barbu qui génère du code au micro. Ce qu'il pratique ressemble davantage à l'**agentic engineering** — le terme proposé par Andrej Karpathy (qui avait aussi inventé « vibe coding »). La nuance n'est pas cosmétique : voir le code ou non, ça concerne le fonctionnel ; avant la prod, il faut de toute façon vérifier.

L'exemple qui parle : sur ARK, une feature de recherche multi-tables avec un RAG branché. À la main, avec son profil frontend, il l'estime à **deux mois**. Avec Claude Code : deux à trois heures pour un truc fonctionnel — review comprise en plus.

## Vibe coding et dette technique : encadrer le super stagiaire

La question qui revient toujours : et la dette technique du code généré en deux heures ?

> "L'IA, je la vois comme un super stagiaire : le premier de la classe qui a lu tous les bouquins. Il a toute la théorie. Mais il faut l'encadrer." — Terence

Bien encadré, ce stagiaire devient un excellent collaborateur ; mal encadré, il fait n'importe quoi. Concrètement, l'encadrement passe par un **CLAUDE.md** solide, un maximum de documentation dans le repo (Terence travaille en monorepo pour centraliser), un dossier d'architecture decision records en markdown — plus facile à digérer pour l'IA — et surtout une **boucle CI stricte** (tests, linter) qui rattrape les écarts : l'agent sait quelles guidelines suivre, comment découper, et le build lui dit ce qui casse. Côté incidents en prod, rien de méchant : des boutons ou redirections défaillants repérés en review. Le vrai piège des débuts, c'était plutôt la sécurité — des clés secrètes Stripe qui traînaient dans le code de clients ravis que « ça marche ».

## ARK : 2 mois en prod au lieu de 2 devs × 6 mois

ARK agrège les données éparpillées des équipes Sales et Customer Success (CRM d'un côté, Excel de l'autre) pour en sortir des insights actionnables — un LLM branché sur du pur OpenAI côté RAG, paramétré pour coller strictement aux données d'entrée et limiter la créativité (sauf génération de mails/documents). Le vrai retour client ? Dans des équipes CS à fort turnover, l'outil onboarde très vite les nouveaux arrivants.

Le chiffrage est parlant. Avec une équipe classique : minimum deux développeurs sur six mois. Avec Claude Code : première version en un mois, **prod au bout de deux mois** — à deux personnes (Gianluca vibe-code, Terence gère infra et cadrage IA). Aucun testeur, designer ou infra recruté : l'IA a pris ces rôles (design avec Gemini 3 + Figma Make, tests avec Cursor + Claude Sonnet). Comme le résume David, l'IA ne réduit pas l'équipe — elle élargit le scope qu'une petite équipe peut absorber.

## Atelier Trivium : apprendre aux non-devs à créer un SaaS avec l'IA

Le vrai sujet d'Atelier Trivium, c'est de lever le blocage historique « je ne suis pas dev ». La cible : un consultant, un expert RH ou juridique qui a déjà une méthode et veut la packager en outil pour toucher plus de clients sans travailler plus. ARK, justement, est né comme premier client d'Atelier Trivium, à partir d'un proto V0.

Le plus grand mur pour ces profils n'est pas le terminal — c'est **Git**. « Qu'est-ce que ce truc ? », puis, une fois compris que c'est un système de sauvegarde avec des branches : « je peux revenir dans le temps, c'est fou ! ». Terence les fait travailler en pull requests qu'il review ensuite. Première séance : Git, terminal, npm, Cursor — la panique, puis une demi-heure plus tard le déclic : le code, c'est l'IA qui le gère ; s'ils ne comprennent pas, ils demandent à l'IA. Ils shippent du Next.js.

## Est-ce que les développeurs vont disparaître ?

Pour Terence, le plus grand mythe du vibe coding, c'est justement « que c'est fait pour ceux qui ne savent pas coder et que les devs vont disparaître ». Sa lecture est plus fine :

> "L'IA traduit très bien les user stories en code. Mais est-ce que ça marche et est-ce que c'est durable, ça reste la responsabilité du développeur." — Terence

La première responsabilité du dev (traduire un besoin en code fonctionnel) est déléguée à l'IA ; la seconde (le fameux « ça marche sur ma machine », la durabilité, la sécurité, le DevOps) reste humaine. Sur un gros compte, il est l'un de **40 développeurs** qui construisent une app Flutter, tous avec de l'IA — chacun sur son scope, le tech lead gardant la vision d'ensemble et architecturale. Sa projection à trois ans : le tech lead sera « le mec qui gère une armée de gens qui gèrent des IA ».

## 500 k€, Flutter et la vraie discipline

Question signature — 500 k€ de budget tech. Terence investirait d'abord 50-100 k€ dans une **infra pour faire tourner des IA de génération de code en local**, puis recruterait un ou deux profils très seniors en **sécurité et architecture** (les deux points de vigilance : fin 2025, une étude évoquait 40 % de projets web-codés truffés de failles), et enfin des profils métier capables d'écrire de vraies user stories avec critères d'acceptation.

Côté techno, sans surprise : Flutter pour un MVP B2B en 2026, et Claude Code s'il ne devait garder qu'un outil. Mais sa vraie reco n'est pas un outil, c'est une **discipline** — un bon fichier CLAUDE.md (ou cursor rules). C'est ce qui sépare un projet vibecodé amateur d'un projet professionnel. Il cite d'ailleurs le stack interne « Minion » de Stripe : décrire une feature dans Slack, des agents la développent en boucle (linter/tests déterministes stricts), un développeur review en bout de chaîne.

## Conclusion

Le vibe coding en production, version Terence, n'a rien d'un raccourci magique : c'est de l'agentic engineering encadré, où l'IA accélère le fonctionnel pendant que la rigueur technique — sécurité, durabilité, review — reste le métier du développeur. La barrière à l'entrée s'abaisse, le rôle se métamorphose, mais il ne disparaît pas. Un épisode à écouter en entier pour calibrer votre propre usage de l'IA.

## Key Takeaways

- **Vibe coding ≠ agentic engineering** : Terence préfère le second terme — voir ou non le code concerne le fonctionnel, mais la vérification avant prod reste obligatoire.
- **ROI concret** : une feature RAG estimée à 2 mois faite en 2-3 h ; ARK en prod en 2 mois à deux, contre ~2 devs × 6 mois sans IA.
- **Dette technique = encadrement** : l'IA est un « super stagiaire » ; CLAUDE.md, docs en monorepo et boucle CI stricte font la différence.
- **Le vrai risque, c'est la sécurité** : clés secrètes qui traînent, 40 % de projets web-codés vulnérables — d'où des profils seniors sécurité/archi.
- **Atelier Trivium** : le blocage des non-devs n'est pas le terminal mais Git ; une fois compris, l'IA gère le code, eux shippent du Next.js.
- **Les devs ne disparaissent pas** : l'IA traduit les user stories, mais « est-ce que ça marche et est-ce durable » reste la responsabilité humaine.
- **La discipline avant l'outil** : un bon CLAUDE.md sépare l'amateur du professionnel ; Flutter pour un MVP B2B, Claude Code comme agent.
