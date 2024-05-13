const getCategories = require('@/lib/Backend/getFoodData/getCategories.js');
const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
export async function GET(request) {
    let res = await getCategories();
    return new Response(JSON.stringify(res), jsonHeader);
}