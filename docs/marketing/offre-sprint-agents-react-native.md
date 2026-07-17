# Offre IA — « Agentic Sprint » pour développeurs React Native

**Statut :** proposition v1 (2026-07-17)
**Inspiration :** épisode Le Board (Flavie Prévost) — 4 formats d'offre IA : bootcamp cohorte, bootcamp d'été à angle fort, workshop low-ticket, IA dans la pédagogie
**Alignement plan marketing v1 :** c'est la relance bootcamp Q3 (Bet 3), avec l'angle IA comme moteur de vente. Zéro nouvel actif à construire — on réutilise la plateforme bootcamp, le livre, la liste MailerLite, la Stability Checklist.

---

## 1. Le pari

Le transcript le dit : les offres IA se vendent « comme des petits pains » — mais uniquement quand l'IA est **croisée avec une expertise métier**. Notre expertise métier n'est pas « formateur IA », c'est **la stabilité React Native**. L'offre n'est donc pas « apprends Claude Code », c'est :

> **Apprends à faire tourner des agents IA sur TON app React Native en production — pour qu'ils réparent les crashs, écrivent tes tests Maestro et préparent tes releases pendant que tu dors.**

Personne d'autre ne peut vendre ça : ça demande 8 ans de React Native + la stack agentique qu'on utilise déjà tous les jours (ce repo en est la preuve : sprint SEO de juin, 8 plans, audit → mergé en 2 semaines).

## 2. Format retenu (et pourquoi)

| Format du transcript               | Exemple                         | Verdict pour nous                                                                   |
| ---------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Bootcamp cohorte 5 sem. ~1 200 €   | Collaboria                      | Trop lourd pour la contrainte < 4 h/sem de David                                    |
| Bootcamp d'été à angle fort ~458 € | Fruit Défendu (Thomas Burbidge) | ✅ **Notre format** : cohorte courte en août/septembre, angle fort, prix mid-ticket |
| Workshop 210 €                     | Alexis Minchella                | ✅ En **produit d'appel** (voir échelle d'offres §7)                                |
| IA dans la pédagogie               | Incubateur Solopreneur          | ✅ À appliquer au bootcamp existant, quel que soit le reste                         |

**Décision : cohorte sprint de 2 semaines, mid-ticket, lancée sur la liste.** L'été est un argument du transcript lui-même : les devs freelance ont moins de missions en août, c'est le moment où ils s'outillent.

## 3. L'offre complète (les 6 composants)

### 3.1 Nom

**« Agentic Sprint — React Native »**

Test SMS : _« Je me suis inscrit à l'Agentic Sprint, c'est 490 €, en 2 semaines tu montes une CI où des agents IA corrigent les bugs et écrivent les tests E2E de ton app. »_ ✅ Ça se répète.

Alternatives : « Ship With Agents », « Le Copilote RN ». À trancher, mais le naming méthode + niche (Agentic × React Native) est le plus googlable.

### 3.2 Cœur de l'offre (outcome, pas features)

> **En 2 semaines, ton app React Native en production a son premier agent qui ouvre des PRs utiles : triage de crashs Sentry, tests Maestro de non-régression, upgrade Expo SDK, release EAS. Tu repars avec le workflow, pas juste la théorie.**

Structure :

- **Semaine 1 — Fondations** : 2 lives (recorded). Les 4 actifs IA appliqués à React Native : `CLAUDE.md` d'un projet RN, skills, design system de l'app, tâches programmées. Exercice : ton agent ouvre sa **première PR sur ton propre repo** avant le jour 5.
- **Semaine 2 — Production** : 2 lives. Agent de triage crash (Sentry → PR de fix), agent Maestro (bug → test E2E de non-régression), agent release (EAS + changelog). Démo finale : chaque participant montre une PR d'agent mergée.
- Entre les lives : exercices async + review de repos en groupe.

Inclus / pas inclus (écrit noir sur blanc) :

