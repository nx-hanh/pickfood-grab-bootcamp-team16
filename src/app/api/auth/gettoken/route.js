// Test Route
const { verifyToken }  = require('@/lib/Backend/authentication/jwt.js');
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');

export async function POST(request) {
    let userData = await request.json();
    let decoded = await verifyToken(token1);
    return new Response(JSON.stringify(decoded), jsonHeader);
}

export async function GET(request) {
    let token = request.headers.get('Authorization');
    console.log(token)
    let decoded = await verifyToken(token);
    let tmp = JSON.stringify(decoded);
    return new Response(tmp);
}