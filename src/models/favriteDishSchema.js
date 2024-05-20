// 'use server';

const mongoose = require('mongoose');

const FavoriteDishSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    dishID: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.models.FavoriteDish || mongoose.model('FavoriteDish', FavoriteDishSchema);
