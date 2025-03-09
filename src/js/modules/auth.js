// Auth module - Handles user authentication using IndexedDB

import { loginUser as dbLoginUser, registerUser as dbRegisterUser } from './data.js';

// DOM Elements
let loginBtn;
let registerBtn;
let logoutBtn;
let authModal;
let loginForm;
let registerForm;
let closeModalBtn;

// Current user
let currentUser = null;

/**
 * Initialize authentication
 */
export function initAuth() {
    // Get DOM elements
    loginBtn = document.getElementById('login-btn');
    registerBtn = document.getElementById('register-btn');
    logoutBtn = document.getElementById('logout-btn');
    authModal = document.getElementById('auth-modal');
    loginForm = document.getElementById('login-form');
    registerForm = document.getElementById('register-form');
    closeModalBtn = document.querySelector('.close-modal');
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Add event listeners
    if (loginBtn) loginBtn.addEventListener('click', showLoginForm);
    if (registerBtn) registerBtn.addEventListener('click', showRegisterForm);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Form submissions
    const loginFormElement = document.getElementById('login-form-element');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    const registerFormElement = document.getElementById('register-form-element');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', handleRegister);
    }
    
    // Close modal when clicking outside
    if (authModal) {
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeModal();
            }
        });
    }
}

/**
 * Check if user is already logged in
 */
function checkAuthStatus() {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
        try {
            currentUser = JSON.parse(storedUser);
            updateUIForLoggedInUser();
            console.log('User already logged in:', currentUser.username || currentUser.name);
        } catch (error) {
            console.error('Error parsing stored user:', error);
            localStorage.removeItem('currentUser');
        }
    }
}

/**
 * Show login form
 * @param {Event} e - Click event
 */
function showLoginForm(e) {
    e.preventDefault();
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    authModal.classList.remove('hidden');
}

/**
 * Show registration form
 * @param {Event} e - Click event
 */
function showRegisterForm(e) {
    e.preventDefault();
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authModal.classList.remove('hidden');
}

/**
 * Close the auth modal
 */
function closeModal() {
    authModal.classList.add('hidden');
}

/**
 * Handle login form submission
 * @param {Event} e - Submit event
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        // Login user using database function
        const user = await dbLoginUser(email, password);
        
        // Login successful
        loginUser(user);
        closeModal();
    } catch (error) {
        // Login failed
        alert(error.message || 'Email ou mot de passe incorrect');
    }
}

/**
 * Handle registration form submission
 * @param {Event} e - Submit event
 */
async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    try {
        // Register user using database function
        const newUser = await dbRegisterUser({
            username,
            email,
            password
        });
        
        // Login the new user
        loginUser(newUser);
        
        // Close modal
        closeModal();
    } catch (error) {
        alert(error.message || 'Erreur lors de l\'inscription');
    }
}

/**
 * Login a user
 * @param {Object} user - User object (without password)
 */
function loginUser(user) {
    // Set current user
    currentUser = user;
    
    // Save to localStorage for session persistence
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    updateUIForLoggedInUser();
    
    console.log('User logged in:', currentUser.username || currentUser.name);
}

/**
 * Update UI for logged in user
 */
function updateUIForLoggedInUser() {
    // Hide login/register buttons, show logout button
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    
    // You could also update other UI elements to show user-specific content
}

/**
 * Logout the current user
 */
function logout() {
    // Clear current user
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    // Update UI
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (registerBtn) registerBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    
    console.log('User logged out');
}

/**
 * Get the current logged in user
 * @returns {Object|null} - Current user or null if not logged in
 */
export function getCurrentUser() {
    return currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is logged in
 */
export function isAuthenticated() {
    return currentUser !== null;
}
