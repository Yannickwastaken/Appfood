// Content module - Handles loading and displaying restaurants and recipes

import { getAll, queryByIndex } from './data.js';
import { addMarkersFromData } from './map.js';
import { isAuthenticated } from './auth.js';

/**
 * Load and display restaurants
 * @returns {Promise} - Promise that resolves when restaurants are loaded
 */
export async function loadRestaurants() {
    try {
        // Get restaurants from database
        const restaurants = await getAll('restaurants');
        
        // Display restaurants on the page
        displayRestaurants(restaurants);
        
        // Add restaurant markers to the map
        addMarkersFromData(restaurants);
        
        return restaurants;
    } catch (error) {
        console.error('Error loading restaurants:', error);
        throw error;
    }
}

/**
 * Load and display recipes
 * @returns {Promise} - Promise that resolves when recipes are loaded
 */
export async function loadRecipes() {
    try {
        // Get recipes from database
        const recipes = await getAll('recipes');
        
        // Display recipes on the page
        displayRecipes(recipes);
        
        return recipes;
    } catch (error) {
        console.error('Error loading recipes:', error);
        throw error;
    }
}

/**
 * Display restaurants on the page
 * @param {Array} restaurants - Array of restaurant objects
 */
function displayRestaurants(restaurants) {
    const restaurantsContainer = document.getElementById('restaurants-list');
    
    // Clear container
    restaurantsContainer.innerHTML = '';
    
    if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<p class="no-results">Aucun restaurant trouvé</p>';
        return;
    }
    
    // Create restaurant cards
    restaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        restaurantsContainer.appendChild(card);
    });
}

/**
 * Display recipes on the page
 * @param {Array} recipes - Array of recipe objects
 */
function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-list');
    
    // Clear container
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="no-results">Aucune recette trouvée</p>';
        return;
    }
    
    // Create recipe cards
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipesContainer.appendChild(card);
    });
}

/**
 * Create a restaurant card element
 * @param {Object} restaurant - Restaurant object
 * @returns {HTMLElement} - Card element
 */
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = restaurant.id;
    
    const cardContent = `
        <div class="card-img">
            <img src="${restaurant.image}" alt="${restaurant.name}">
        </div>
        <div class="card-content">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
            <div class="rating">
                ${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(5 - Math.floor(restaurant.rating))}
                <span>${restaurant.rating}</span>
            </div>
            <p>Cuisine: ${restaurant.cuisine} | Prix: ${restaurant.priceRange}</p>
            <a href="#" class="btn view-restaurant" data-id="${restaurant.id}">Voir détails</a>
        </div>
    `;
    
    card.innerHTML = cardContent;
    
    // Add event listener to view button
    card.querySelector('.view-restaurant').addEventListener('click', (e) => {
        e.preventDefault();
        viewRestaurantDetails(restaurant.id);
    });
    
    return card;
}

/**
 * Create a recipe card element
 * @param {Object} recipe - Recipe object
 * @returns {HTMLElement} - Card element
 */
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = recipe.id;
    
    const cardContent = `
        <div class="card-img">
            <img src="${recipe.image}" alt="${recipe.name}">
        </div>
        <div class="card-content">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <p>Catégorie: ${recipe.category} | Difficulté: ${recipe.difficulty}</p>
            <p>Temps de préparation: ${recipe.prepTime} min | Cuisson: ${recipe.cookTime} min</p>
            <a href="#" class="btn view-recipe" data-id="${recipe.id}">Voir recette</a>
        </div>
    `;
    
    card.innerHTML = cardContent;
    
    // Add event listener to view button
    card.querySelector('.view-recipe').addEventListener('click', (e) => {
        e.preventDefault();
        viewRecipeDetails(recipe.id);
    });
    
    return card;
}

/**
 * View restaurant details
 * @param {string} id - Restaurant ID
 */
function viewRestaurantDetails(id) {
    // In a real app, this would navigate to a restaurant details page
    // or open a modal with details
    console.log('Viewing restaurant details:', id);
    
    // Check if user is authenticated for certain actions
    if (!isAuthenticated()) {
        alert('Connectez-vous pour accéder à toutes les fonctionnalités');
        return;
    }
    
    // For now, just log the action
    console.log('User is authenticated, showing full restaurant details');
}

/**
 * View recipe details
 * @param {string} id - Recipe ID
 */
function viewRecipeDetails(id) {
    // In a real app, this would navigate to a recipe details page
    // or open a modal with details
    console.log('Viewing recipe details:', id);
    
    // Check if user is authenticated for certain actions
    if (!isAuthenticated()) {
        alert('Connectez-vous pour accéder à toutes les fonctionnalités');
        return;
    }
    
    // For now, just log the action
    console.log('User is authenticated, showing full recipe details');
}

/**
 * Search restaurants and recipes
 * @param {string} query - Search query
 * @returns {Promise} - Promise that resolves with search results
 */
export async function search(query) {
    try {
        query = query.toLowerCase();
        
        // Get all restaurants and recipes
        const restaurants = await getAll('restaurants');
        const recipes = await getAll('recipes');
        
        // Filter restaurants by name, cuisine, or description
        const filteredRestaurants = restaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.cuisine.toLowerCase().includes(query) ||
            restaurant.description.toLowerCase().includes(query)
        );
        
        // Filter recipes by name, category, or description
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(query) ||
            recipe.category.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query)
        );
        
        // Display filtered results
        displayRestaurants(filteredRestaurants);
        displayRecipes(filteredRecipes);
        
        // Return results
        return {
            restaurants: filteredRestaurants,
            recipes: filteredRecipes
        };
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}

/**
 * Get recipes by restaurant
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} - Promise that resolves with recipes
 */
export async function getRecipesByRestaurant(restaurantId) {
    try {
        // Query recipes by restaurant_id
        const recipes = await queryByIndex('recipes', 'restaurant_id', restaurantId);
        return recipes;
    } catch (error) {
        console.error('Error getting recipes by restaurant:', error);
        throw error;
    }
}
