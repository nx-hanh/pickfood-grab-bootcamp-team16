const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');
const getDish = require('@/lib/Backend/getFoodData/getDishes.js');
const { cookies } = require("next/headers");
const extract_recommendation = require('@/lib/Backend/session/recommendation_session.js');
const cookies_age = 600; // 10 minutes

export async function GET(request) {
    let decoded = JSON.parse(request.headers.get('decoded'));
    const url = new URL(request.url);
    const search_params = new URLSearchParams(url.searchParams);
    let lat = search_params.get("lat");
    let long = search_params.get("long");
    let category_sent_list = null;
    let sessionID = null;
    try {
        category_sent_list = JSON.parse(cookies().get("category_sent_list")?.value);
    }
    catch (err) {}
    try {
        sessionID = cookies().get("sessionID")?.value;
    }
    catch (err) {}
    
    let extractData = await extract_recommendation(decoded, sessionID);
    sessionID = extractData[0];
    let recommendationList = extractData[1];

    let dishesDetail = await getDish(recommendationList, category_sent_list, lat, long);
    let result = {
        "dishes": dishesDetail[0]
    }

    cookies().set("sessionID", sessionID, {
        maxAge: cookies_age,
    });
    cookies().set("category_sent_list", JSON.stringify(dishesDetail[1]), {
        maxAge: cookies_age,
    });
    return new Response(JSON.stringify(result), jsonHeader);
}