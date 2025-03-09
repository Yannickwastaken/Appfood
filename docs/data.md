# Module de données (data.js)

Ce module gère toutes les opérations de base de données via une API REST, y compris la récupération, l'ajout, la mise à jour et la suppression de données.

## Fonctions exportées

### `initDatabase()`

Initialise la connexion à la base de données.

```javascript
export async function initDatabase() {
    // Teste la connexion en récupérant les utilisateurs
    // Affiche un message de succès ou d'erreur
}
```

### `add(collection, item)`

Ajoute un élément à une collection.

```javascript
export async function add(collection, item) {
    // Appelle apiRequest avec la méthode POST
    // Retourne l'élément ajouté
}
```

### `getById(collection, id)`

Récupère un élément par son ID.

```javascript
export async function getById(collection, id) {
    // Appelle apiRequest avec l'ID spécifié
    // Retourne l'élément récupéré
}
```

### `getAll(collection)`

Récupère tous les éléments d'une collection.

```javascript
export async function getAll(collection) {
    // Appelle apiRequest pour récupérer tous les éléments
    // Retourne un tableau d'éléments
}
```

### `update(collection, item)`

Met à jour un élément.

```javascript
export async function update(collection, item) {
    // Vérifie que l'élément a un ID
    // Appelle apiRequest avec la méthode PUT
    // Retourne l'élément mis à jour
}
```

### `remove(collection, id)`

Supprime un élément.

```javascript
export async function remove(collection, id) {
    // Appelle apiRequest avec la méthode DELETE
    // Retourne null ou un message de confirmation
}
```

### `queryByIndex(collection, field, value)`

Recherche des éléments par un champ spécifique.

```javascript
export async function queryByIndex(collection, field, value) {
    // Appelle apiRequest avec des paramètres de requête
    // Retourne un tableau d'éléments correspondants
}
```

### `registerUser(userData)`

Inscrit un nouvel utilisateur.

```javascript
export async function registerUser(userData) {
    // Appelle apiRequest pour l'endpoint d'inscription
    // Retourne l'utilisateur créé
}
```

### `loginUser(email, password)`

Connecte un utilisateur.

```javascript
export async function loginUser(email, password) {
    // Appelle apiRequest pour l'endpoint de connexion
    // Retourne l'utilisateur connecté
}
```

### `addFavoriteRecipe(userId, recipeId)`

Ajoute une recette aux favoris d'un utilisateur.

```javascript
export async function addFavoriteRecipe(userId, recipeId) {
    // Appelle apiRequest pour ajouter un favori
    // Retourne le résultat de l'opération
}
```

### `removeFavoriteRecipe(userId, recipeId)`

Supprime une recette des favoris d'un utilisateur.

```javascript
export async function removeFavoriteRecipe(userId, recipeId) {
    // Appelle apiRequest pour supprimer un favori
    // Retourne le résultat de l'opération
}
```

### `getFavoriteRecipes(userId)`

Récupère les recettes favorites d'un utilisateur.

```javascript
export async function getFavoriteRecipes(userId) {
    // Appelle apiRequest pour récupérer les favoris
    // Retourne un tableau de recettes favorites
}
```

### `addFavoriteRestaurant(userId, restaurantId)`

Ajoute un restaurant aux favoris d'un utilisateur.

```javascript
export async function addFavoriteRestaurant(userId, restaurantId) {
    // Appelle apiRequest pour ajouter un favori
    // Retourne le résultat de l'opération
}
```

### `removeFavoriteRestaurant(userId, restaurantId)`

Supprime un restaurant des favoris d'un utilisateur.

```javascript
export async function removeFavoriteRestaurant(userId, restaurantId) {
    // Appelle apiRequest pour supprimer un favori
    // Retourne le résultat de l'opération
}
```

### `getFavoriteRestaurants(userId)`

Récupère les restaurants favoris d'un utilisateur.

```javascript
export async function getFavoriteRestaurants(userId) {
    // Appelle apiRequest pour récupérer les favoris
    // Retourne un tableau de restaurants favoris
}
```

### `addReview(reviewData)`

Ajoute un avis pour une recette ou un restaurant.

```javascript
export async function addReview(reviewData) {
    // Appelle apiRequest pour ajouter un avis
    // Retourne l'avis ajouté
}
```

### `getReviews(itemId, itemType)`

Récupère les avis pour une recette ou un restaurant.

```javascript
export async function getReviews(itemId, itemType) {
    // Appelle apiRequest avec des paramètres de requête
    // Retourne un tableau d'avis
}
```

### `isFavorite(userId, itemId, itemType)`

Vérifie si un élément est un favori pour un utilisateur.

```javascript
export async function isFavorite(userId, itemId, itemType) {
    // Appelle apiRequest pour vérifier le statut de favori
    // Retourne un booléen
}
```

## Fonctions internes

### `apiRequest(endpoint, method, data)`

Fonction générique pour effectuer des requêtes API.

```javascript
async function apiRequest(endpoint, method = 'GET', data = null) {
    // Construit l'URL et les options de la requête
    // Effectue la requête fetch
    // Gère les erreurs et les réponses
    // Retourne les données de la réponse
}