- ✅ 4 lives + replays à vie, templates, communauté, 30 j de support async
- ❌ Pas de 1:1 (c'est l'audit / le retainer, voir §7), pas de code écrit à ta place, outils IA à ta charge (~20 $/mois d'API)

### 3.3 Stack de bonus (chaque bonus tue une objection)

| Objection                                      | Bonus                                                                                                         | Valeur vérifiable                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| « Je ne saurai pas quoi écrire comme prompts » | **10 skills/agents RN prêts à l'emploi** (Maestro, upgrade Expo, triage Sentry, release EAS, revue de PR RN…) | comparable : Solo Squad se vend 300 € |
| « Mon app est trop instable pour automatiser » | **React Native Stability Checklist** + session de scoring de ton app                                          | le lead magnet, version guidée        |
| « Je vais rester bloqué après »                | **30 jours de support async** post-sprint (Discord)                                                           | —                                     |
| « Il me manque les bases RN pour en profiter » | **Le livre inclus** (relance Q2 → synergie directe)                                                           | prix public du livre                  |

Total bonus < 2× le prix. Pas de « valeur 5 000 € » inventée — voix de marque : des chiffres, pas des adjectifs.

### 3.4 Garantie (first-win, conditionnelle)

> **« Si à la fin de la semaine 1, en ayant fait les exercices, ton agent n'a pas ouvert sa première PR sur ton app — remboursement intégral, sans discussion. »**

Gated sur la complétion → protège des touristes, crédibilise la promesse, et le first-win de semaine 1 est justement conçu pour être atteignable.

### 3.5 Rareté / urgence (réelle)

- **25 places** — vraie contrainte : on review les repos des participants en live, au-delà ça ne tient pas.
- **Le batch démarre le [date]** — vraie deadline, pas de timer bidon.
- Prix early-bird premier batch (490 €) → 690 € dès le batch 2, comme Collaboria (950 → 1 200 €) : la preuve sociale finance la hausse.

### 3.6 Prix + structure

- **Batch 1 (founding) : 490 € HT** — paiement en une fois (pas de split)
- Batch 2+ : 690 € HT
- Le workshop standalone à 190 € (voir §7) est déductible du sprint pendant 30 jours (upsell naturel).

## 4. La maths (comme dans le transcript)

| Scénario        | Places     | CA              |
| --------------- | ---------- | --------------- |
| Prudent         | 12 × 490 € | **5 880 € HT**  |
| Nominal         | 20 × 490 € | **9 800 € HT**  |
| Complet         | 25 × 490 € | **12 250 € HT** |
| Batch 2 (690 €) | 20 × 690 € | **13 800 € HT** |

2 batchs/an en rythme de croisière ≈ 20–26 K€ HT/an, hors upsell audit/retainer — sur un objectif plan v1 de 20–25 % de revenu décorrélé des heures, c'est le gros de la marche.

## 5. Canal de lancement

Exactement le séquencement du plan v1 : **la liste MailerLite est le canal #1.**

Exactement le séquencement du plan v1 : **la liste MailerLite est le canal #1.**

1. Lead magnet Stability Checklist (déjà prévu) → welcome sequence → waitlist du sprint
2. Séquence de lancement 5 emails sur la liste (davidl.fr + weshipit)
3. Épisode podcast dédié « on a mis des agents IA sur une app RN en prod » + posts LinkedIn avec les PRs d'agents en screenshots (des reçus, pas des promesses)
4. Page de vente sur **weshipit.today** (la couche commerciale — règle : le hero explique ce que c'est avant le prix)

**Langue : FR d'abord** (la liste et l'écosystème sont FR, tutoiement) ; version EN au batch 3 si la v1 valide.

## 6. IA dans la pédagogie (format 4 — à faire quoi qu'il arrive)

Même si le sprint ne se lance pas : chaque module du bootcamp existant reçoit un artefact IA « 0 → 1 » (générateur de config Maestro, scaffolder de `CLAUDE.md` RN…). C'est ce qui a fait exploser la satisfaction dans l'Incubateur — et ça revalorise un actif déjà construit.

## 7. Échelle d'offres (là où le sprint s'insère)

```
190 €      Workshop 2 h « Ton premier agent sur une app RN » (low-ticket, liste + froid)
   ↓ déductible 30 j
490–690 €  Agentic Sprint — React Native (cette offre)
   ↓ upsell naturel pour les devs en poste → leur CTO
10 K€      Audit weshipit.today / retainer 2,5–5 K€/mois (l'agent, on l'installe pour vous)
```

Le sprint est aussi un **générateur de leads B2B** : un dev salarié convaincu ramène son CTO vers l'audit.

## 8. Décisions (tranchées le 2026-07-17)

1. ✅ **Format : batch d'1 mois, un live par semaine** (vocabulaire officiel : « batch », pas « cohorte ») (mardi 12h30–14h) — remplace le format « 2 semaines » de la v1
2. ✅ **Batch 1 : du lundi 14 septembre au vendredi 9 octobre 2026** — lives les mardis 15, 22, 29 sept et 6 oct ; démo finale vendredi 9 oct ; inscriptions closes le vendredi 11 septembre
3. ✅ **Nom définitif : Agentic Sprint — React Native**
4. ✅ **Prix founding : 490 € HT** — paiement en une fois, pas de split — 690 € HT dès le batch 2
5. ✅ **Page intégrée → `apps/web/pages/agentic-sprint.tsx`** (source de vérité du copy désormais ; `page-vente-agentic-sprint.md` = brouillon v1 au format 2 semaines)
6. ✅ **Formulaire d'inscription : Notion** (`linksApi.notion.AGENTIC_SPRINT_FORM`) — branché sur les 4 CTAs de la page ; après soumission, David envoie le lien de paiement Stripe sous 48 h (paiement en une fois)
7. ⏭️ Reste : séquence de lancement emails (skill `emails`), OG image, screenshots de PRs d'agents pour renforcer la section « reçus »
