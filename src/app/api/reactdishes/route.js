const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const filterCategory = require('@/lib/Backend/database/filterCategory.js');
const updateUserRating = require('@/lib/Backend/session/updateUserRating.js');
const { cookies } = require("next/headers");

export async function POST(request) {
    let decoded = JSON.parse(request.headers.get('decoded'));
    let sessionID = null;
    try {
        sessionID = cookies().get("sessionID")?.value;
    }
    catch (err) {}
    let status;
    if (sessionID == null) {
        status = {
            "error": "Session ID not found"
        }
        return new Response(JSON.stringify(status), jsonHeader);
    }

    let userData = await request.json();
    userData.categories = await filterCategory(userData.categories);

    
    let updateStatus = await updateUserRating(sessionID, userData.categories, userData.like, decoded.email);
    if (!updateStatus) {
        status = {
            "error": "Failed to update user rating"
        }
        return new Response(JSON.stringify(status), jsonHeader);
    }
    status = {
        "status": "Success"
    }
    return new Response(JSON.stringify(status), jsonHeader);
}