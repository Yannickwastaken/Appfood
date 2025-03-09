
Copy
# AppFood - Application Web de Recettes et Restaurants

Application web unifiée pour explorer des recettes et des restaurants, avec un système d'authentification et de gestion des favoris.

## Fonctionnalités

- **Authentification** : Système de connexion et d'inscription pour les utilisateurs.
- **Base de Données** : Stockage des données des utilisateurs, recettes et restaurants.
- **Gestion des Favoris** : Ajout et suppression de recettes et restaurants favoris.
- **Recherche** : Fonctionnalité de recherche pour trouver des recettes et des restaurants.
- **Carte Interactive** : Affichage des restaurants sur une carte interactive.

## Structure du Projet
/
├── index.html # Page d'accueil
├── package.json # Configuration du projet
├── .eslintrc # Configuration ESLint
├── .prettierrc # Configuration Prettier
├── src/ # Code source
│ ├── assets/ # Ressources statiques
│ │ ├── images/ # Images
│ │ └── styles/ # Feuilles de style
│ ├── js/ # JavaScript
│ │ ├── main.js # Point d'entrée
│ │ └── modules/ # Modules JavaScript
│ │ ├── auth.js # Authentification
│ │ ├── data.js # Gestion des données
│ │ ├── map.js # Carte interactive
│ │ └── ui.js # Interface utilisateur
│ ├── html/ # Composants HTML
│ └── css/ # Feuilles de style CSS
└── dist/ # Fichiers de production

Copy

## Principes de Conception

1. **Séparation des Préoccupations** : Chaque module a un rôle spécifique.
2. **Modularité** : Les fonctionnalités sont divisées en modules réutilisables.
3. **Maintenabilité** : Organisation claire des fichiers pour faciliter les mises à jour.
4. **Extensibilité** : Structure conçue pour ajouter de nouvelles fonctionnalités.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/appfood.git
Installez les dépendances :

bash
Copy
npm install
Utilisation
Pour démarrer le serveur de développement :

bash
Copy
npm start
L'application est accessible à l'adresse http://localhost:8080.

Commandes Utiles
npm start : Démarre le serveur de développement.

npm run lint : Vérifie le code avec ESLint.

npm run format : Formate le code avec Prettier.

npm run build : Construit le projet pour la production.

Gestion des Données
L'application utilise une base de données pour stocker :

Restaurants : Informations sur les restaurants (nom, cuisine, emplacement, etc.).

Recettes : Détails des recettes (ingrédients, instructions, temps de préparation, etc.).

Utilisateurs : Informations d'authentification (nom, email, mot de passe).

Schéma des Données
Restaurant
json
Copy
{
  "id": "string",
  "name": "string",
  "cuisine": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "website": "string",
  "rating": "number",
  "priceRange": "string",
  "image": "string",
  "lat": "number",
  "lng": "number",
  "openingHours": {
    "monday": "string",
    "tuesday": "string",
    "wednesday": "string",
    "thursday": "string",
    "friday": "string",
    "saturday": "string",
    "sunday": "string"
  }
}
Recette
json
Copy
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "restaurant_id": "string",
  "ingredients": ["string"],
  "instructions": ["string"],
  "prepTime": "number",
  "cookTime": "number",
  "servings": "number",
  "difficulty": "string",
  "image": "string"
}
Migration vers le Cloud
Pour migrer les données vers un service cloud :

Utilisez la fonction exportToJSON() du module data.js pour exporter les données.

Créez une API REST avec un backend (Node.js, Python, etc.).

Modifiez les fonctions CRUD dans data.js pour utiliser l'API au lieu d'IndexedDB.

Implémentez un système de synchronisation pour gérer le mode hors ligne.

Authentification
L'authentification utilise localStorage pour la démonstration. Pour une application en production :

Remplacez localStorage par des cookies sécurisés ou des tokens JWT.

Implémentez un backend pour la validation des utilisateurs.

Ajoutez des mesures de sécurité (HTTPS, protection CSRF, etc.).

Carte Interactive
La carte utilise Leaflet.js et peut être étendue avec :

Filtrage des restaurants par type de cuisine.

Calcul d'itinéraires.

Géolocalisation de l'utilisateur.

Clustering de marqueurs pour améliorer les performances.

Tests et Débogage
L'application est configurée avec ESLint et Prettier pour maintenir la qualité du code.

Pour déboguer :

Utilisez les outils de développement du navigateur.

Consultez la console pour les messages d'erreur.

Utilisez les points d'arrêt dans le code JavaScript.