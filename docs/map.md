# Module de carte (map.js)

Ce module gère l'intégration de la carte Leaflet pour afficher les restaurants.

## Fonctions exportées

### `initMap()`

Initialise la carte.

```javascript
export function initMap() {
    // Crée une instance de carte Leaflet
    // Ajoute une couche de tuiles OpenStreetMap
    // Ajoute un marqueur par défaut
    // Configure les gestionnaires d'événements de la carte
}
```

### `addMarker(lat, lng, title, content)`

Ajoute un marqueur à la carte.

```javascript
export function addMarker(lat, lng, title, content) {
    // Crée un marqueur Leaflet aux coordonnées spécifiées
    // Associe un popup au marqueur si du contenu est fourni
    // Retourne l'instance du marqueur
}
```

### `addMarkersFromData(locations)`

Ajoute plusieurs marqueurs à partir de données.

```javascript
export function addMarkersFromData(locations) {
    // Vérifie que locations est un tableau
    // Pour chaque emplacement, crée un contenu de popup
    // Ajoute un marqueur pour chaque emplacement
}
```

### `centerMap(lat, lng, zoom)`

Centre la carte sur un emplacement spécifique.

```javascript
export function centerMap(lat, lng, zoom = DEFAULT_ZOOM) {
    // Centre la vue de la carte sur les coordonnées spécifiées
    // Applique le niveau de zoom spécifié
}
```

### `getMap()`

Récupère l'instance de carte actuelle.

```javascript
export function getMap() {
    // Retourne l'instance de carte Leaflet
}
```

## Fonctions internes

### `addDefaultMarker()`

Ajoute un marqueur par défaut à la carte.

```javascript
function addDefaultMarker() {
    // Crée un marqueur à l'emplacement par défaut
    // Associe un popup au marqueur
    // Ouvre le popup
}
```

### `onMapClick(e)`

Gère les événements de clic sur la carte.

```javascript
function onMapClick(e) {
    // Affiche les coordonnées du clic dans la console
}
