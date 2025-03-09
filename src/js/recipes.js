// Import modules
import { initAuth, isAuthenticated, getCurrentUser } from './modules/auth.js';
import { initDatabase, getAll, add } from './modules/data.js';
import { createFavoriteButton } from './modules/favorites.js';

// Global variables
let allRecipes = [];
let currentSortField = 'rating';
let currentSortOrder = 'desc';

// Initialize the application
async function initApp() {
    try {
        console.log('Initializing Recipes page...');
        
        // Initialize the database
        await initDatabase();
        console.log('Database initialized');
        
        // Initialize authentication
        initAuth();
        console.log('Authentication initialized');
        
        // Load recipes
        await loadRecipes();
        console.log('Recipes loaded');
        
        // Initialize event listeners
        initEventListeners();
        console.log('Event listeners initialized');
        
        console.log('Recipes page initialized successfully');
    } catch (error) {
        console.error('Error initializing Recipes page:', error);
    }
}

/**
 * Load and display recipes
 * @returns {Promise} - Promise that resolves when recipes are loaded
 */
async function loadRecipes() {
    try {
        // Get recipes from database
        allRecipes = await getAll('recipes');
        console.error('ceeci est un call', allRecipes);
        // Sort recipes by default (rating desc)
        sortRecipes(currentSortField, currentSortOrder);
        
        return allRecipes;
    } catch (error) {
        console.error('Error loading recipes:', error);
        throw error;
    }
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('recipe-search-input');
    const searchButton = document.getElementById('recipe-search-btn');
    
    // Real-time search as user types
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchRecipes(searchTerm);
    });
    
    // Search button click
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchRecipes(searchTerm);
    });
    
    // Sort buttons
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get sort field and current order
            const sortField = button.dataset.sort;
            let sortOrder = button.dataset.order;
            
            // Toggle sort order if clicking the same button again
            if (sortField === currentSortField) {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                button.dataset.order = sortOrder;
                
                // Update icon
                const icon = button.querySelector('.fas.fa-sort-up, .fas.fa-sort-down');
                if (icon) {
                    if (sortOrder === 'asc') {
                        icon.classList.remove('fa-sort-down');
                        icon.classList.add('fa-sort-up');
                    } else {
                        icon.classList.remove('fa-sort-up');
                        icon.classList.add('fa-sort-down');
                    }
                }
            }
            
            // Update active button styling
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Sort recipes
            sortRecipes(sortField, sortOrder);
            
            // Update current sort state
            currentSortField = sortField;
            currentSortOrder = sortOrder;
        });
    });
    
    // Add Recipe Button
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const recipeModal = document.getElementById('recipe-modal');
    const closeRecipeModal = document.getElementById('close-recipe-modal');
    const recipeForm = document.getElementById('recipe-form-element');
    
    // Show recipe modal when clicking the add recipe button
    if (addRecipeBtn) {
        addRecipeBtn.addEventListener('click', () => {
            // Check if user is authenticated
            if (!isAuthenticated()) {
                alert('Vous devez être connecté pour ajouter une recette');
                return;
            }
            
            // Show modal
            recipeModal.classList.remove('hidden');
        });
    }
    
    // Close recipe modal
    if (closeRecipeModal) {
        closeRecipeModal.addEventListener('click', () => {
            recipeModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === recipeModal) {
                recipeModal.classList.add('hidden');
            }
        });
    }
    
    // Recipe form submission
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleRecipeSubmit);
    }
}

/**
 * Handle recipe form submission
 * @param {Event} e - Submit event
 */
async function handleRecipeSubmit(e) {
    e.preventDefault();
    
    try {
        // Get form values
        const name = document.getElementById('recipe-name').value;
        const description = document.getElementById('recipe-description').value;
        const category = document.getElementById('recipe-category').value;
        const image = document.getElementById('recipe-image').value;
        const prepTime = parseInt(document.getElementById('recipe-prep-time').value);
        const cookTime = parseInt(document.getElementById('recipe-cook-time').value);
        const servings = parseInt(document.getElementById('recipe-servings').value);
        const difficulty = document.getElementById('recipe-difficulty').value;
        
        // Get ingredients and instructions (split by line)
        const ingredientsText = document.getElementById('recipe-ingredients').value;
        const instructionsText = document.getElementById('recipe-instructions').value;
        
        const ingredients = ingredientsText.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
            
        const instructions = instructionsText.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        // Get current user
        const currentUser = getCurrentUser();
        
        // Create recipe object
        const newRecipe = {
            id: 'recipe_' + Date.now(),
            name,
            description,
            category,
            image,
            prepTime,
            cookTime,
            servings,
            difficulty,
            ingredients,
            instructions,
            rating: 0, // Initial rating
            user_id: currentUser.id,
            created_at: new Date().toISOString()
        };
        
        // Add recipe to database
        await add('recipes', newRecipe);
        
        // Add to recipes array and display
        allRecipes.push(newRecipe);
        sortRecipes(currentSortField, currentSortOrder);
        
        // Reset form and close modal
        document.getElementById('recipe-form-element').reset();
        document.getElementById('recipe-modal').classList.add('hidden');
        
        // Show success message
        alert('Votre recette a été ajoutée avec succès !');
        
    } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Erreur lors de l\'ajout de la recette: ' + error.message);
    }
}

