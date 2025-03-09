// Profile page - Handles user profile, favorites, and reviews

import { initAuth, getCurrentUser, isAuthenticated } from './modules/auth.js';
import { getUserFavoriteRecipes, getUserFavoriteRestaurants } from './modules/favorites.js';
import { getReviews } from './modules/data.js';

// DOM Elements
let profileContainer;
let profileContent;
let loginMessage;
let profileUsername;
let profileEmail;
let profileCreatedAt;
let favoriteRecipesContainer;
let favoriteRestaurantsContainer;
let recipeReviewsContainer;
let restaurantReviewsContainer;
let tabButtons;
let tabPanes;

// Initialize the application
async function initApp() {
    try {
        console.log('Initializing Profile page...');
        
        // Initialize authentication
        initAuth();
        console.log('Authentication initialized');
        
        // Get DOM elements
        profileContainer = document.getElementById('profile-container');
        profileContent = document.querySelector('.profile-content');
        loginMessage = document.querySelector('.login-message');
        profileUsername = document.getElementById('profile-username');
        profileEmail = document.getElementById('profile-email');
        profileCreatedAt = document.getElementById('profile-created-at');
        favoriteRecipesContainer = document.getElementById('favorite-recipes');
        favoriteRestaurantsContainer = document.getElementById('favorite-restaurants');
        recipeReviewsContainer = document.getElementById('recipe-reviews');
        restaurantReviewsContainer = document.getElementById('restaurant-reviews');
        tabButtons = document.querySelectorAll('.tab-btn');
        tabPanes = document.querySelectorAll('.tab-pane');
        
        // Initialize tabs
        initTabs();
        
        // Check if user is authenticated
        if (isAuthenticated()) {
            // Load profile data
            loadProfileData();
        } else {
            // Show login message
            showLoginMessage();
        }
        
        console.log('Profile page initialized successfully');
    } catch (error) {
        console.error('Error initializing Profile page:', error);
    }
}

/**
 * Initialize tabs functionality
 */
function initTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

/**
 * Show login message
 */
function showLoginMessage() {
    if (profileContent) profileContent.classList.add('hidden');
    if (loginMessage) {
        loginMessage.classList.remove('hidden');
        loginMessage.textContent = 'Veuillez vous connecter pour accéder à votre profil';
    }
}

/**
 * Load profile data
 */
async function loadProfileData() {
    const user = getCurrentUser();
    
    if (!user) {
        showLoginMessage();
        return;
    }
    
    // Show profile content
    if (profileContent) profileContent.classList.remove('hidden');
    if (loginMessage) loginMessage.classList.add('hidden');
    
    // Display user info
    if (profileUsername) profileUsername.textContent = user.username || user.name || 'N/A';
    if (profileEmail) profileEmail.textContent = user.email || 'N/A';
    
    // Format created at date
    if (profileCreatedAt && user.createdAt) {
        const date = new Date(user.createdAt);
        profileCreatedAt.textContent = date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else if (profileCreatedAt) {
        profileCreatedAt.textContent = 'N/A';
    }
    
    // Load favorites
    await loadFavorites();
    
    // Load reviews
    await loadReviews();
}

/**
 * Load user favorites
 */
async function loadFavorites() {
    try {
        // Load favorite recipes
        const favoriteRecipes = await getUserFavoriteRecipes();
        displayFavoriteRecipes(favoriteRecipes);
        
        // Load favorite restaurants
        const favoriteRestaurants = await getUserFavoriteRestaurants();
        displayFavoriteRestaurants(favoriteRestaurants);
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

/**
 * Display favorite recipes
 * @param {Array} recipes - Array of recipe objects
 */
function displayFavoriteRecipes(recipes) {
    if (!favoriteRecipesContainer) return;
    
    // Clear container
    favoriteRecipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        favoriteRecipesContainer.innerHTML = '<p class="no-results">Aucune recette favorite</p>';
        return;
    }
    
    // Create recipe cards
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        favoriteRecipesContainer.appendChild(card);
    });
}

/**
 * Display favorite restaurants
 * @param {Array} restaurants - Array of restaurant objects
 */
