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
    let decoded = request.headers.get('decoded');
    let status = {
        "status": "GET request not supported",
        "decoded": decoded
    }
    return new Response(JSON.stringify(status), jsonHeader);
}