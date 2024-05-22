// 'use server';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    favorites: {
        type: [[Number]], // Array of numbers
        default: null // Default value is null
    },
    init_favorites : [Number],
    is_active: {
        type: Boolean,
        default: true // Default value is true
    }
});

module.exports = mongoose.models.Users || mongoose.model('Users', UserSchema);