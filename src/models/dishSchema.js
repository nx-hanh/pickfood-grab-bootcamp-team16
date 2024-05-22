// 'use server';

const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    id: String,
    name: String,
    imgLink: String,
    price: Number,
    description: String,
    merchant_id: mongoose.Schema.Types.ObjectId,
    category: [String],
    category_id: Number,
    rank: Number
  });

//   indexing the category_id field
// DishSchema.index({ category_id: 1 });

module.exports = mongoose.models.new_dishes_1 || mongoose.model('new_dishes_1', DishSchema);