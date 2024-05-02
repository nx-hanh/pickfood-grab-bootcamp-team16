// authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const secret_key = process.env.SECRET_KEY;

async function login(req, res) {
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
        const token = jwt.sign({ user : user.username}, secret_key, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

function register(req, res) {
    let { username, password } = req.body;
    password = bcrypt.hashSync(password, 8);
    const user = new User({
        username: username,
        password: password
    });
    user.save()
        .then(() => res.json({ message: 'User registered successfully.' }))
        .catch((err) => res.status(400).json({ message: err.message }));
}

function getListUsers(req, res) {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json({ message: err.message }));
}

function getToken(req, res) {
    // get token from headers, cookies, or request body
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Authorization token is required.' });
    return res.send(token);
}

module.exports = { login, register, getListUsers, getToken };
