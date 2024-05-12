const jwt = require('jsonwebtoken');

function generateToken(payload) {
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

async function verifyToken(token) {
    if (!token) return null;
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}