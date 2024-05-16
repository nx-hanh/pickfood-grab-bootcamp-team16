const { createSession, getSession } = require('@/lib/Backend/session/session.js');
const getRecommendation = require('@/lib/Backend/recommendation/recommendation.js');

async function extract_recommendation(userdata, sessionID) {
    if (sessionID != null) {
        let sessionData = getSession(sessionID);
        if (sessionData != null) return [sessionID, sessionData];
        console.log("Invalid sessionID, creating new session\n");
    }
    console.log("Creating new session");
    let recommendationList = await getRecommendation(userdata);
    sessionID = createSession(recommendationList);
    return [sessionID, recommendationList];
}

module.exports = extract_recommendation;