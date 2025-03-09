// Reviews module - Handles user reviews for recipes and restaurants

import { addReview, getReviews } from './data.js';
import { getCurrentUser, isAuthenticated } from './auth.js';

/**
 * Add a review for a recipe or restaurant
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @param {number} rating - Rating (1-5)
 * @param {string} comment - Review comment
 * @returns {Promise<number>} - Promise that resolves with the review ID
 */
export async function addUserReview(itemId, itemType, rating, comment) {
    if (!isAuthenticated()) {
        alert('Veuillez vous connecter pour ajouter un avis');
        throw new Error('User not authenticated');
    }
    
    const user = getCurrentUser();
    const userId = user.id;
    
    try {
        // Validate rating
        if (rating < 1 || rating > 5) {
            throw new Error('La note doit être comprise entre 1 et 5');
        }
        
        // Create review data
        const reviewData = {
            user_id: userId,
            item_id: itemId,
            item_type: itemType,
            rating,
            comment
        };
        
        // Add review
        return await addReview(reviewData);
    } catch (error) {
        console.error('Error adding review:', error);
        alert('Une erreur est survenue lors de l\'ajout de l\'avis');
        throw error;
    }
}

/**
 * Get reviews for a recipe or restaurant
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @returns {Promise<Array>} - Promise that resolves with an array of reviews
 */
export async function getItemReviews(itemId, itemType) {
    try {
        return await getReviews(itemId, itemType);
    } catch (error) {
        console.error('Error getting reviews:', error);
        return [];
    }
}

/**
 * Calculate average rating from reviews
 * @param {Array} reviews - Array of review objects
 * @returns {number} - Average rating
 */
export function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0;
    }
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
}

/**
 * Create a review form element
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 * @param {Function} onSubmit - Callback function to call after submission
 * @returns {HTMLElement} - Review form element
 */
export function createReviewForm(itemId, itemType, onSubmit) {
    const form = document.createElement('form');
    form.className = 'review-form';
    form.dataset.id = itemId;
    form.dataset.type = itemType;
    
    // Create form HTML
    form.innerHTML = `
        <h3>Ajouter un avis</h3>
        <div class="rating-input">
            <label>Note :</label>
            <div class="star-rating">
                <input type="radio" id="star5" name="rating" value="5" />
                <label for="star5" title="5 étoiles"><i class="fas fa-star"></i></label>
                <input type="radio" id="star4" name="rating" value="4" />
                <label for="star4" title="4 étoiles"><i class="fas fa-star"></i></label>
                <input type="radio" id="star3" name="rating" value="3" />
                <label for="star3" title="3 étoiles"><i class="fas fa-star"></i></label>
                <input type="radio" id="star2" name="rating" value="2" />
                <label for="star2" title="2 étoiles"><i class="fas fa-star"></i></label>
                <input type="radio" id="star1" name="rating" value="1" />
                <label for="star1" title="1 étoile"><i class="fas fa-star"></i></label>
            </div>
        </div>
        <div class="form-group">
            <label for="review-comment">Commentaire :</label>
            <textarea id="review-comment" name="comment" rows="4" placeholder="Partagez votre expérience..."></textarea>
        </div>
        <button type="submit" class="btn">Soumettre</button>
    `;
    
    // Add event listener
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated()) {
            alert('Veuillez vous connecter pour ajouter un avis');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const rating = parseInt(formData.get('rating') || '0');
        const comment = formData.get('comment') || '';
        
        if (rating === 0) {
            alert('Veuillez sélectionner une note');
            return;
        }
        
        try {
            // Add review
            await addUserReview(itemId, itemType, rating, comment);
            
            // Reset form
            form.reset();
            
            // Call callback function
            if (typeof onSubmit === 'function') {
                onSubmit();
            }
            
            alert('Votre avis a été ajouté avec succès');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    });
    
    return form;
}

/**
 * Create a review list element
 * @param {Array} reviews - Array of review objects
 * @returns {HTMLElement} - Review list element
 */
export function createReviewList(reviews) {
    const container = document.createElement('div');
    container.className = 'reviews-container';
    
    // Calculate average rating
    const averageRating = calculateAverageRating(reviews);
    
    // Create average rating element
    const averageEl = document.createElement('div');
    averageEl.className = 'average-rating';
    averageEl.innerHTML = `
        <span class="rating-value">${averageRating.toFixed(1)}</span>
        <span class="stars">
            ${'★'.repeat(Math.floor(averageRating))}${'☆'.repeat(5 - Math.floor(averageRating))}
        </span>
        <span class="review-count">(${reviews.length} avis)</span>
    `;
    container.appendChild(averageEl);
    
    // Create reviews list
    const list = document.createElement('ul');
    list.className = 'reviews-list';
    
    if (reviews.length === 0) {
        const noReviews = document.createElement('li');
        noReviews.className = 'no-reviews';
        noReviews.textContent = 'Aucun avis pour le moment';
        list.appendChild(noReviews);
    } else {
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
                    <span class="review-author">${review.user_id}</span>
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
    }
    
    container.appendChild(list);
    return container;
}

/**
 * Initialize reviews section for an item
 * @param {string} containerId - ID of the container element
 * @param {string} itemId - Item ID
 * @param {string} itemType - Item type ('recipe' or 'restaurant')
 */
export async function initReviewsSection(containerId, itemId, itemType) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create section title
    const title = document.createElement('h2');
    title.textContent = 'Avis';
    container.appendChild(title);
    
    // Get reviews
    const reviews = await getItemReviews(itemId, itemType);
    
    // Create reviews list
    const reviewsList = createReviewList(reviews);
    container.appendChild(reviewsList);
    
    // Create review form
    const reviewForm = createReviewForm(itemId, itemType, async () => {
        // Refresh reviews after submission
        const updatedReviews = await getItemReviews(itemId, itemType);
        const newReviewsList = createReviewList(updatedReviews);
        container.replaceChild(newReviewsList, reviewsList);
    });
    container.appendChild(reviewForm);
}
