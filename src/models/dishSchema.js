// 'use server';

const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    id: String,
    name: String,
    imgLink: String,
    price: Number,
    description: String,
    merchant_id: String,
    category: [String],
    category_id: Number,
    rank: Number
  });

module.exports = mongoose.models.Dishes || mongoose.model('Dishes', DishSchema);