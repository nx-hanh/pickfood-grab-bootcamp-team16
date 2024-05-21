// 'use server';

const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    name: String,
    cuisine: String,
    imgLink: String,
    location: [Number],
    openingHours: Object,
    address: String,
    gridX: Number,
    gridY: Number,
});

module.exports = mongoose.models.Restaurants || mongoose.model('Restaurants', RestaurantSchema);