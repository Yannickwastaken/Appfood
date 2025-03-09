# AppFood - Documentation des fonctionnalités

Ce document détaille l'ensemble des fonctionnalités et fonctions présentes dans l'application AppFood, une plateforme permettant aux utilisateurs de découvrir des recettes et des restaurants, de les ajouter en favoris et de laisser des avis.

## Table des matières

1. [Architecture générale](#architecture-générale)
2. [Modules principaux](#modules-principaux)
3. [Pages principales](#pages-principales)
4. [Backend (server.js)](#backend-serverjs)
5. [Documentation détaillée](#documentation-détaillée)

## Architecture générale

L'application AppFood est structurée en modules JavaScript qui gèrent différentes fonctionnalités. L'architecture suit un modèle modulaire où chaque fichier a une responsabilité spécifique. L'application utilise une API REST pour communiquer avec une base de données MongoDB.

## Modules principaux

- **Module d'authentification (auth.js)** : Gère l'authentification des utilisateurs, y compris l'inscription, la connexion et la déconnexion.
- **Module de données (data.js)** : Gère toutes les opérations de base de données via une API REST.
- **Module de contenu (content.js)** : Gère le chargement et l'affichage des restaurants et des recettes.
- **Module de favoris (favorites.js)** : Gère les fonctionnalités de favoris pour les recettes et les restaurants.
- **Module de carte (map.js)** : Gère l'intégration de la carte Leaflet pour afficher les restaurants.
- **Module d'avis (reviews.js)** : Gère les avis des utilisateurs pour les recettes et les restaurants.

## Pages principales

- **Page d'accueil (main.js)** : Point d'entrée principal de l'application.
- **Page de recettes (recipes.js)** : Gère l'affichage et l'interaction avec les recettes.
- **Page de profil (profile.js)** : Gère l'affichage et l'interaction avec le profil utilisateur.

## Backend (server.js)

Le backend est construit avec Express.js et MongoDB. Il fournit une API REST pour gérer les utilisateurs, les recettes, les restaurants, les favoris et les avis.

## Documentation détaillée

Pour une documentation détaillée de chaque module, veuillez consulter les fichiers suivants :

- [Module d'authentification](./auth.md)
- [Module de données](./data.md)
- [Module de contenu](./content.md)
- [Module de favoris](./favorites.md)
- [Module de carte](./map.md)
- [Module d'avis](./reviews.md)
- [Page d'accueil](./main.md)
- [Page de recettes](./recipes.md)
- [Page de profil](./profile.md)
- [Backend](./server.md)