/**
 * Search recipes by name, ingredients, or description
 * @param {string} searchTerm - Search term
 */
function searchRecipes(searchTerm) {
    if (!searchTerm) {
        // If search is empty, show all recipes (but maintain current sort)
        sortRecipes(currentSortField, currentSortOrder);
        return;
    }
    
    // Filter recipes
    const filteredRecipes = allRecipes.filter(recipe => {
        // Check recipe name
        if (recipe.name.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // Check recipe description
        if (recipe.description.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // Check recipe category
        if (recipe.category.toLowerCase().includes(searchTerm)) {
            return true;
        }
        
        // Check recipe ingredients
        if (recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm))) {
            return true;
        }
        
        // Check recipe instructions
        if (recipe.instructions.some(instruction => 
            instruction.toLowerCase().includes(searchTerm))) {
            return true;
        }
        
        return false;
    });
    
    // Display filtered recipes
    displayRecipes(filteredRecipes);
}

/**
 * Sort recipes by field and order
 * @param {string} field - Field to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 */
function sortRecipes(field, order) {
    // Clone recipes array to avoid modifying the original
    const sortedRecipes = [...allRecipes];
    
    // Sort by field
    sortedRecipes.sort((a, b) => {
        let valueA, valueB;
        
        // Handle special case for ingredients count
        if (field === 'ingredients') {
            valueA = a.ingredients.length;
            valueB = b.ingredients.length;
        } else {
            valueA = a[field];
            valueB = b[field];
        }
        
        // Compare values
        if (valueA < valueB) {
            return order === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
    
    // Display sorted recipes
    displayRecipes(sortedRecipes);
}

/**
 * Display recipes on the page
 * @param {Array} recipes - Array of recipe objects
 */
async function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    
    // Clear container
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p class="no-results">Aucune recette trouvée</p>';
        return;
    }
    
    // Create recipe cards
    for (const recipe of recipes) {
        const card = await createRecipeCard(recipe);
        recipesContainer.appendChild(card);
    }
}

/**
 * Create a recipe card element
 * @param {Object} recipe - Recipe object
 * @returns {Promise<HTMLElement>} - Promise that resolves with the card element
 */
async function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.dataset.id = recipe.id;
    
    // Calculate recipe rating (if not present, use a random value between 3.5 and 5)
    const rating = recipe.rating || (3.5 + Math.random() * 1.5).toFixed(1);
        
    // Ensure ingredients and instructions are arrays
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
    
    // Create card HTML
    const cardContent = `
        <div class="recipe-card-front">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
                <div class="recipe-rating">
                    <span class="stars">
                        ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}
                    </span>
                    <span class="rating-value">${rating}</span>
                </div>
            </div>
            <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime + recipe.cookTime} min</span>
                    <span><i class="fas fa-list"></i> ${ingredients.length} ingrédients</span>
                    <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                </div>
            </div>
        </div>
        <div class="recipe-card-back">
            <h3>${recipe.name}</h3>
            <div class="recipe-details">
                <div class="ingredients">
                    <h4>Ingrédients</h4>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <div class="instructions">
                    <h4>Préparation</h4>
                    <ol>
                        ${instructions.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
            <a href="#" class="btn view-full-recipe" data-id="${recipe.id}">Voir la recette complète</a>
        </div>
    `;
    
    card.innerHTML = cardContent;
    
    // Add event listener to view button
    card.querySelector('.view-full-recipe').addEventListener('click', (e) => {
        e.preventDefault();
        viewRecipeDetails(recipe.id);
    });
    
    // Add favorite button if user is authenticated
    if (isAuthenticated()) {
        try {
            // Create favorite button
            const favoriteBtn = await createFavoriteButton(recipe.id, 'recipe');
            
            // Add to front card
            const frontCard = card.querySelector('.recipe-card-front');
            frontCard.appendChild(favoriteBtn);
        } catch (error) {
            console.error('Error adding favorite button:', error);
        }
    }
    
    return card;
}

/**
 * View recipe details
 * @param {string} id - Recipe ID
 */
function viewRecipeDetails(id) {
    // In a real app, this would navigate to a recipe details page
    // or open a modal with details
    console.log('Viewing recipe details:', id);
    
    // For now, just log the action
    alert('Fonctionnalité à venir : affichage détaillé de la recette');
}

// Run the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
