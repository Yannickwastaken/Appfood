// Import modules
import { initMap } from './modules/map.js';
import { initAuth } from './modules/auth.js';
import { initDatabase } from './modules/data.js';
import { loadRestaurants, loadRecipes } from './modules/content.js';

// Initialize the application
async function initApp() {
    try {
        console.log('Initializing AppFood application...');
        
        // Initialize the database
        await initDatabase();
        console.log('Database initialized');
        
        // Initialize authentication
        initAuth();
        console.log('Authentication initialized');
        
        // Initialize map
        initMap();
        console.log('Map initialized');
        
        // Load content
        await loadRestaurants();
        await loadRecipes();
        console.log('Content loaded');
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Run the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchInput) {
        console.log('Searching for:', searchInput);
        // Implement search functionality
        // This would filter restaurants and recipes based on the search term
    }
});