function displayFavoriteRestaurants(restaurants) {
    if (!favoriteRestaurantsContainer) return;
    
    // Clear container
    favoriteRestaurantsContainer.innerHTML = '';
    
    if (restaurants.length === 0) {
        favoriteRestaurantsContainer.innerHTML = '<p class="no-results">Aucun restaurant favori</p>';
        return;
    }
    
    // Create restaurant cards
    restaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        favoriteRestaurantsContainer.appendChild(card);
    });
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
            <a href="../html/recipes.html" class="btn">Voir toutes les recettes</a>
        </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
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
            <a href="#" class="btn">Voir détails</a>
        </div>
    `;
    
    card.innerHTML = cardContent;
    return card;
}

/**
 * Load user reviews
 */
async function loadReviews() {
    try {
        const user = getCurrentUser();
        if (!user) return;
        
        // Get all reviews
        const recipeReviews = await getUserReviews('recipe');
        const restaurantReviews = await getUserReviews('restaurant');
        
        // Display reviews
        displayRecipeReviews(recipeReviews);
        displayRestaurantReviews(restaurantReviews);
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

/**
 * Get user reviews by item type
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {Promise<Array>} - Promise that resolves with an array of reviews
 */
async function getUserReviews(itemType) {
    const user = getCurrentUser();
    if (!user) return [];
    
    try {
        // This is a simplified approach - in a real app, you would have a dedicated API endpoint
        // to get all reviews by a specific user. Here we're just filtering all reviews.
        const allReviews = await getReviews(null, itemType);
        return allReviews.filter(review => review.user_id === user.id);
    } catch (error) {
        console.error(`Error getting ${itemType} reviews:`, error);
        return [];
    }
}

/**
 * Display recipe reviews
 * @param {Array} reviews - Array of review objects
 */
function displayRecipeReviews(reviews) {
    if (!recipeReviewsContainer) return;
    
    // Clear container
    recipeReviewsContainer.innerHTML = '';
    
    if (reviews.length === 0) {
        recipeReviewsContainer.innerHTML = '<p class="no-results">Aucun avis sur les recettes</p>';
        return;
    }
    
    // Create reviews list
    const list = document.createElement('ul');
    list.className = 'reviews-list';
    
    // Sort reviews by date (newest first)
    const sortedReviews = [...reviews].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Create review items
    sortedReviews.forEach(review => {
        const item = document.createElement('li');
        item.className = 'review-item';
        
        // Format date
        const date = new Date(review.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        item.innerHTML = `
            <div class="review-header">
                <span class="review-item-name">${review.item_id}</span>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-rating">
                ${'★'.repeat(Math.floor(review.rating))}${'☆'.repeat(5 - Math.floor(review.rating))}
                <span class="rating-value">${review.rating}</span>
            </div>
            <div class="review-comment">${review.comment}</div>
        `;
        
        list.appendChild(item);
    });
    
    recipeReviewsContainer.appendChild(list);
}

/**
 * Display restaurant reviews
 * @param {Array} reviews - Array of review objects
 */
function displayRestaurantReviews(reviews) {
    if (!restaurantReviewsContainer) return;
    
    // Clear container
    restaurantReviewsContainer.innerHTML = '';
    
    if (reviews.length === 0) {
        restaurantReviewsContainer.innerHTML = '<p class="no-results">Aucun avis sur les restaurants</p>';
        return;
    }
    
    // Create reviews list
    const list = document.createElement('ul');
    list.className = 'reviews-list';
    
    // Sort reviews by date (newest first)
    const sortedReviews = [...reviews].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Create review items
    sortedReviews.forEach(review => {
        const item = document.createElement('li');
        item.className = 'review-item';
        
        // Format date
        const date = new Date(review.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        item.innerHTML = `
            <div class="review-header">
                <span class="review-item-name">${review.item_id}</span>
                <span class="review-date">${formattedDate}</span>
            </div>
            <div class="review-rating">
                ${'★'.repeat(Math.floor(review.rating))}${'☆'.repeat(5 - Math.floor(review.rating))}
                <span class="rating-value">${review.rating}</span>
            </div>
            <div class="review-comment">${review.comment}</div>
        `;
        
        list.appendChild(item);
    });
    
    restaurantReviewsContainer.appendChild(list);
}

// Run the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
