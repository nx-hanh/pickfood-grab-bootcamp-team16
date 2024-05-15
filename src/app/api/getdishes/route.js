const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const getDish = require('@/lib/Backend/getFoodData/getDishes.js');

export async function GET(request) {
    let decoded = JSON.parse(request.headers.get('decoded'));
    let dishes = await getDish(decoded);
    let result = {
        "dishes": dishes
    }
    return new Response(JSON.stringify(result), jsonHeader);
}