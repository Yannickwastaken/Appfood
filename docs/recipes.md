# Page de recettes (recipes.js)

Ce fichier gère l'affichage et l'interaction avec les recettes. Il permet aux utilisateurs de consulter, rechercher, trier et ajouter des recettes.

## Variables globales

```javascript
let allRecipes = [];
let currentSortField = 'rating';
let currentSortOrder = 'desc';
```

- `allRecipes` : Tableau contenant toutes les recettes chargées.
- `currentSortField` : Champ de tri actuel (par défaut : 'rating').
- `currentSortOrder` : Ordre de tri actuel (par défaut : 'desc').

## Fonctions principales

### `initApp()`

Initialise la page de recettes.

```javascript
async function initApp() {
    try {
        // Initialise la base de données
        // Initialise l'authentification
        // Charge les recettes
        // Initialise les écouteurs d'événements
    } catch (error) {
        // Gère les erreurs d'initialisation
    }
}
```

### `loadRecipes()`

Charge et affiche les recettes.

```javascript
async function loadRecipes() {
    try {
        // Récupère les recettes depuis la base de données
        // Trie les recettes selon les critères par défaut
        // Retourne les recettes
    } catch (error) {
        // Gère les erreurs de chargement
    }
}
```

### `initEventListeners()`

Initialise les écouteurs d'événements pour la page de recettes.

```javascript
function initEventListeners() {
    // Configure la recherche en temps réel
    // Configure les boutons de tri
    // Configure le bouton d'ajout de recette
    // Configure le formulaire d'ajout de recette
}
```

### `handleRecipeSubmit(e)`

Gère la soumission du formulaire d'ajout de recette.

```javascript
async function handleRecipeSubmit(e) {
    e.preventDefault();
    
    try {
        // Récupère les valeurs du formulaire
        // Crée un objet recette
        // Ajoute la recette à la base de données
        // Met à jour l'affichage
        // Réinitialise le formulaire et ferme la modale
    } catch (error) {
        // Gère les erreurs d'ajout
    }
}
```

### `searchRecipes(searchTerm)`

Recherche des recettes par nom, ingrédients ou description.

```javascript
function searchRecipes(searchTerm) {
    // Si la recherche est vide, affiche toutes les recettes
    // Filtre les recettes selon le terme de recherche
    // Affiche les recettes filtrées
}
```

### `sortRecipes(field, order)`

Trie les recettes par champ et ordre.

```javascript
function sortRecipes(field, order) {
    // Clone le tableau de recettes
    // Trie selon le champ et l'ordre spécifiés
    // Affiche les recettes triées
}
```

### `displayRecipes(recipes)`

Affiche les recettes sur la page.

```javascript
async function displayRecipes(recipes) {
    // Efface le conteneur
    // Affiche un message si aucune recette n'est trouvée
    // Crée des cartes pour chaque recette
    // Ajoute les cartes au conteneur
}
```

### `createRecipeCard(recipe)`

Crée une carte de recette.

```javascript
async function createRecipeCard(recipe) {
    // Crée un élément div pour la carte
    // Calcule la note de la recette
    // Assure que les ingrédients et instructions sont des tableaux
    // Définit le contenu HTML de la carte
    // Ajoute des écouteurs d'événements
    // Ajoute un bouton favori si l'utilisateur est authentifié
    // Retourne l'élément de carte
}
```

### `viewRecipeDetails(id)`

Affiche les détails d'une recette.

```javascript
function viewRecipeDetails(id) {
    // Dans une application réelle, naviguerait vers une page de détails
    // Pour l'instant, affiche simplement un message d'alerte
}
```

## Écouteurs d'événements

```javascript
document.addEventListener('DOMContentLoaded', initApp);
```

Déclenche l'initialisation de la page lorsque le DOM est entièrement chargé.
