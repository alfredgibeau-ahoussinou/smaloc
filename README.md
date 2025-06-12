# StoneLead - Agence SMA (Social Media Advertising)

StoneLead est une agence spécialisée dans la publicité digitale et la prospection SMA, construite pour s'étendre à l'international.

## Technologies utilisées

- **Frontend**: Next.js 14 avec TypeScript
- **Backend**: Node.js avec Express et TypeScript
- **Base de données**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## Structure du projet

```
stonelead/
├── apps/
│   ├── web/           # Application Next.js (frontend)
│   └── api/           # API Express (backend)
├── packages/          # Packages partagés
│   ├── ui/           # Composants UI réutilisables
│   ├── config/       # Configuration partagée
│   └── types/        # Types TypeScript partagés
└── docker/           # Configuration Docker
```

## Prérequis

- Node.js 18+
- PostgreSQL 14+
- Docker (optionnel)

## Installation

1. Cloner le repository
```bash
git clone https://github.com/alfredgibeau-ahoussinou/stonelead.git
cd stonelead
```

2. Installer les dépendances
```bash
# Installer les dépendances du frontend
cd apps/web
npm install

# Installer les dépendances du backend
cd ../api
npm install
```

3. Configurer les variables d'environnement
```bash
# Dans apps/web
cp .env.example .env.local

# Dans apps/api
cp .env.example .env
```

4. Démarrer le développement
```bash
# Démarrer le frontend
cd apps/web
npm run dev

# Démarrer le backend
cd ../api
npm run dev
```

## Fonctionnalités principales

- Gestion des campagnes publicitaires
- Tableau de bord analytique
- Gestion des clients
- Rapports automatisés
- Interface multilingue
- Gestion des utilisateurs et des rôles

## Contribution

Les contributions sont les bienvenues ! Veuillez consulter notre guide de contribution pour plus de détails.

## Licence

Propriétaire - Tous droits réservés