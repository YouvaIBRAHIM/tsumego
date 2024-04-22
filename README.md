# Plateforme de Jeu de Go

## Description

Ce projet est une plateforme web destinée à populariser le jeu de Go à travers une interface interactive. La plateforme permet aux membres de résoudre des problèmes de Go (tsumego), jouer contre d'autres joueurs, et consulter des parties classiques annotées. Ce projet est développé avec Django, MongoDB, TypeScript et utilise Docker pour la conteneurisation.

## Technologies utilisées

- **Backend**: Django avec Djongo ou PyMongo pour intégrer MongoDB.
- **Frontend**: TypeScript avec Vite, Material-UI (MUI) pour les composants d'interface utilisateur et Zustand pour la gestion d'état.
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

## **Lancer les conteneurs Docker**

<pre><div class="dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium"><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-markdown"># Lancer les conteneurs Docker

```bash
docker-compose up --build
</code></div></div></pre>

## Installer les dépendances frontend

```bash
npm install
npm run dev
```

## Structure du projet

* `backend/`: Contient le code Django pour le backend.
* `frontend/`: Contient le code TypeScript pour le frontend.
* `data_scraping/`: Scripts pour le scraping de données avec Beautiful Soup.
* `docker/`: Fichiers Dockerfile et docker-compose.yml.

## Utilisation

## Licence

Licence MIT.

## Auteurs

Youva Ibrahim, Frederick Vu, Florent GATTI
