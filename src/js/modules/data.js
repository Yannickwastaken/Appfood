// Data module - Handles database operations with MongoDB via API

// API base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Log the API base URL for debugging
console.log('Using API base URL:', API_BASE_URL);

/**
 * Initialize the database
 * @returns {Promise} - Promise that resolves when the database is initialized
 */
export async function initDatabase() {
    try {
        console.log('Trying to connect to MongoDB server...');
        
        // Test the connection by fetching users
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

/**
 * Generic function to make API requests
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {Object} data - Request body data
 * @returns {Promise} - Promise that resolves with the response data
 */
async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `API error: ${response.status}`);
        }
        
        // For DELETE requests with 204 No Content
        if (response.status === 204) {
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error(`API request error (${method} ${endpoint}):`, error);
        throw error;
    }
}

/**
 * Add an item to a collection
 * @param {string} collection - Collection name
 * @param {Object} item - Item to add
 * @returns {Promise} - Promise that resolves with the added item
 */
export async function add(collection, item) {
    try {
        return await apiRequest(`/${collection}`, 'POST', item);
    } catch (error) {
        console.error(`Error adding item to ${collection}:`, error);
        throw error;
    }
}

/**
 * Get an item by ID
 * @param {string} collection - Collection name
 * @param {string} id - Item ID
 * @returns {Promise} - Promise that resolves with the item
 */
export async function getById(collection, id) {
    try {
        return await apiRequest(`/${collection}/${id}`);
    } catch (error) {
        console.error(`Error getting item from ${collection}:`, error);
        throw error;
    }
}

/**
 * Get all items from a collection
 * @param {string} collection - Collection name
 * @returns {Promise} - Promise that resolves with an array of items
 */
export async function getAll(collection) {
    try {
        return await apiRequest(`/${collection}`);
    } catch (error) {
        console.error(`Error getting all items from ${collection}:`, error);
        throw error;
    }
}

/**
 * Update an item
 * @param {string} collection - Collection name
 * @param {Object} item - Item to update (must include id)
 * @returns {Promise} - Promise that resolves when the item is updated
 */
export async function update(collection, item) {
    if (!item.id) {
        throw new Error('Item must have an ID');
    }
    
    try {
        return await apiRequest(`/${collection}/${item.id}`, 'PUT', item);
    } catch (error) {
        console.error(`Error updating item in ${collection}:`, error);
        throw error;
    }
}

/**
 * Delete an item
 * @param {string} collection - Collection name
 * @param {string} id - Item ID
 * @returns {Promise} - Promise that resolves when the item is deleted
 */
export async function remove(collection, id) {
    try {
        return await apiRequest(`/${collection}/${id}`, 'DELETE');
    } catch (error) {
        console.error(`Error deleting item from ${collection}:`, error);
        throw error;
    }
}

/**
 * Query items by a field
 * @param {string} collection - Collection name
 * @param {string} field - Field name
 * @param {any} value - Value to query
 * @returns {Promise} - Promise that resolves with an array of matching items
 */
export async function queryByIndex(collection, field, value) {
    try {
        return await apiRequest(`/${collection}?${field}=${value}`);
    } catch (error) {
        console.error(`Error querying items from ${collection}:`, error);
        throw error;
    }
}

/**
 * Register a new user
 * @param {Object} userData - User data (username, email, password)
 * @returns {Promise} - Promise that resolves with the user object
 */
export async function registerUser(userData) {
    try {
        return await apiRequest('/users/register', 'POST', userData);
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise that resolves with the user object
 */
export async function loginUser(email, password) {
    try {
        return await apiRequest('/users/login', 'POST', { email, password });
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

/**
 * Add a recipe to user favorites
 * @param {string} userId - User ID
 * @param {string} recipeId - Recipe ID
 * @returns {Promise} - Promise that resolves when the recipe is added to favorites
 */
export async function addFavoriteRecipe(userId, recipeId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/recipes/${recipeId}`, 'POST');
    } catch (error) {
        console.error('Error adding favorite recipe:', error);
        throw error;
    }
}

/**
 * Remove a recipe from user favorites
 * @param {string} userId - User ID
 * @param {string} recipeId - Recipe ID
 * @returns {Promise} - Promise that resolves when the recipe is removed from favorites
 */
export async function removeFavoriteRecipe(userId, recipeId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/recipes/${recipeId}`, 'DELETE');
    } catch (error) {
        console.error('Error removing favorite recipe:', error);
        throw error;
    }
}

/**
 * Get user's favorite recipes
 * @param {string} userId - User ID
 * @returns {Promise} - Promise that resolves with an array of favorite recipes
 */
export async function getFavoriteRecipes(userId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/recipes`);
    } catch (error) {
        console.error('Error getting favorite recipes:', error);
        throw error;
    }
}

/**
 * Add a restaurant to user favorites
 * @param {string} userId - User ID
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} - Promise that resolves when the restaurant is added to favorites
 */
export async function addFavoriteRestaurant(userId, restaurantId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/restaurants/${restaurantId}`, 'POST');
    } catch (error) {
        console.error('Error adding favorite restaurant:', error);
        throw error;
    }
}

/**
 * Remove a restaurant from user favorites
 * @param {string} userId - User ID
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} - Promise that resolves when the restaurant is removed from favorites
 */
export async function removeFavoriteRestaurant(userId, restaurantId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/restaurants/${restaurantId}`, 'DELETE');
    } catch (error) {
        console.error('Error removing favorite restaurant:', error);
        throw error;
    }
}

/**
 * Get user's favorite restaurants
 * @param {string} userId - User ID
 * @returns {Promise} - Promise that resolves with an array of favorite restaurants
 */
export async function getFavoriteRestaurants(userId) {
    try {
        return await apiRequest(`/users/${userId}/favorites/restaurants`);
    } catch (error) {
        console.error('Error getting favorite restaurants:', error);
        throw error;
    }
}

/**
 * Add a review for a recipe or restaurant
 * @param {Object} reviewData - Review data
 * @returns {Promise} - Promise that resolves with the review ID
 */
export async function addReview(reviewData) {
    try {
        return await apiRequest('/reviews', 'POST', reviewData);
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
}

/**
 * Get reviews for a recipe or restaurant
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {Promise} - Promise that resolves with an array of reviews
 */
export async function getReviews(itemId, itemType) {
    try {
        return await apiRequest(`/reviews?item_id=${itemId}&item_type=${itemType}`);
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
}

/**
 * Check if an item is a favorite for a user
 * @param {string} userId - User ID
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {Promise<boolean>} - Promise that resolves with true if the item is a favorite
 */
export async function isFavorite(userId, itemId, itemType) {
    try {
        const response = await apiRequest(`/users/${userId}/favorites/check?item_id=${itemId}&item_type=${itemType}`);
        return response.isFavorite;
    } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }
}