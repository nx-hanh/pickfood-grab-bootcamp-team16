const jose = require('jose')

let secret = jose.base64url.decode(process.env.JWT_SECRET); // JWT_SECRET="a1bed06892460d6d521980438971ed362673e04225d"

async function generateToken(payload) {
    const jwt = await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .encrypt(secret)
    return jwt;
}

async function verifyToken(token) {
    let decrypted;
    try {
        decrypted = await jose.jwtDecrypt(token, secret)
    } catch (error) {
        console.log("Error decrypting token: ", error)
        return null;
    }
    return decrypted.payload;
}

module.exports = { generateToken, verifyToken }