const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    ingredients: { type: [String], required: true }, // Tableau de chaînes de caractères
    instructions: { type: [String], required: true } // Tableau de chaînes de caractères
});

module.exports = mongoose.model('Recipe', recipeSchema);