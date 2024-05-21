const getFoodLoved = require('@/lib/Backend/getFoodData/getFoodLoved.js');
const getFoodLoved = require('@/lib/Backend/getFoodData/getFoodLoved.js');

const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');

export async function GET(request) {
    
    
    let decoded = JSON.parse(request.headers.get('decoded'));
    let lovedFood = await getFoodLoved(decoded.email);

    return new Response(JSON.stringify(lovedFood), jsonHeader);
}