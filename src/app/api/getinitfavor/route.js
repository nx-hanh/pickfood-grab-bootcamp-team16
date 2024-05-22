const getInitFood = require('@/lib/Backend/getFoodData/getInitFood.js');

const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');

export async function GET(request) {
    
    let decoded = JSON.parse(request.headers.get('decoded'));
    let initFood = await getInitFood(decoded.email);
    // console.log(initFood);
    return new Response(JSON.stringify({
        "initFood": initFood
    }), jsonHeader);
    // return new Response(JSON.stringify(lovedFood), jsonHeader);
}