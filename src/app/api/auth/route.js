const authenticateUser = require('@/lib/Backend/authentication/authentication.js');
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');


export async function POST(request) {
    let userData = await request.json();
    let token = JSON.stringify({
        token: await authenticateUser(userData)
    });
    return new Response(token, jsonHeader);
}