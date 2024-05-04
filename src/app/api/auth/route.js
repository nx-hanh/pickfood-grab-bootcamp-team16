const authenticateUser = require('@/lib/Backend/authentication/authentication.js');
const database = require('@/lib/Backend/database/Database.js');

const jsonHeader = {
    'headers': {
        'Content-Type': 'application/json'
    }
}


export async function POST(request) {
    let userData = await request.json();
    let token = JSON.stringify({
        token: await authenticateUser(userData)
    });
    return new Response(token, jsonHeader);
}