# Page d'accueil (main.js)

Ce fichier est le point d'entrée principal de l'application. Il initialise les différents modules et configure les fonctionnalités de base.

## Fonctions

### `initApp()`

Initialise l'application.

```javascript
async function initApp() {
    try {
        // Initialise la base de données
        // Initialise l'authentification
        // Initialise la carte
        // Charge le contenu (restaurants et recettes)
        // Affiche un message de succès dans la console
    } catch (error) {
        // Gère les erreurs d'initialisation
    }
}
```

## Écouteurs d'événements

### Chargement du document

```javascript
document.addEventListener('DOMContentLoaded', initApp);
```

Déclenche l'initialisation de l'application lorsque le DOM est entièrement chargé.

### Recherche

```javascript
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchInput) {
        // Implémente la fonctionnalité de recherche
    }
});
```

Gère la fonctionnalité de recherche lorsque l'utilisateur clique sur le bouton de recherche.

## Importations

Le fichier importe plusieurs modules pour initialiser l'application :

```javascript
import { initMap } from './modules/map.js';
import { initAuth } from './modules/auth.js';
import { initDatabase } from './modules/data.js';
import { loadRestaurants, loadRecipes } from './modules/content.js';
```

## Flux d'exécution

1. L'événement `DOMContentLoaded` déclenche la fonction `initApp`.
2. `initApp` initialise la base de données, l'authentification, la carte et charge le contenu.
3. Les écouteurs d'événements sont configurés pour gérer les interactions utilisateur.
