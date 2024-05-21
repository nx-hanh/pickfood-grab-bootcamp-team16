// 'use server';

const mongoose = require('mongoose');
const { create } = require('./userSchema');

const FavoriteDishSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    dishID: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.FavoriteDish || mongoose.model('FavoriteDish', FavoriteDishSchema);
