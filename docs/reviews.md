# Module d'avis (reviews.js)

Ce module gère les avis des utilisateurs pour les recettes et les restaurants.

## Fonctions exportées

### `addUserReview(itemId, itemType, rating, comment)`

Ajoute un avis pour une recette ou un restaurant.

```javascript
export async function addUserReview(itemId, itemType, rating, comment) {
    // Vérifie si l'utilisateur est authentifié
    // Récupère l'ID de l'utilisateur actuel
    // Valide la note (entre 1 et 5)
    // Crée les données de l'avis
    // Ajoute l'avis à la base de données
    // Retourne l'ID de l'avis
}
```

### `getItemReviews(itemId, itemType)`

Récupère les avis pour une recette ou un restaurant.

```javascript
export async function getItemReviews(itemId, itemType) {
    // Récupère les avis depuis la base de données
    // Retourne un tableau d'avis
}
```

### `calculateAverageRating(reviews)`

Calcule la note moyenne à partir des avis.

```javascript
export function calculateAverageRating(reviews) {
    // Vérifie si des avis existent
    // Calcule la somme des notes
    // Divise par le nombre d'avis
    // Retourne la note moyenne
}
```

### `createReviewForm(itemId, itemType, onSubmit)`

Crée un formulaire d'avis.

```javascript
export function createReviewForm(itemId, itemType, onSubmit) {
    // Crée un élément de formulaire
    // Définit le contenu HTML du formulaire
    // Ajoute un écouteur d'événement pour la soumission
    // Retourne l'élément de formulaire
}
```

### `createReviewList(reviews)`

Crée une liste d'avis.

```javascript
export function createReviewList(reviews) {
    // Crée un conteneur pour les avis
    // Calcule la note moyenne
    // Crée un élément pour la note moyenne
    // Crée une liste pour les avis
    // Trie les avis par date
    // Crée des éléments pour chaque avis
    // Retourne le conteneur
}
```

### `initReviewsSection(containerId, itemId, itemType)`

Initialise la section d'avis pour un élément.

```javascript
export async function initReviewsSection(containerId, itemId, itemType) {
    // Récupère le conteneur
    // Efface le conteneur
    // Crée un titre pour la section
    // Récupère les avis
    // Crée une liste d'avis
    // Crée un formulaire d'avis
    // Ajoute la liste et le formulaire au conteneur
}
