const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    item_id: { type: String, required: true },
    item_type: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);