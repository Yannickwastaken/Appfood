// Favorites module - Handles user favorites for recipes and restaurants

import { 
    addFavoriteRecipe, 
    removeFavoriteRecipe, 
    getFavoriteRecipes,
    addFavoriteRestaurant,
    removeFavoriteRestaurant,
    getFavoriteRestaurants,
    isFavorite
} from './data.js';
import { getCurrentUser, isAuthenticated } from './auth.js';

/**
 * Toggle favorite status for a recipe
 * @param {string} recipeId - Recipe ID
 * @returns {Promise<boolean>} - Promise that resolves with the new favorite status
 */
export async function toggleFavoriteRecipe(recipeId) {
    if (!isAuthenticated()) {
        alert('Veuillez vous connecter pour ajouter des favoris');
        return false;
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        // Check if recipe is already a favorite
        const isFav = await isFavorite(userId, recipeId, 'recipe');
        
        if (isFav) {
            // Remove from favorites
            await removeFavoriteRecipe(userId, recipeId);
            return false;
        } else {
            // Add to favorites
            await addFavoriteRecipe(userId, recipeId);
            return true;
        }
    } catch (error) {
        console.error('Error toggling favorite recipe:', error);
        alert('Une erreur est survenue lors de la modification des favoris');
        return false;
    }
}

/**
 * Toggle favorite status for a restaurant
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise<boolean>} - Promise that resolves with the new favorite status
 */
export async function toggleFavoriteRestaurant(restaurantId) {
    if (!isAuthenticated()) {
        alert('Veuillez vous connecter pour ajouter des favoris');
        return false;
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        // Check if restaurant is already a favorite
        const isFav = await isFavorite(userId, restaurantId, 'restaurant');
        
        if (isFav) {
            // Remove from favorites
            await removeFavoriteRestaurant(userId, restaurantId);
            return false;
        } else {
            // Add to favorites
            await addFavoriteRestaurant(userId, restaurantId);
            return true;
        }
    } catch (error) {
        console.error('Error toggling favorite restaurant:', error);
        alert('Une erreur est survenue lors de la modification des favoris');
        return false;
    }
}

/**
 * Get user's favorite recipes
 * @returns {Promise<Array>} - Promise that resolves with an array of favorite recipes
 */
export async function getUserFavoriteRecipes() {
    if (!isAuthenticated()) {
        return [];
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        return await getFavoriteRecipes(userId);
    } catch (error) {
        console.error('Error getting favorite recipes:', error);
        return [];
    }
}

/**
 * Get user's favorite restaurants
 * @returns {Promise<Array>} - Promise that resolves with an array of favorite restaurants
 */
export async function getUserFavoriteRestaurants() {
    if (!isAuthenticated()) {
        return [];
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        return await getFavoriteRestaurants(userId);
    } catch (error) {
        console.error('Error getting favorite restaurants:', error);
        return [];
    }
}

/**
 * Check if an item is a favorite for the current user
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {Promise<boolean>} - Promise that resolves with true if the item is a favorite
 */
export async function isUserFavorite(itemId, itemType) {
    if (!isAuthenticated()) {
        return false;
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        return await isFavorite(userId, itemId, itemType);
    } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }
}

/**
 * Create a favorite button element
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {HTMLElement} - Favorite button element
 */
export async function createFavoriteButton(itemId, itemType) {
    const button = document.createElement('button');
    button.className = 'favorite-btn';
    button.dataset.id = itemId;
    button.dataset.type = itemType;
    
    // Check if item is a favorite
    const isFav = await isUserFavorite(itemId, itemType);
    
    // Set initial state
    updateFavoriteButtonState(button, isFav);
    
    // Add event listener
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isAuthenticated()) {
            alert('Veuillez vous connecter pour ajouter des favoris');
            return;
        }
        
        let newState;
        if (itemType === 'recipe') {
            newState = await toggleFavoriteRecipe(itemId);
        } else if (itemType === 'restaurant') {
            newState = await toggleFavoriteRestaurant(itemId);
        }
        
        // Update button state
        updateFavoriteButtonState(button, newState);
    });
    
    return button;
}

/**
 * Update favorite button state
 * @param {HTMLElement} button - Favorite button element
 * @param {boolean} isFavorite - Whether the item is a favorite
 */
function updateFavoriteButtonState(button, isFavorite) {
    if (isFavorite) {
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.title = 'Retirer des favoris';
        button.classList.add('is-favorite');
    } else {
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.title = 'Ajouter aux favoris';
        button.classList.remove('is-favorite');
    }
}

/**
 * Initialize favorite buttons on the page
 * @param {string} selector - CSS selector for container elements
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 */
export async function initFavoriteButtons(selector, itemType) {
    const containers = document.querySelectorAll(selector);
    
    for (const container of containers) {
        const itemId = container.dataset.id;
        if (!itemId) continue;
        
        const favoriteBtn = await createFavoriteButton(itemId, itemType);
        container.appendChild(favoriteBtn);
    }
}
