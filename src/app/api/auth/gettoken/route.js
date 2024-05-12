// Test Route

const jwt = require('jsonwebtoken');
const { verifyToken }  = require('@/lib/Backend/authentication/authentication.js');
const jsonHeader = require('@/lib/Backend/config/jsonHeader.js');

export async function POST(request) {
    let userData = await request.json();
    let token = userData.token;
    let decoded = await verifyToken(token);
    return new Response(JSON.stringify(decoded), jsonHeader);
}

export async function GET(request) {
    return new Response("GET request not supported");
}