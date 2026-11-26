# Compléter le contenu du portfolio

Les données sont stockées dans les fichiers JSON du dossier `backend/data`. Le backend les expose à React via l'API. Après modification, redémarrer le serveur si nécessaire et recharger le site.

## Profil — profil.json

Champs utilisés par l'interface :
- `nom` : nom et prénom à afficher.
- `titre` : intitulé professionnel ou formation.
- `accroche` : présentation courte, rédigée à la première personne.
- `disponibilite` : petit statut facultatif.
- `liens.github` et `liens.linkedin` : URL publiques.
- `cv` : chemin du PDF dans le dossier public frontend, par exemple `/cv.pdf`.

Ne pas ajouter d'adresse postale, de téléphone personnel ou d'information confidentielle.

## Projets — projets.json

Le fichier contient un tableau. Chaque projet peut suivre cette structure :

```json
[
  {
    "slug": "identifiant-du-projet",
    "titre": "Titre du projet",
    "resume": "Résumé court et factuel.",
    "categorie": "Projet académique",
    "annee": "2026",
    "tags": ["IoT", "Smart Building"],
    "contexte": "Contexte réel du projet.",
    "objectif": "Objectif réel.",
    "realisation": "Travail effectivement réalisé.",
    "resultat": "Résultat vérifiable.",
    "technologies": ["Technologie réellement utilisée"]
  }
]
```

Le `slug` doit être unique et simple, en minuscules, sans espace ni accent. N'indiquer que les tâches réellement réalisées et distinguer le travail individuel du travail d'équipe.

## Compétences — competences.json

Le fichier contient un tableau de groupes :

```json
[
  {
    "groupe": "Développement",
    "items": [
      { "nom": "JavaScript", "niveau": 1 }
    ]
  }
]
```

Niveaux affichés : 1 = Notions, 2 = Autonome, 3 = Avancé. Ne choisir un niveau qu'après avoir vérifié que tu peux expliquer et utiliser la compétence.

## Parcours — parcours.json

Le fichier contient un tableau d'étapes :

```json
[
  {
    "id": "etape-1",
    "periode": "2025 — 2026",
    "intitule": "Intitulé exact de la formation ou de l'expérience",
    "organisme": "Établissement ou organisation",
    "description": "Description concise et exacte."
  }
]
```

Vérifier les intitulés et les dates avant publication.

## Images et CV

- Placer les fichiers publics dans `frontend/public/`.
- Optimiser les images (dimensions adaptées, WebP si possible, poids réduit).
- Vérifier les droits d'utilisation et ajouter un texte alternatif descriptif.
- Ne pas publier de document contenant des données personnelles non destinées au public.
