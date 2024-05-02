// authController.js
const path = require('path');

function register(req, res) {
    // send html in public folder
    res.sendFile(path.join(global.publicDirectoryPath, 'register.html'));
}

function login(req, res) {
    res.sendFile(path.join(global.publicDirectoryPath, 'login.html'));
}

module.exports = { register, login };
