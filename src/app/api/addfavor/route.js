const updateFavorites = require('@/lib/Backend/database/updateUser.js');
const updateInitFavorites = require('@/lib/Backend/database/updateInitFavorite.js');
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const filterCategory = require('@/lib/Backend/database/filterCategory.js');

export async function POST(request) {
    let userData = await request.json();
    let decoded = request.headers.get('decoded');
    decoded = JSON.parse(decoded);
    userData.favorites = await filterCategory(userData.favorites);
    updateInitFavorites(decoded.email, userData.favorites);
    let favorites = []
    for (let i = 0; i < userData.favorites.length; i++) {
        favorites.push([Number(userData.favorites[i]), 1]);
    }
    let updateStatus = await updateFavorites(decoded.email, favorites);
    let status = {
        "status": updateStatus
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