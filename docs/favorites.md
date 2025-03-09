# Module de favoris (favorites.js)

Ce module gère les fonctionnalités de favoris pour les recettes et les restaurants.

## Fonctions exportées

### `toggleFavoriteRecipe(recipeId)`

Bascule l'état favori d'une recette.

```javascript
export async function toggleFavoriteRecipe(recipeId) {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Vérifie si la recette est déjà un favori
    // Ajoute ou supprime la recette des favoris
    // Retourne le nouvel état favori
}
```

### `toggleFavoriteRestaurant(restaurantId)`

Bascule l'état favori d'un restaurant.

```javascript
export async function toggleFavoriteRestaurant(restaurantId) {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Vérifie si le restaurant est déjà un favori
    // Ajoute ou supprime le restaurant des favoris
    // Retourne le nouvel état favori
}
```

### `getUserFavoriteRecipes()`

Récupère les recettes favorites de l'utilisateur actuel.

```javascript
export async function getUserFavoriteRecipes() {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Récupère les recettes favorites
    // Retourne un tableau de recettes favorites
}
```

### `getUserFavoriteRestaurants()`

Récupère les restaurants favoris de l'utilisateur actuel.

```javascript
export async function getUserFavoriteRestaurants() {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Récupère les restaurants favoris
    // Retourne un tableau de restaurants favoris
}
```

### `isUserFavorite(itemId, itemType)`

Vérifie si un élément est un favori pour l'utilisateur actuel.

```javascript
export async function isUserFavorite(itemId, itemType) {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Vérifie le statut favori
    // Retourne un booléen
}
```

### `createFavoriteButton(itemId, itemType)`

Crée un bouton favori pour un élément.

```javascript
export async function createFavoriteButton(itemId, itemType) {
    // Crée un élément bouton
    // Vérifie si l'élément est un favori
    // Définit l'état initial du bouton
    // Ajoute un écouteur d'événement pour basculer l'état favori
    // Retourne l'élément bouton
}
```

### `initFavoriteButtons(selector, itemType)`

Initialise les boutons favoris sur la page.

```javascript
export async function initFavoriteButtons(selector, itemType) {
    // Récupère tous les conteneurs correspondant au sélecteur
    // Pour chaque conteneur, récupère l'ID de l'élément
    // Crée un bouton favori pour chaque élément
    // Ajoute le bouton au conteneur
}
```

## Fonctions internes

### `updateFavoriteButtonState(button, isFavorite)`

Met à jour l'état du bouton favori.

```javascript
function updateFavoriteButtonState(button, isFavorite) {
    // Met à jour l'icône du bouton
    // Met à jour le titre du bouton
    // Ajoute ou supprime la classe CSS pour l'état favori
}
