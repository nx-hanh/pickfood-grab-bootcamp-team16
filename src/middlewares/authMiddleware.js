// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    // Get token from headers, cookies, or request body
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    // Verify JWT token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = decoded.user;
        next();
    });
}

module.exports = authenticate;
