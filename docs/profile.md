# Page de profil (profile.js)

Ce fichier gère l'affichage et l'interaction avec le profil utilisateur. Il permet aux utilisateurs de consulter leurs informations personnelles, leurs recettes et restaurants favoris, ainsi que leurs avis.

## Variables globales

```javascript
// Éléments DOM
let profileContainer;
let profileContent;
let loginMessage;
let profileUsername;
let profileEmail;
let profileCreatedAt;
let favoriteRecipesContainer;
let favoriteRestaurantsContainer;
let recipeReviewsContainer;
let restaurantReviewsContainer;
let tabButtons;
let tabPanes;
```

Ces variables stockent les références aux éléments DOM de la page de profil.

## Fonctions principales

### `initApp()`

Initialise la page de profil.

```javascript
async function initApp() {
    try {
        // Initialise l'authentification
        // Récupère les éléments DOM
        // Initialise les onglets
        // Vérifie si l'utilisateur est authentifié
        // Charge les données du profil si l'utilisateur est authentifié
    } catch (error) {
        // Gère les erreurs d'initialisation
    }
}
```

### `initTabs()`

Initialise la fonctionnalité des onglets.

```javascript
function initTabs() {
    // Ajoute des écouteurs d'événements aux boutons d'onglets
    // Configure la navigation entre les onglets
}
```

### `showLoginMessage()`

Affiche un message demandant à l'utilisateur de se connecter.

```javascript
function showLoginMessage() {
    // Cache le contenu du profil
    // Affiche le message de connexion
}
```

### `loadProfileData()`

Charge les données du profil utilisateur.

```javascript
async function loadProfileData() {
    // Récupère l'utilisateur actuel
    // Affiche le contenu du profil
    // Affiche les informations de l'utilisateur
    // Charge les favoris
    // Charge les avis
}
```

### `loadFavorites()`

Charge les favoris de l'utilisateur.

```javascript
async function loadFavorites() {
    try {
        // Charge les recettes favorites
        // Charge les restaurants favoris
        // Affiche les favoris
    } catch (error) {
        // Gère les erreurs de chargement
    }
}
```

### `displayFavoriteRecipes(recipes)`

Affiche les recettes favorites.

```javascript
function displayFavoriteRecipes(recipes) {
    // Efface le conteneur
    // Affiche un message si aucune recette favorite n'est trouvée
    // Crée des cartes pour chaque recette
    // Ajoute les cartes au conteneur
}
```

### `displayFavoriteRestaurants(restaurants)`

Affiche les restaurants favoris.

```javascript
function displayFavoriteRestaurants(restaurants) {
    // Efface le conteneur
    // Affiche un message si aucun restaurant favori n'est trouvé
    // Crée des cartes pour chaque restaurant
    // Ajoute les cartes au conteneur
}
```

### `createRecipeCard(recipe)`

Crée une carte de recette.

```javascript
function createRecipeCard(recipe) {
    // Crée un élément div pour la carte
    // Définit le contenu HTML de la carte
    // Retourne l'élément de carte
}
```

### `createRestaurantCard(restaurant)`

Crée une carte de restaurant.

```javascript
function createRestaurantCard(restaurant) {
    // Crée un élément div pour la carte
    // Définit le contenu HTML de la carte
    // Retourne l'élément de carte
}
```

### `loadReviews()`

Charge les avis de l'utilisateur.

```javascript
async function loadReviews() {
    try {
        // Récupère l'utilisateur actuel
        // Récupère tous les avis
        // Filtre les avis par utilisateur
        // Affiche les avis
    } catch (error) {
        // Gère les erreurs de chargement
    }
}
```

### `getUserReviews(itemType)`

Récupère les avis de l'utilisateur par type d'élément.

```javascript
async function getUserReviews(itemType) {
    // Récupère l'utilisateur actuel
    // Récupère tous les avis du type spécifié
    // Filtre les avis par utilisateur
    // Retourne les avis filtrés
}
```

### `displayRecipeReviews(reviews)`

Affiche les avis sur les recettes.

```javascript
function displayRecipeReviews(reviews) {
    // Efface le conteneur
    // Affiche un message si aucun avis n'est trouvé
    // Crée une liste d'avis
    // Trie les avis par date
    // Crée des éléments pour chaque avis
    // Ajoute les éléments à la liste
}
```

### `displayRestaurantReviews(reviews)`

Affiche les avis sur les restaurants.

```javascript
function displayRestaurantReviews(reviews) {
    // Efface le conteneur
    // Affiche un message si aucun avis n'est trouvé
    // Crée une liste d'avis
    // Trie les avis par date
    // Crée des éléments pour chaque avis
    // Ajoute les éléments à la liste
}
```

## Écouteurs d'événements

```javascript
document.addEventListener('DOMContentLoaded', initApp);
```

Déclenche l'initialisation de la page lorsque le DOM est entièrement chargé.
