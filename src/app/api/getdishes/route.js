const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const getDish = require('@/lib/Backend/getFoodData/getDishes.js');

export async function GET(request) {
    let dishes = await getDish();
    let status = {
        "dishes": dishes
    }
    return new Response(JSON.stringify(status), jsonHeader);
}