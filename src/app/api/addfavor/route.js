const updateFavorites = require('@/lib/Backend/database/updateUser.js');
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const { verifyToken } = require('@/lib/Backend/authentication/jwt.js');

export async function POST(request) {
    let userData = await request.json();
    let status = {
        "status": await updateFavorites(userData.email, userData.favorites)
    }
    return new Response(JSON.stringify(status), jsonHeader);
}

export async function GET(request) {
    let token = request.headers.get('Authorization');
    let check = request.headers.get('test');
    let decoded = await verifyToken(token);
    let email = decoded.email;
    let status = {
        "status": "GET request not supported",
        "data": email,
        "token": token,
        "check": check
    }
    return new Response(JSON.stringify(status), jsonHeader);
}