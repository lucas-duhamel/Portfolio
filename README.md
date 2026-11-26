# Portfolio — React & Node.js

Portfolio professionnel construit dans le cadre du module React + Node.js (M2 Manager en ingénierie informatique — Smart & Green Building, ESIEE-IT).

Le socle technique est en place. Les informations personnelles, les projets, les compétences détaillées, le parcours et le CV restent à compléter avec des données exactes et validées.

## Architecture
- frontend : React, Vite et React Router.
- backend : Node.js et Express.
- backend/data : fichiers JSON versionnés avec Git.
- docs : journal des prompts et vérifications.

Aucune base de données n'est nécessaire.

## Prérequis
Node.js 20+ et npm.

## Lancer en local
Terminal 1 :
```bash
cd backend
npm install
npm run dev
```
API : http://localhost:3000

Terminal 2 :
```bash
cd frontend
npm install
npm run dev
```
Ouvrir l'URL affichée par Vite (généralement http://localhost:5173). Le proxy Vite transmet /api au backend.

## Routes API
| Méthode | Route | Rôle |
|---|---|---|
| GET | /api/profil | Profil |
| GET | /api/projets | Liste des projets |
| GET | /api/projets?tag=IoT | Filtre par tag |
| GET | /api/projets/:slug | Détail |
| GET | /api/competences | Compétences |
| GET | /api/parcours | Parcours |

Les routes inconnues et les projets inexistants renvoient un JSON 404.

## Configuration
En production, définir VITE_API_URL dans le projet frontend (URL de l'API terminant par /api). Définir CORS_ORIGINS dans le backend avec l'origine du frontend. Voir les fichiers .env.example.

## Vercel
Créer deux projets Vercel liés à ce dépôt :
1. Frontend : Root Directory = frontend. Ajouter VITE_API_URL.
2. Backend : Root Directory = backend. Ajouter CORS_ORIGINS.
Le backend expose une fonction via backend/api/index.js. Tester l'API après déploiement avant de publier le frontend.

## Avant publication
1. Compléter backend/data/profil.json.
2. Ajouter uniquement les projets choisis dans backend/data/projets.json.
3. Compléter les compétences et le parcours avec des informations exactes.
4. Ajouter le CV PDF dans frontend/public et renseigner son chemin.
5. Ajouter des images optimisées dont l'utilisation est autorisée.
6. Vérifier affichage mobile, accessibilité, liens et API.

## Vérification
```bash
cd backend && npm test
cd ../frontend && npm run build
```
