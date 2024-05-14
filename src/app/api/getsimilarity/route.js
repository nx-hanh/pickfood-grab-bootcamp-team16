
// Test Route
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');

export async function GET(request) {
    let userData = JSON.parse(request.headers.get('decoded'));
    let similarity_list = await getRecommendation(userData);
    let status = {
        "similarity_list": similarity_list
    }
    return new Response(JSON.stringify(status), jsonHeader);
}