// userModel.js
// Example: You can use Mongoose to define schemas and interact with MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;