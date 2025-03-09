# Module de contenu (content.js)

Ce module gère le chargement et l'affichage des restaurants et des recettes sur la page d'accueil.

## Fonctions exportées

### `loadRestaurants()`

Charge et affiche les restaurants.

```javascript
export async function loadRestaurants() {
    // Récupère les restaurants depuis la base de données
    // Affiche les restaurants sur la page
    // Ajoute les marqueurs de restaurants sur la carte
    // Retourne les restaurants
}
```

### `loadRecipes()`

Charge et affiche les recettes.

```javascript
export async function loadRecipes() {
    // Récupère les recettes depuis la base de données
    // Affiche les recettes sur la page
    // Retourne les recettes
}
```

### `search(query)`

Recherche des restaurants et des recettes.

```javascript
export async function search(query) {
    // Récupère tous les restaurants et recettes
    // Filtre les restaurants par nom, cuisine ou description
    // Filtre les recettes par nom, catégorie ou description
    // Affiche les résultats filtrés
    // Retourne les résultats
}
```

### `getRecipesByRestaurant(restaurantId)`

Récupère les recettes d'un restaurant spécifique.

```javascript
export async function getRecipesByRestaurant(restaurantId) {
    // Recherche les recettes par restaurant_id
    // Retourne les recettes correspondantes
}
```

## Fonctions internes

### `displayRestaurants(restaurants)`

Affiche les restaurants sur la page.

```javascript
function displayRestaurants(restaurants) {
    // Efface le conteneur
    // Affiche un message si aucun restaurant n'est trouvé
    // Crée des cartes pour chaque restaurant
    // Ajoute les cartes au conteneur
}
```

### `displayRecipes(recipes)`

Affiche les recettes sur la page.

```javascript
function displayRecipes(recipes) {
    // Efface le conteneur
    // Affiche un message si aucune recette n'est trouvée
    // Crée des cartes pour chaque recette
    // Ajoute les cartes au conteneur
}
```

### `createRestaurantCard(restaurant)`

Crée un élément de carte pour un restaurant.

```javascript
function createRestaurantCard(restaurant) {
    // Crée un élément div pour la carte
    // Définit le contenu HTML de la carte
    // Ajoute un écouteur d'événement pour le bouton de détails
    // Retourne l'élément de carte
}
```

### `createRecipeCard(recipe)`

Crée un élément de carte pour une recette.

```javascript
function createRecipeCard(recipe) {
    // Crée un élément div pour la carte
    // Définit le contenu HTML de la carte
    // Ajoute un écouteur d'événement pour le bouton de détails
    // Retourne l'élément de carte
}
```

### `viewRestaurantDetails(id)`

Affiche les détails d'un restaurant.

```javascript
function viewRestaurantDetails(id) {
    // Vérifie si l'utilisateur est authentifié
    // Affiche un message si l'utilisateur n'est pas authentifié
    // Dans une application réelle, naviguerait vers une page de détails
    // Pour l'instant, affiche simplement un message dans la console
}
```

### `viewRecipeDetails(id)`

Affiche les détails d'une recette.

```javascript
function viewRecipeDetails(id) {
    // Vérifie si l'utilisateur est authentifié
    // Affiche un message si l'utilisateur n'est pas authentifié
    // Dans une application réelle, naviguerait vers une page de détails
    // Pour l'instant, affiche simplement un message dans la console
}
