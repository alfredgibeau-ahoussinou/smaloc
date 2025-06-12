# StoneLead API

API backend pour l'application StoneLead.

## Configuration de l'environnement

1. Créez un fichier `.env` à la racine du dossier `apps/api` avec les variables suivantes :

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=stonelead

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# API Keys (à remplacer par vos clés)
FACEBOOK_API_KEY=your-facebook-api-key
GOOGLE_ADS_API_KEY=your-google-ads-api-key
LINKEDIN_API_KEY=your-linkedin-api-key
```

## Installation

```bash
# Installer les dépendances
npm install

# Créer la base de données PostgreSQL
createdb stonelead

# Lancer les migrations
npm run migration:run

# Démarrer le serveur en mode développement
npm run dev
```

## Structure du projet

```
src/
├── config/         # Configuration (database, auth, etc.)
├── controllers/    # Contrôleurs pour les routes
├── entities/       # Modèles de données TypeORM
├── middlewares/    # Middlewares Express
├── routes/         # Routes de l'API
├── services/       # Logique métier
├── types/          # Types TypeScript
└── utils/          # Utilitaires
```

## API Endpoints

### Authentication
- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion
- GET /api/auth/me - Informations utilisateur

### Campagnes
- GET /api/campaigns - Liste des campagnes
- POST /api/campaigns - Créer une campagne
- GET /api/campaigns/:id - Détails d'une campagne
- PUT /api/campaigns/:id - Mettre à jour une campagne
- DELETE /api/campaigns/:id - Supprimer une campagne

### Clients
- GET /api/clients - Liste des clients
- POST /api/clients - Créer un client
- GET /api/clients/:id - Détails d'un client
- PUT /api/clients/:id - Mettre à jour un client
- DELETE /api/clients/:id - Supprimer un client

## Développement

```bash
# Lancer les tests
npm test

# Vérifier le linting
npm run lint

# Formater le code
npm run format
``` 