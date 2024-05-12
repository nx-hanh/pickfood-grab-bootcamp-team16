
// Test Route
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');

export async function GET(request) {
    let status = {
        "status": "GET request not supported"
    }
    return new Response(JSON.stringify(status), jsonHeader);
}

export async function POST(request) {
    let userData = await request.json();
    let similarity_list = await getRecommendation(userData);
    let status = {
        "similarity_list": similarity_list
    }
    return new Response(JSON.stringify(status), jsonHeader);
}