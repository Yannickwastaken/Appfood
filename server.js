const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Tentative de connexion à MongoDB avec l\'URI:', MONGODB_URI);

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

// Modèles Mongoose
const User = require('./models/User');
const Favorite = require('./models/Favorite');
const Restaurant = require('./models/Restaurant');
const Recipe = require('./models/Recipe');

// Démarrer le serveur
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

  // Routes API pour les Utilisateurs
  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Routes API pour les Favoris
  app.get('/api/favorites', async (req, res) => {
    try {
      const favorites = await Favorite.find();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/users/:user_id/favorites', async (req, res) => {
    try {
      const favorites = await Favorite.find({ user_id: req.params.user_id });
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/favorites', async (req, res) => {
    try {
      const favorite = new Favorite(req.body);
      await favorite.save();
      res.status(201).json(favorite);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/favorites/:id', async (req, res) => {
    try {
      const favorite = await Favorite.findByIdAndDelete(req.params.id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favori non trouvé' });
      }
      res.json({ message: 'Favori supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Routes API pour les Restaurants
  app.get('/api/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/restaurants/:id', async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/restaurants', async (req, res) => {
    try {
      const restaurant = new Restaurant(req.body);
      await restaurant.save();
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/api/restaurants/:id', async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/restaurants/:id', async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
      }
      res.json({ message: 'Restaurant supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Routes API pour les Recettes
app.get('/api/recipes', async (req, res) => {
  try {
      const recipes = await Recipe.find();
      res.json(recipes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
          return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json(recipe);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
      const recipe = new Recipe(req.body);
      await recipe.save();
      res.status(201).json(recipe);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!recipe) {
          return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json(recipe);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) {
          return res.status(404).json({ message: 'Recette non trouvée' });
      }
      res.json({ message: 'Recette supprimée avec succès' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

  // Route par défaut
  app.get('/', (req, res) => {
    res.send('API en cours d\'exécution');
  });

  // Démarrer le serveur
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}