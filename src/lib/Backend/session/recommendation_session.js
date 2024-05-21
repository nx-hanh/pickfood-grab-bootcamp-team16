const { createSession, getSession, saveSessionData } = require('@/lib/Backend/session/session.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');



async function extract_recommendation(userdata, sessionID) {
    if (sessionID != null) {
        let sessionData = getSession(sessionID);
        if (sessionData != null) {
            if (sessionData.cnt_changes >= 3) saveSessionData(sessionData);
            return [sessionID, sessionData.recommendationList];
        }
        console.log("Invalid sessionID, creating new session\n");
    }
    console.log("Creating new session");
    let recommendation_result = await getRecommendation(userdata, true);
    let recommendationList = recommendation_result[0];
    let user_favorites = recommendation_result[1];
    let sessionData = {
        user_favorites: user_favorites,
        email: userdata.email,
        recommendationList: recommendationList,
        cnt_changes: 0
    };
    sessionID = createSession(sessionData);
    return [sessionID, recommendationList];
}

module.exports = extract_recommendation;