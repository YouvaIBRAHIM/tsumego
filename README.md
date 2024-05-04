# Plateforme de Jeu de Go

## Description

Ce projet est une plateforme web destinée à populariser le jeu de Go à travers une interface interactive. La plateforme
permet aux membres de résoudre des problèmes de Go (tsumego), jouer contre d'autres joueurs, et consulter des parties
classiques annotées. Ce projet est développé avec Django, MongoDB, TypeScript et utilise Docker pour la
conteneurisation.

## Technologies utilisées

- **Backend**: Django avec Djongo ou PyMongo pour intégrer MongoDB.
- **Frontend**: TypeScript avec Vite, Material-UI (MUI) pour les composants d'interface utilisateur et Zustand pour la
  gestion d'état.
- **Base de données**: MongoDB.
- **Conteneurisation**: Docker.
- **Scraping**: Beautiful Soup pour récupérer des données externes.

## Configuration du projet

### Prérequis

- Docker
- Node.js et npm

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone git@github.com:kohai-fred/go_project.git
   cd go_project
   ```

## **Le backend**

#### Lancer les conteneurs Docker

⚠️ l'image est basée sur python3.11.9

Dans le terminal :

1. `cp .env.example .env` . (étape 1 à ne faire qu'à la 1ère installation) vous pouvez changer :
   - `MONGO_DB_USERNAME=admin`
   - `MONGO_DB_PWD=admin`
2. `make update` - cette commande va créer/mettre à jour un .venv pour isoler les dépendances
3. `make compose` - va construire les différents containers et set la configuration
4. Sur votre navigateur :
   - `localhost:8000`--> accès à l'interface Django
   - `localhost:8081`--> accès à la bdd via mongoExpress

#### Arrêter les conteuneurs Docker

Dans le terminal:

1. `make stop` --> arrête les conteuneurs mais persiste la donnée
2. `make kill`--> arrête ET supprime la donnée

#### Commandes divers

Dans le terminal:

1. `make` --> vous donnes la liste des commandes disponible
2. `make add p=<nom_du_package>`--> permet d'ajouter une librairi et mets à jour le fichier <u>requirements.txt</u>
   - ⚠️ <b>ATTENTION D'AVOIR ACTIVER LE VIRTUALENV</b> --> ex: `source .venv/bin/activate`

## Installer les dépendances frontend

```bash
npm install
npm run dev
```

## Structure du projet

- `backend/`: Contient le code Django pour le backend.
- `frontend/`: Contient le code TypeScript pour le frontend.
- `data_scraping/`: Scripts pour le scraping de données avec Beautiful Soup.
- `docker/`: Fichiers Dockerfile et docker-compose.yml.

## Utilisation

## Licence

Licence MIT.

## Auteurs

Youva Ibrahim, Frederick Vu, Florent GATTI
