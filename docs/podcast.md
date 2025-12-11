# Guide : Ajouter un nouvel épisode de podcast

Ce guide explique le processus pour ajouter un nouvel épisode au podcast "Cross Platform Show".

## Prérequis

Avant d'ajouter l'épisode au site, vous devez avoir :

1. **Enregistré et publié l'épisode** sur les plateformes de streaming :
   - Spotify
   - Apple Podcasts
   - (Optionnel) YouTube

2. **Récupéré les informations suivantes** :
   - URL Spotify de l'épisode
   - URL Apple Podcasts de l'épisode
   - (Optionnel) ID de la vidéo YouTube
   - Logo de l'entreprise/invité (URL d'une image, idéalement depuis l'App Store)
   - Nom complet de l'invité

## Étapes pour ajouter un épisode

### 1. Modifier le fichier de données

Ouvrir le fichier `apps/weshipit/fixtures/podcast-episodes.fixture.ts` et ajouter un nouvel objet à la fin du tableau `podcastEpisodes` :

```typescript
{
  name: 'NomEntreprise',
  title: 'Titre complet de l\'épisode avec le nom de l\'invité',
  number: 17, // Incrémenter depuis le dernier épisode
  description_short: 'Description courte pour les cartes (1-2 lignes)',
  description: `<p><strong>Sommaire</strong></p><p>Description HTML complète...</p>`,
  slug: 'nom-entreprise', // URL-friendly, en minuscules avec tirets
  spotify_url: 'https://open.spotify.com/episode/XXXXX?si=XXXXX',
  apple_podcast_url: 'https://podcasts.apple.com/fr/podcast/XXXXX',
  youtube_embed_id: 'VIDEO_ID?si=XXXXX', // Optionnel
  company_logo: 'https://is1-ssl.mzstatic.com/image/thumb/...',
  guest_full_name: 'Prénom Nom',
}
```

### 2. Champs obligatoires

| Champ               | Description                          | Exemple                                         |
| ------------------- | ------------------------------------ | ----------------------------------------------- |
| `name`              | Nom de l'entreprise ou identifiant   | `'Alan'`                                        |
| `title`             | Titre complet de l'épisode           | `'React Native chez Alan avec Xavier Seignard'` |
| `number`            | Numéro de l'épisode (incrémental)    | `17`                                            |
| `description_short` | Résumé court pour les cartes         | `'L'assurance santé nouvelle génération...'`    |
| `description`       | Description HTML complète            | `'<p>Dans cet épisode...</p>'`                  |
| `slug`              | Identifiant URL (minuscules, tirets) | `'alan'`                                        |
| `spotify_url`       | Lien Spotify complet                 | `'https://open.spotify.com/episode/...'`        |
| `apple_podcast_url` | Lien Apple Podcasts complet          | `'https://podcasts.apple.com/fr/podcast/...'`   |
| `company_logo`      | URL du logo (recommandé: App Store)  | `'https://is1-ssl.mzstatic.com/...'`            |
| `guest_full_name`   | Nom complet de l'invité              | `'Xavier Seignard'`                             |

### 3. Champ optionnel

| Champ              | Description                | Exemple               |
| ------------------ | -------------------------- | --------------------- |
| `youtube_embed_id` | ID YouTube avec paramètres | `'VIDEO_ID?si=XXXXX'` |

### 4. (Optionnel) Ajouter une transcription

Si vous avez une transcription de l'épisode :

1. Créer un fichier texte dans `apps/weshipit/public/podcast-transcripts/{slug}.txt`
2. Utiliser l'un des formats supportés :

**Format 1 : Parenthèses**

```
Speaker1 (0:05)
Texte de ce que dit le speaker...

Speaker2 (1:20)
Réponse du speaker 2...
```

**Format 2 : Crochets**

```
Speaker1 [0:05]
Texte de ce que dit le speaker...

Speaker2 [1:20]
Réponse du speaker 2...
```

Le nom du fichier doit correspondre exactement au `slug` de l'épisode.

## Structure des fichiers

```
apps/weshipit/
├── fixtures/
│   └── podcast-episodes.fixture.ts    # Données des épisodes
├── pages/
│   └── podcast/
│       ├── index.tsx                  # Page liste des épisodes
│       └── [slug].tsx                 # Page détail d'un épisode
└── public/
    └── podcast-transcripts/
        └── {slug}.txt                 # Transcriptions (optionnel)
```

## Vérification

Après avoir ajouté l'épisode :

1. Lancer le serveur de développement : `yarn dev`
2. Vérifier la page `/podcast` - le nouvel épisode doit apparaître
3. Vérifier la page `/podcast/{slug}` - les détails doivent s'afficher correctement
4. Si une transcription a été ajoutée, vérifier `/podcast/{slug}/transcript`

## Notes importantes

- Les pages sont générées statiquement (SSG) à partir du fichier fixture
- L'image OG est générée automatiquement pour chaque épisode
- Le tri des épisodes peut être ascendant ou descendant sur la page liste
- Les liens vers Spotify permettent de sauter à un timestamp spécifique depuis la transcription

## Liens utiles

- Formulaire de participation au podcast : [Notion](https://flexbox.notion.site/17af478bcb8c8018b4a9db6b13d1df38)
- Page podcast : [/podcast](https://weshipit.today/podcast)
