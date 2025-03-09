# Module d'authentification (auth.js)

Ce module gère l'authentification des utilisateurs, y compris l'inscription, la connexion et la déconnexion.

## Fonctions exportées

### `initAuth()`

Initialise le module d'authentification, configure les écouteurs d'événements pour les formulaires de connexion et d'inscription.

```javascript
export function initAuth() {
    // Récupère les éléments DOM
    // Vérifie si l'utilisateur est déjà connecté
    // Ajoute les écouteurs d'événements
}
```

### `getCurrentUser()`

Récupère l'utilisateur actuellement connecté.

```javascript
export function getCurrentUser() {
    return currentUser;
}
```

### `isAuthenticated()`

Vérifie si un utilisateur est authentifié.

```javascript
export function isAuthenticated() {
    return currentUser !== null;
}
```

## Fonctions internes

### `checkAuthStatus()`

Vérifie si un utilisateur est déjà connecté en vérifiant le localStorage.

```javascript
function checkAuthStatus() {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
        // Parse l'utilisateur stocké
        // Met à jour l'interface utilisateur
    }
}
```

### `showLoginForm(e)`

Affiche le formulaire de connexion.

```javascript
function showLoginForm(e) {
    e.preventDefault();
    // Affiche le formulaire de connexion
    // Cache le formulaire d'inscription
}
```

### `showRegisterForm(e)`

Affiche le formulaire d'inscription.

```javascript
function showRegisterForm(e) {
    e.preventDefault();
    // Affiche le formulaire d'inscription
    // Cache le formulaire de connexion
}
```

### `closeModal()`

Ferme la fenêtre modale d'authentification.

```javascript
function closeModal() {
    authModal.classList.add('hidden');
}
```

### `handleLogin(e)`

Gère la soumission du formulaire de connexion.

```javascript
async function handleLogin(e) {
    e.preventDefault();
    
    // Récupère les valeurs du formulaire
    // Tente de connecter l'utilisateur
    // Ferme la modale en cas de succès
}
```

### `handleRegister(e)`

Gère la soumission du formulaire d'inscription.

```javascript
async function handleRegister(e) {
    e.preventDefault();
    
    // Récupère les valeurs du formulaire
    // Valide les mots de passe
    // Tente d'inscrire l'utilisateur
    // Connecte l'utilisateur en cas de succès
}
```

### `loginUser(user)`

Connecte un utilisateur et met à jour l'interface utilisateur.

```javascript
function loginUser(user) {
    // Définit l'utilisateur actuel
    // Sauvegarde dans localStorage
    // Met à jour l'interface utilisateur
}
```

### `updateUIForLoggedInUser()`

Met à jour l'interface utilisateur pour un utilisateur connecté.

```javascript
function updateUIForLoggedInUser() {
    // Cache les boutons de connexion/inscription
    // Affiche le bouton de déconnexion
}
```

### `logout()`

Déconnecte l'utilisateur actuel.

```javascript
function logout() {
    // Efface l'utilisateur actuel
    // Supprime de localStorage
    // Met à jour l'interface utilisateur
}
