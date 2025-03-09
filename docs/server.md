# Backend (server.js)

Ce fichier implémente le serveur backend de l'application AppFood. Il utilise Express.js pour créer une API REST qui communique avec une base de données MongoDB.

## Configuration

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
```

Le serveur utilise les modules suivants :
- `mongoose` : Pour la connexion à MongoDB et la définition des modèles
- `dotenv` : Pour charger les variables d'environnement
- `express` : Pour créer le serveur web et l'API REST
- `cors` : Pour gérer les requêtes cross-origin

## Connexion à MongoDB

```javascript
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connecté à MongoDB Atlas avec succès');
  startServer();
})
.catch(err => {
  console.error('❌ Erreur lors de la connexion à MongoDB:', err.message);
  process.exit(1); // Arrêter le serveur si la connexion échoue
});
```

Le serveur tente de se connecter à MongoDB en utilisant l'URI spécifié dans les variables d'environnement. Si la connexion réussit, il démarre le serveur. Sinon, il affiche une erreur et s'arrête.

## Modèles

```javascript
const User = require('./models/User');
const Favorite = require('./models/Favorite');
const Restaurant = require('./models/Restaurant');
const Recipe = require('./models/Recipe');
```

Le serveur utilise plusieurs modèles Mongoose pour interagir avec la base de données :
- `User` : Modèle pour les utilisateurs
- `Favorite` : Modèle pour les favoris
- `Restaurant` : Modèle pour les restaurants
- `Recipe` : Modèle pour les recettes

## Démarrage du serveur

```javascript
function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  // Routes...

  // Démarrer le serveur
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}
```

Cette fonction configure et démarre le serveur Express. Elle :
1. Crée une instance d'application Express
2. Configure le port d'écoute
3. Configure les middleware CORS et JSON
4. Définit les routes de l'API
5. Démarre le serveur sur le port spécifié

## Routes API

### Routes pour les utilisateurs

```javascript
// GET /api/users - Récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
  // Récupère tous les utilisateurs
});

// GET /api/users/:id - Récupérer un utilisateur par ID
app.get('/api/users/:id', async (req, res) => {
  // Récupère un utilisateur par ID
});

// POST /api/users - Créer un nouvel utilisateur
app.post('/api/users', async (req, res) => {
  // Crée un nouvel utilisateur
});

// PUT /api/users/:id - Mettre à jour un utilisateur
app.put('/api/users/:id', async (req, res) => {
  // Met à jour un utilisateur
});

// DELETE /api/users/:id - Supprimer un utilisateur
app.delete('/api/users/:id', async (req, res) => {
  // Supprime un utilisateur
});
```

### Routes pour les favoris

```javascript
// GET /api/favorites - Récupérer tous les favoris
app.get('/api/favorites', async (req, res) => {
  // Récupère tous les favoris
});

// GET /api/users/:user_id/favorites - Récupérer les favoris d'un utilisateur
app.get('/api/users/:user_id/favorites', async (req, res) => {
  // Récupère les favoris d'un utilisateur
});

// POST /api/favorites - Créer un nouveau favori
app.post('/api/favorites', async (req, res) => {
  // Crée un nouveau favori
});

// DELETE /api/favorites/:id - Supprimer un favori
app.delete('/api/favorites/:id', async (req, res) => {
  // Supprime un favori
});
```

### Routes pour les restaurants

```javascript
// GET /api/restaurants - Récupérer tous les restaurants
app.get('/api/restaurants', async (req, res) => {
  // Récupère tous les restaurants
});

// GET /api/restaurants/:id - Récupérer un restaurant par ID
app.get('/api/restaurants/:id', async (req, res) => {
  // Récupère un restaurant par ID
});

// POST /api/restaurants - Créer un nouveau restaurant
app.post('/api/restaurants', async (req, res) => {
  // Crée un nouveau restaurant
});

// PUT /api/restaurants/:id - Mettre à jour un restaurant
app.put('/api/restaurants/:id', async (req, res) => {
  // Met à jour un restaurant
});

// DELETE /api/restaurants/:id - Supprimer un restaurant
app.delete('/api/restaurants/:id', async (req, res) => {
  // Supprime un restaurant
});
```

### Routes pour les recettes

```javascript
// GET /api/recipes - Récupérer toutes les recettes
app.get('/api/recipes', async (req, res) => {
  // Récupère toutes les recettes
});

// GET /api/recipes/:id - Récupérer une recette par ID
app.get('/api/recipes/:id', async (req, res) => {
  // Récupère une recette par ID
});

// POST /api/recipes - Créer une nouvelle recette
app.post('/api/recipes', async (req, res) => {
  // Crée une nouvelle recette
});

// PUT /api/recipes/:id - Mettre à jour une recette
app.put('/api/recipes/:id', async (req, res) => {
  // Met à jour une recette
});

// DELETE /api/recipes/:id - Supprimer une recette
app.delete('/api/recipes/:id', async (req, res) => {
  // Supprime une recette
});
```

### Route par défaut

```javascript
// GET / - Route par défaut
app.get('/', (req, res) => {
  res.send('API en cours d\'exécution');
});
```

Cette route affiche un message simple pour confirmer que l'API est en cours d'exécution.
